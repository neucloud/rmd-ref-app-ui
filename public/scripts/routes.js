/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
/*global define */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider
            .state('secure', {
                template: '<ui-view/>',
                abstract: true,
                resolve: {
                    authenticated: ['$q', 'PredixUserService', function ($q, predixUserService) {
                        var deferred = $q.defer();
                        predixUserService.isAuthenticated().then(function(userInfo){
                            deferred.resolve(userInfo);
                        }, function(){
                            deferred.reject({code: 'UNAUTHORIZED'});
                        });
                        return deferred.promise;
                    }]
                }
            })
            .state('dashboard', {
                parent: 'secure',
                url: '/dashboard',
                templateUrl: 'views/dashboards.html',
                controller: 'DashboardCtrl'
            })
            .state('live-data', {
                parent: 'secure',
                url: '/live-data',
                templateUrl: 'views/live-data.html',
                controller: 'LiveDataCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            })
            .state('frontend', {
                url: '/frontend',
                templateUrl: 'views/docs.html',
                controller: 'DocsCtrl'
            })
            .state('overview', {
                url: '/overview',
                templateUrl: 'views/docs.html',
                controller: 'DocsCtrl'
            });

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            document.querySelector('px-app-nav').markSelected('/dashboard');
            $state.go('dashboard');
        });

    }]);
});
