var HTTPSProxyAgent = require('https-proxy-agent');
var corporateProxyServer = process.env.http_proxy || process.env.HTTP_PROXY || process.env.https_proxy || process.env.HTTPS_PROXY;
var sauceRestAgent;
if (corporateProxyServer) {
    console.log('using proxy server: ', corporateProxyServer);
    sauceRestAgent = new HTTPSProxyAgent(corporateProxyServer);
}

var config = {
    // use no seleniumAddress if running in sauce labs.
    seleniumAddress: process.env.SAUCE_USERNAME ? undefined : 'http://localhost:4444/wd/hub',
    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    sauceAgent: sauceRestAgent,
    webDriverProxy: process.env.SAUCE_USERNAME ? corporateProxyServer : undefined,

    specs: ['e2e/specs/*.js'],
    seleniumserverjar: 'node_modules/protractor/selenium/selenium-server-standalone-2.41.1.jar',
    chromedriver: 'node_modules/protractor/selenium/chromedriver',
    seleniumargs: ['-dwebdriver.chrome.driver="node_modules/protractor/selenium/chromedriver"'],


    jasmineNodeOpts: {
        isVerbose: true,
        showColors: true,
        includeStackTrace: true,
        defaultTimeoutInterval: 600000
    },
    params: {
        baseUrl: process.env.APP_URL || 'https://rmd-ref-app.run.aws-usw02-pr.ice.predix.io'
    },
    onPrepare: function() {
        browser.ignoreSynchronization = true;
        browser.manage().window().setSize(1024, 1024);

        browser.driver.get(browser.params.baseUrl);

        //If authentication is enabled - use this instead of the wait below
        require('./e2e/models/login-page').login();

        // TODO: new repo? ref-app-ui-smoke-tests
    },
    onComplete: function() {
        browser.driver.quit();

        // var printSessionId = function (jobName) {
        //     browser.getSession().then(function (session) {
        //         console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
        //     });
        // }
        // printSessionId("Insert Job Name Here");
    }
};

if (!process.env.SAUCE_USERNAME) {
  //just run chrome locally:
  config.capabilities = {
    'browserName': 'chrome'
  }
} else {
  config.multiCapabilities = [
    {
      'browserName': 'chrome',
      'name': 'rmd-ref-app-ui chrome',
      'build': 'rmd-ref-app-ui-chrome'
    },
    {
      'browserName': 'firefox',
      'name': 'rmd-ref-app-ui firefox',
      'build': 'rmd-ref-app-ui-firefox'
    },
    {
      'browserName': 'internet explorer',
      'name': 'rmd-ref-app-ui ie',
      'build': 'rmd-ref-app-ui-ie'
    }
  ]
}

console.log('protractor config: ', JSON.stringify(config));

exports.config = config;
