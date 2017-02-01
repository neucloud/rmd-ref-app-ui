define(['angular', './sample-module'], function(angular, sampleModule) {
	'use strict';
	return sampleModule.controller('LiveDataCtrl', ['$scope', '$http', 'PredixLiveDataService',
		function($scope, $http, PredixLiveDataService) {
	        PredixLiveDataService.getWsUrl().then(function(urlData) {
	            $scope.context = {};
				$scope.wsUrl = urlData.wsUrl + '/livestream';
	            // console.log('scope.context.wsUrl: ' + $scope.context.wsUrl);
	            $scope.context.pickerOptions =
					[
				        {
				            "sourceTagId": "Compressor-2015:CompressionRatio",
				            "meterUri": "/tag/crank-frame-compressionratio",
				            "thresholdHigh": 3,
				            "thresholdLow": 2.5,
				            "wsUrl": $scope.wsUrl + "/Compressor-2015:CompressionRatio",
				            "label": "crank-frame-compressionratio",
				            "colorIndex": 0
				        },
				        {
				            "sourceTagId": "Compressor-2015:DischargePressure",
				            "meterUri": "/tag/crank-frame-dischargepressure",
				            "thresholdHigh": 23,
				            "thresholdLow": 0,
				            "wsUrl": $scope.wsUrl + "/Compressor-2015:DischargePressure",
				            "label": "crank-frame-dischargepressure",
				            "colorIndex": 1
				        },
				        {
				            "sourceTagId": "Compressor-2015:SuctionPressure",
				            "meterUri": "/tag/crank-frame-suctionpressure",
				            "thresholdHigh": 0.21,
				            "thresholdLow": 0,
				            "wsUrl": $scope.wsUrl + "/Compressor-2015:SuctionPressure",
				            "label": "crank-frame-suctionpressure",
				            "colorIndex": 2
				        },
				        {
				            "sourceTagId": "Compressor-2015:MaximumPressure",
				            "meterUri": "/tag/crank-frame-maxpressure",
				            "thresholdHigh": 26,
				            "thresholdLow": 22,
				            "wsUrl": $scope.wsUrl + "/Compressor-2015:MaximumPressure",
				            "label": "crank-frame-maxpressure",
				            "colorIndex": 3
				        },
				        {
				            "sourceTagId": "Compressor-2015:MinimumPressure",
				            "meterUri": "/tag/crank-frame-minpressure",
				            "wsUrl": $scope.wsUrl + "/Compressor-2015:MinimumPressure",
				            "label": "crank-frame-minpressure",
				            "colorIndex": 4
				        },
				        {
				            "sourceTagId": "Compressor-2015:Velocity",
				            "meterUri": "/tag/crank-frame-velocity",
				            "thresholdHigh": 0.07,
				            "thresholdLow": 0,
				            "wsUrl": $scope.wsUrl + "/Compressor-2015:Velocity",
				            "label": "crank-frame-velocity",
				            "colorIndex": 5
				        },
				        {
				            "sourceTagId": "Compressor-2015:Temperature",
				            "meterUri": "/tag/crank-frame-temperature",
				            "thresholdHigh": 80,
				            "thresholdLow": 65,
				            "wsUrl": $scope.wsUrl + "/Compressor-2015:Temperature",
				            "label": "crank-frame-temperature",
				            "colorIndex": 6
				        }
				    ];
	        }, function (msg) {
	            console.log(msg);
	        });
		}]);
});
