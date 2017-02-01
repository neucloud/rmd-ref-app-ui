## Front End Dev Notes
This application is based on a fork of the [Predix Experience seed app](https://github.com/PredixDev/predix-seed).  Here are a few details on code that was modified and added to customize the seed app.  All the javascript code is in the public/scripts directory.  High level app configuration is in the root directory.

### App configuration
* app.js - set tabs for main navigation.
* routes.js - configure URLs and states for Angular UI router.
* bower.json - add runtime dependencies.  (including web components)
* manifest.yml - change app name
* polymer-loader.html - change to include dependencies such as cards, and other bower_components
* dist/nginx.conf - configure UAA and routes to secure microservices, for cloudfoundry deployment only.
* tasks/options/connect.js - configure UAA and routes to secure microservices, for local development only.

### Angular Controllers
These controllers map to the main nav items on the left of the application.  They can be found in the public/scripts/modules/sample-module directory.
* dashboard.js - Queries Predix Asset service.  The code in this controller came from the predix-seed application, and was modified for this RMD application.
* docs-controller.js - Displays markdown files (like this one) for the "About" section of the application.

### Web Components
Most of these components are listed in the [bower.json](https://github.com/PredixDev/rmd-ref-app-ui/blob/master/bower.json) file for this project.  Also see the [bower.json](https://github.com/PredixDev/rmd-ref-app-cards/blob/master/bower.json) for the rmd-ref-app-cards repo.

PX Components used "out of the box":
* px-context-browser: https://github.com/predixdev/px-context-browser
* px-app-nav: https://github.com/predixdev/px-app-nav
* px-card: https://github.com/predixdev/px-card

PX Design elements:
* px-theme: https://github.com/predixdev/px-theme
* px-layout-design: https://github.com/predixdev/px-layout-design
* px-buttons-design: https://github.com/predixdev/px-buttons-design
* px-forms-design: https://github.com/predixdev/px-forms-design
* px-chart: https://github.com/PredixDev/px-chart

Web components contributed to the Predix community by the adoption team:
* ref-list-picker: https://github.com/predixdev/ref-list-picker
* ref-digital-meter: https://github.com/predixdev/ref-digital-meter

PX Components customized (forked) for this app:
* rmd-px-data-table: https://github.com/predixdev/rmd-px-data-table
* rmd-simple-line-chart: https://github.com/predixdev/rmd-simple-line-chart
