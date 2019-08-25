var filter = {urls: ["<all_urls>"]};

chrome.webRequest.onBeforeRequest.addListener(function() {
	console.log('intercepted', arguments)
}, filter)

var XHR = XMLHttpRequest.prototype

var open = XHR.open
var send = XHR.send

XHR.open = function(method, url) {
	this._method = method
	this._url = url
	return open.apply(this, arguments)
}

XHR.send = function(postData) {
	this.addEventListener('load', function() {
		console.log('intercepted', this)
	})
	return send.apply(this, arguments)
}