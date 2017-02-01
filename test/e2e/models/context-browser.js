'use strict';

var ContextBrowser = function() {

	this.waitAndClick = function(cssSelector) {
		browser.driver.sleep(300); //HACK
		var EC = protractor.ExpectedConditions;
		browser.wait(EC.elementToBeClickable($(cssSelector)), 5000).then(function() {
			return element(by.css(cssSelector)).click();
		});
	};

	this.waitAndOpenAsset = function(assetUri) {
		// TODO: get rid of this...
		browser.driver.sleep(300);

		element.all(by.css('.level.selected li.selected .flex__item + button')).each(function(btn) {
			btn.getAttribute('key').then(function(attr) {
				if (attr === assetUri) {
					// console.log('button key: ' + attr);
					var ec = protractor.ExpectedConditions;
					browser.wait(ec.elementToBeClickable(btn), 3000).then(function() {
						// console.log('element is clickable, clicking now.');
						return btn.click();
					});
				}
			});
		});
	};

/*
	function findAssetInBrowser(label) {
		// var label="Predix Energy";
		console.log('findAssetInBrowser:', label);
		var elements = element.all(by.css('.px-context-browser span.flex__item'));
		if (elements.count() < 1) {
			return false;
		}
		var x = elements.filter(function(elem) {
			return elem.getText().then(function(text) {
				console.log('text:', text);
				return text === label;
			});
		});
		return x.count() > 0 ? x.first() : false;
	}

	this.waitAndClickAssetNew = function(label) {
		var asset;

		return browser.wait(function() {
			// return findAssetInBrowser(label);
			asset = findAssetInBrowser(label);
			return asset;
			// console.log('asset:', asset);
			// return asset ? asset.click() : false;
		}, 5000, 'Could not click on asset: ' + label).then(function() {asset.click();});
	};

	this.waitAndClickAsset = function(label) {
		var initialCount, elements, match;
		return element.all(by.css('.px-context-browser span.flex__item')).count().then(function(x) {
			initialCount = x;
		}).then(function() {
			console.log('initialCount ' + initialCount);
			browser.wait(function() {
				var countChanged;
				elements = element.all(by.css('.px-context-browser span.flex__item'));
				elements.count().then(function(newCount) {
					console.log('new element count: ' + newCount);
					countChanged = newCount > initialCount;
					console.log('countChanged: ' + countChanged);
					if (countChanged) {
						countChanged = false;
						elements.filter(function(elem) {
							return elem.getText().then(function(text) {
								console.log('text: ' + text + 'label: ' + label);
								match = text === label;
								console.log('MATCH? ' + match);
								return match;
							});
						}).first().click().then(function() {
							// browser.driver.sleep(1500);
							match = true;
						});
					}
				});
				if (match) { return match; }
			}, 5000, 'Could not click on asset: ' + label);

		});
	};
*/

	this.openContextBrowser = function() {
		this.waitAndClick('.fa-caret-down');
	};
};

module.exports = new ContextBrowser();
