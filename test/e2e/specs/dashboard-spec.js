'use strict';

var contextBrowser = require('../models/context-browser');
var compressorView = require('../models/compressor-view');

describe('Dashboard page', function() {

    function navigateToBently() {
        contextBrowser.openContextBrowser();
        contextBrowser.waitAndClick('#\\/group\\/enterprise-predix');
        contextBrowser.waitAndClick('#\\/group\\/site-richmond');
        contextBrowser.waitAndClick('#\\/group\\/plant-richmond-refinery');
        contextBrowser.waitAndClick('#\\/asset\\/compressor-2015');
        contextBrowser.waitAndOpenAsset('/asset/compressor-2015');
    }

    it('navigates to the appropriate url after login', function() {
        expect(browser.driver.getCurrentUrl()).toContain('dashboard');
    });

    it('shows assets in context browser', function() {
        browser.driver.get(browser.params.baseUrl + '/dashboard');
        navigateToBently();
    });

    it('shows current values for bently compressor', function() {
        browser.driver.get(browser.params.baseUrl + '/dashboard');
        navigateToBently();
        compressorView.verifyLastReading();
        compressorView.verifyReliability();
    });
});
