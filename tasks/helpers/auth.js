var qs = require('querystring');
var url = require('url');
var rewriteModule = require('http-rewrite-middleware');
var request = require('request');
var btoa = require('btoa');

module.exports = {
  init: function (options) {
    options = options || {}
    this.clientId = options.clientId;
    this.base64ClientCredential = btoa(options.clientId + ':' + options.clientSecret);
    this.serverUrl = options.serverUrl;
    this.redirect_uri = options.redirect_uri;
    this.defaultClientRoute = options.defaultClientRoute;
    this.accessToken = null;
    this.user = null;
    return this.getMiddlewares();
  },
  getAccessTokenFromCode: function (authCode, successCallback, errorCallback) {
    var request = require('request');
    var self = this;
    var options = {
      method: 'POST',
      url: this.serverUrl + '/oauth/token',
      form: {
        'grant_type': 'authorization_code',
        'code': authCode,
        'redirect_uri': this.redirect_uri,
        'state': this.defautClientRoute
      },
      headers: {
        'Authorization': 'Basic ' + this.base64ClientCredential
      }
    };

    request(options, function (err, response, body) {
      if (!err && response.statusCode == 200) {
        var res = JSON.parse(body);
        self.accessToken = res.token_type + ' ' + res.access_token;

        //get user info
        request({
          method: 'get',
          url: self.serverUrl + '/api/user/info',
          headers: {
            'Authorization': self.accessToken
          }
        }, function (error, response, body) {
          self.user = JSON.parse(body);
          successCallback(self.accessToken);
        });
      }
      else {
        errorCallback(err, response, body);
      }
    });
  },
  getMiddlewares: function () {
    //get access token here
    var middlewares = [];
    var uaa = this;
    var rewriteMiddleware = rewriteModule.getMiddleware([
        {
          from: '^/login(.*)$',
          to: uaa.serverUrl + '/oauth/authorize$1&response_type=code&scope=user_info&client_id=' + uaa.clientId + '&redirect_uri=' + uaa.redirect_uri,
          redirect: 'permanent'
        },
        {
          from: '^/logout',
          to: uaa.serverUrl + '/api/logout',
          redirect: 'permanent'
        },
        {
          from: '^[^\.|]+$',   //catch all client side routes
          to: '/index.html'
        }
      ]
    );

    middlewares.push(function (req, res, next) {
      if (req.url.match('/callback')) {
        var params = url.parse(req.url, true).query;
        uaa.getAccessTokenFromCode(params.code, function (token) {
          console.log('uaa access token: ', token);
          params.state = params.state || '/about';
          var url = req._parsedUrl.pathname.replace("/callback", params.state);
          res.statusCode = 301;
          res.setHeader('Location', url);
          res.end();
        }, function (err) {
          console.error('error getting access token: ', err);
          next(err);
        });
      } else if (req.url.match('/userinfo')) {
        if (uaa.hasValidSession()) {
          res.end(JSON.stringify({email: uaa.user.email, user_name: uaa.user.username}));
        } else {
          next(401);
        }
      } else if (req.url.match('/logout')) {
        console.log("\n\nDeleiting user sesssion");
        uaa.deleteSession();
        next();
      }
      else {
        next();
      }
    });

    middlewares.push(rewriteMiddleware);

    return middlewares;
  },
  hasValidSession: function () {
    return !!this.accessToken;
  },
  deleteSession: function () {
    this.accessToken = null;
  }
}
