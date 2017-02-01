## RM&D Reference Application UI Microservice

### Getting Started 

#### Accessing RM&D Application in Cloud Foundry
You can view the [RMD Application](https://rmd-ref-app.run.aws-usw02-pr.ice.predix.io) in your browser using these login credentials

        User: app_user_1
        Password: app_user_1

#### Get the code
Predix Cloud is currently in a limited beta.  To get access you'll need to register on [Predix.io](http://predix.io) and get an invitation.  After you get beta access, you'll be able to download code from Github.com and run your app on GE's Cloud.

To download and run the entire reference app, take a look at the steps described here: [https://github.com/PredixDev/predix-rmd-ref-app](https://github.com/PredixDev/predix-rmd-ref-app#predix-rmd-reference-app)

**Note:** At this time, the UI application is dependent on a variety of microservices, as described on the [predix-rmd-ref-app README page](https://github.com/PredixDev/predix-rmd-ref-app#predix-rmd-reference-app).  In the future, we may add steps to run the UI application with mock microservices, so you can focus on the front end.

This Readme file will explain how to set up and run the front end (UI) portion of the app.  To get the code for the front end application, run the git clone command below.  If you're planning to build on top of this RMD ref app, you should create a fork on the Github server.  If not, you can just clone this repo directly.
    ```
    git clone https://github.com/PredixDev/rmd-ref-app-ui
    ```

#### Set up dev tools
1. If you're new to Predix, you might want to [download the Devbox](https://www.predix.io/catalog/other-resources/devbox.html). It's a Linux VM fully configured for Predix development.
1. Make sure your machine is configured to use proxy servers correctly, if you're on a corporate network.  (on Windows use "set" instead of "export".)  These proxy settings work for the GE network:
    ```
    export HTTP_PROXY="http://<Your proxy server url>";
    export HTTPS_PROXY=$HTTP_PROXY
    export http_proxy=$HTTP_PROXY
    export https_proxy=$HTTP_PROXY
    export no_proxy="<your domains here>"
    ```

1. If you don't have Node (v0.10.28) installed already, you'll need to install it: <a href="http://nodejs.org/download/">http://nodejs.org/download/</a>
1. You might need to configure npm to use a proxy server, following these steps.
    ```
    npm config set proxy http:<Your proxy server url>
    npm config set https-proxy http:<Your proxy server url>
    npm config set registry http://registry.npmjs.org
    npm config set strict-ssl false
    ```
1. If you don't have Bower installed already, you'll need to install that too:
    ```
    npm install -g bower
    ```

### Running the Application
Before running the application locally, or in the cloud, you'll need to set up the required microservices described here:  [predix-rmd-ref-app README page](https://github.com/PredixDev/predix-rmd-ref-app#predix-rmd-reference-app).

#### Running locally

In the rmd-ref-app-ui directory, run:

```
npm install
bower install
grunt serve
```
This should launch your browser.  If not, you can browse to <http://localhost:9000>

(Whether running locally or in the cloud, login will work the same way. For this app, use the default username/password: `app_user_1`/`app_user_1`)

#### Running in Cloud Foundry
To run in the cloud, you'll need to make sure your manifest.yml file is complete.  If you ran the reference app install python script, then it will be correct.  If not, you'll need to make a copy of the manifest.yml.template file, rename to manifest.yml, and add the correct values for your services.

After running `npm install` and `bower install`, you can build and deploy the application to Cloud Foundry with two commands:
```
grunt dist
cf push my_ref_app
```

The reference application is a good starting point to understand Predix cloud application development. It would be helpful to get familiar with [Cloud Foundry concepts](http://docs.cloudfoundry.org/) before you proceed.

###Tech Stack
- Polymer Web Components
- Angular
- Npm
- Bower
- Grunt

##Microcomponents
- [Dashboard Seed](https://github.com/predixdev/predix-seed)
- See [bower.json](https://github.com/PredixDev/rmd-ref-app-ui/blob/master/bower.json) in this repository for a complete list of front end web components.

### More Details
* [More GE resources](https://github.com/predixdev/predix-rmd-ref-app/docs/resources.md)
* [RMD Reference App](http://github.com/predixdev/predix-rmd-ref-app)

---
_For your convenience, this page contains links to Web sites owned or operated by third parties (“Third Party Sites”). GE does not control, operate, or endorse these Third Party Sites, and we are not responsible for their content.  When you follow these links to sites outside of the “ge.com” domain, you are leaving our Web site. Your use of such Third Party Sites is your sole responsibility and at your sole risk._

[![Analytics](https://ga-beacon.appspot.com/UA-82773213-1/rmd-ref-app-ui/readme?pixel)](https://github.com/PredixDev)
