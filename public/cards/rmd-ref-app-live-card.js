/* global px */

Polymer({
	is: 'rmd-ref-app-live-card',

	properties: {
		width: {
			type: Number,
			notify: true,
			value: 500
		},
		height: {
			type: Number,
			notify: true,
			value: 400
		},
		min: {
			type: String,
			notify: true,
			value: null
		},
		max: {
			type: String,
			notify: true,
			value: null
		},
		thresholdLow: {
			type: String,
			notify: true
		},
		thresholdHigh: {
			type: String,
			notify: true
		},
		units: {
			type: String,
			notify: true,
			value: ''
		},
		title: {
			type: String,
			notify: true
		},
		wsUrl: {
			type: String,
			notify: true,
			value: 'wss://your-websocket-server'
		},
		thresholdLowLabel: {
			type: String,
			computed: 'buildLabel(thresholdLow, units)'
		},
		thresholdHighLabel: {
			type: String,
			computed: 'buildLabel(thresholdHigh, units)'
		},
		minLabel: {
			type: String,
			computed: 'buildLabel(min, units)'
		},
		maxLabel: {
			type: String,
			computed: 'buildLabel(max, units)'
		},
		rows: {
			type: Number,
			value: 10
		},
		showAssetLink: {
			type: Boolean,
			notify: true
		}
	},

	observers: ['updateChart(selectedParams)'],

	ready: function() {
		this.lineData = [];
		// console.log("init - assetLink: " + this.showAssetLink);
	},

	buildLabel: function(val, units) {
		// if (!val || !units) { return '';}
		if (!units) { return val; }
		return val + ' ' + units;
	},

	detached: function() {
		this.closeWebSocket();
	},

	attributeChanged: function(name, type) {
		// console.log(this.localName + '#' + this.id + ' attribute ' + name +
		//      ' was changed to ' + this.getAttribute(name));
		if (name === 'hidden' && this.getAttribute(name) === '') {
			// console.log('card hidden.');
			this.closeWebSocket();
		}
	},

	hideLiveData: function() {
		this.updateDeck({showLiveData: false});
		this.hideCard();
		this.closeWebSocket();
	},

	contextChanged: function(newContext) {
		// console.log('contextChanged: ' + JSON.stringify(newContext));

		this.allParams = newContext.pickerOptions;

		this.$.tsLiveParams.pickerOptions = this.allParams;

		// console.log('live card - selectedParams ' + this.selectedParams);

		if (this.allParams && ( !this.selectedParams || this.selectedParams.length < 1) ) {
			this.$.tsLiveParams.defaultOption = this.allParams[0];
		}
	},

	openWebSocket: function() {
		console.log('opening websocket: ' + this.wsUrl);
		var self = this;
		// show loading indicator?
		if (this.socket) {
			// enable start button ?
			this.socket.close();
		}
		try {
			this.socket = new WebSocket(this.wsUrl);
			self.intervalId = setInterval(function() {
				self.socket.send('ping');
			}, 20000);
		} catch (err) {
			console.log('Error opening web socket. ' + JSON.stringify(err));
			clearInterval(this.intervalId);
			// show error?
		}

		this.socket.onerror = function (error) {
			console.log('WebSocket Error: ' + error);
			// show error?
		};

		this.socket.onmessage = function (evt) {
			console.log('message from WebSocket: ' + evt.data);
			if (evt.data === 'SUCCESS') {
				return; // ignore the response from the 'ping'.
			}
			var chart = self.$.liveChart,
				newData = JSON.parse(evt.data);
			if (newData.datapoints) {  // real machine
				chart.addPoint(newData.datapoints[0]);
			} else {  // simulator
				chart.addPoint([newData.timestamp, newData.value]);
			}
		};

		this.socket.onclose = function (evt) {
			console.log('websocket closed. code: ' + evt.code);
			// console.log('reason: ' + evt.reason);
			// console.log('wasClean? ' + evt.wasClean);
		};
	},

	closeWebSocket: function() {
		if (this.socket) {
			this.socket.close();
		}
		clearInterval(this.intervalId);
	},

	updateChart: function(selectedParamString) {
		if (!this.hidden) {
			var selectedParams = JSON.parse(selectedParamString);
			this.thresholdLow = selectedParams.thresholdLow || 0;
			this.thresholdHigh = selectedParams.thresholdHigh || 100;
			// TODO: Clean this up??
			var padding = +(((this.thresholdHigh - this.thresholdLow) / 4).toFixed(2));
			this.min = this.thresholdLow - padding;
			this.max = this.thresholdHigh + padding;
			this.splice('lineData', 0, 25);
			this.wsUrl = selectedParams.wsUrl;
			this.openWebSocket();
		}
	},

	showLiveChart: function(selectedParams) {
		// console.log('showLiveChart selectedParam: ' + selectedParams);
		this.showCard();
		this.updateChart(JSON.stringify(selectedParams));
	},

	deckStateChanged: function(newState, oldState) {
		// console.log('live card - deckStateChanged: ' + JSON.stringify(newState));
		if (newState.showLiveData) {
			this.$.tsLiveParams.defaultOption = newState.liveParam;
			this.showLiveChart(newState.liveParam);
		} else {
			this.hideCard();
		}
	},

	behaviors: [px.card]
});
