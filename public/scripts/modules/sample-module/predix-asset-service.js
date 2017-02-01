/*global define */
define(['angular', './sample-module'], function (angular, module) {
    'use strict';
    /**
     * PredixAssetService is a sample angular service that integrates with Predix Asset Server API
     */
    module.factory('PredixAssetService', ['$q', '$http', function ($q, $http) {

        /**
         * predix asset server base url
         */
        var baseUrl = '/api';

        /**
         * Added for reference app, to change query, depending on level in asset heirarchy.
         */
        var getChildrenUrl = function (parentId) {
            var query;

            if (parentId.indexOf('plant') >= 0) {
                // at plant level, we search for assets in the plant group
                // TODO - find a better way to identify plants???
                query = baseUrl + '/asset?filter=group=';
            } else if (parentId.indexOf('asset') >= 0) {
                // assets have parent assets
                query = baseUrl + '/asset?filter=parent=';
            } else {
                // groups have parent groups
                query = baseUrl + '/group?filter=parent=';
            }
            query = query + parentId;
             //console.log('returning childrenUrl: ' + query);
            return query;
        };

        /**
         * this method transforms asset entity into an object format consumable by px-context-browser item
         */
        var transformEntityForDisplay = function (entity) { // transform your entity to context browser entity format
            entity.name = entity.description;
            entity.id = entity.uri;
            entity.parentId = entity.parent;
            // we can only open plants or assets:
            entity.isOpenable = (entity.uri.indexOf('plant') >= 0 || entity.uri.indexOf('asset') >= 0);
            return entity;
        };

        var getRmdRefAppEntities = function(parent) {
            var parentId = parent.uri,
                deferred = $q.defer();

            $http.get(getChildrenUrl(parentId))
                .success(function (results) {  //, status, headers) {

                    var transformedChildren = [];
                    results.forEach(function(asset) {
                        transformedChildren.push(transformEntityForDisplay(asset));
                    });

                    var childEntities = {
                        meta: {parentId: parentId},
                        data: transformedChildren // results
                    };
                    deferred.resolve(childEntities);
                })
                .error(function () {
                    deferred.reject('Error fetching group with parent id ' + parentId);
                });

            return deferred.promise;
        };

        var getSampleAsset = function() {
            var deferred = $q.defer();

            $http.get('/sample-data/compressor.json')
                .success(function(results) {
                    console.log('sample data: ' + JSON.stringify(results));
                })
                .error(function() {
                    deferred.reject('Error fetching sample asset.');
                });
            return deferred.promise;
        };

        return {
            getRmdRefAppEntities: getRmdRefAppEntities,
            getSampleAsset: getSampleAsset
        };
    }]);
});
