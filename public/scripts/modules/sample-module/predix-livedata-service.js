/*global define */
define(['angular', './sample-module'], function (angular, module) {
    'use strict';
    /**
     * Simple service to get a URL.
     */
    module.factory('PredixLiveDataService', ['$q', '$http', function ($q, $http) {
        var getWsUrl = function() {
            var deferred = $q.defer();

            $http.get('/getWsUrl?' + Math.random())
                .success(function(results) {
                    console.log('WS URL: ' + JSON.stringify(results));
                    deferred.resolve(results);
                })
                .error(function() {
                    deferred.reject('Error fetching WS Url.');
                });
            return deferred.promise;
        };

        return {
            getWsUrl: getWsUrl
        };
    }]);
});
