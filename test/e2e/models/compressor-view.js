'use strict';
var moment = require('moment');

var CompressorView = function() {

	this.verifyReliability = function() {
		browser.driver.wait(function() {
			return browser.driver.isElementPresent(by.css('.rmd-ref-app-summary-card:nth-child(3) .summary-value')).then(function(x) {
				return x === true;
			});
		}).then(function() {
			element(by.css('.rmd-ref-app-summary-card:nth-child(3) .summary-value')).getText().then(function(text) {
				expect(text).toBe('60.0');
			});
		}, 5000, "Could not find reliability value.");
	};

	this.verifyLastReading = function() {
		var readingCount = 0;
		browser.driver.wait(function(){
			return browser.driver.isElementPresent(by.css('.px-data-table .tr.rows')).then(function(el) {
				return el === true;
			});
		}).then(function() {
			// TODO: Fix UI, so it displays 24 hours, otherwise we don't know if the reading is from morning or afternoon.
			var expectedTime = moment().subtract(13, 'h');
			// console.log('oneHourAgo: ' + expectedTime.format());
			element.all(by.css('.px-data-table .tr.rows')).each(function (element /*, index*/) {
				element.$('.td.aha-table:nth-child(5) aha-html-echo').getText().then(function(text) {
					// console.log(index, text);
					if (text.length > 0) {
						var lastReading = moment(text);
						// console.log(lastReading.format());
						expect(lastReading.isValid()).toBe(true);
						expect(lastReading.isAfter(expectedTime)).toBe(true);
						readingCount++;
					}
				});
				return true;
			}).then(function() {
				expect(readingCount).toBe(7);
			});
		});

	};

};

module.exports = new CompressorView();
