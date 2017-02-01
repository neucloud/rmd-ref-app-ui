'use strict';

var LoginPage = function() {

	this.login = function() {

		browser.driver.wait(function() {
			return browser.driver.getCurrentUrl().then(function(url) {
				return /login/.test(url);
			});
		}, 10000);

		browser.driver.sleep(200); // for MS Edge
		browser.driver.findElement(by.name('username')).sendKeys('app_user_1');
		browser.driver.findElement(by.name('password')).sendKeys('app_user_1');
		browser.driver.findElement(by.css('.island-button')).click();

		browser.driver.wait(function() {
			return browser.driver.getCurrentUrl().then(function(url) {
				console.log('URL: ' + url);
				console.log('authorize? ' + /authorize/.test(url));

				if (/io\/dashboard/.test(url)) {
					console.log('dashboard');
					return true;
				} else if (/authorize/.test(url)) {
					// console.log('set auth required to true');
					console.log('AUTHORIZING');
					browser.driver.sleep(10);
					browser.executeScript('window.scrollTo(0,500);').then(function() {
						browser.driver.findElement(by.id('authorize')).click();
					});

					return true;
				}
				console.log('not dashboard or auth');
				return false;
			});
		}, 15000);

	};
};

module.exports = new LoginPage();
