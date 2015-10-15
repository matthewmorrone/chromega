chrome.extension.onRequest.addListener(function(request, sender) {
    chrome.tabs.update(sender.tab.id, {url: request.redirect});
});
// var rule = {
// 	conditions: [
// 		new chrome.declarativeWebRequest.RequestMatcher({
// 			url: {
// 				hostSuffix: "facebook.com",
// 				schemes: ["http", "https"]
// 			}
// 		})
// 	],
// 	actions: [
// 		new chrome.declarativeWebRequest.RedirectRequest({redirectUrl: "facebook.com/messages"})
// 	]
// };
// chrome.declarativeWebRequest.onRequest.addRules([rule]);


// var rule = {
//	conditions: [
//		new chrome.declarativeWebRequest.RequestMatcher({
//			url: {
//				hostSuffix: "facebook.com",
//				schemes: ["http", "https"]
//			}
//		})
//	],
//	actions: [
//		new chrome.declarativeWebRequest.RedirectRequest({redirectUrl: "facebook.com/messages"})
//	]
// };
// chrome.declarativeWebRequest.onRequest.addRules([rule]);

// chrome.extension.onRequest.addListener(function(request, sender) {
//	 chrome.tabs.update(sender.tab.id, {url: request.redirect});
// });

// chrome.webRequest.onBeforeRequest.addListener(
//		 function(details) { return {cancel: true}; },
//		 {urls: ["*://www.facebook.com/*"]},
//		 ["blocking"]);

// var rule = {
//	conditions: [
//		new chrome.declarativeWebRequest.RequestMatcher({url: { 
//			hostSuffix: 'facebook.com' } 
//		})
//	],
//	actions: [
//		new chrome.declarativeWebRequest.CancelRequest()
//	]
// };
// chrome.declarativeWebRequest.onRequest.addRules([rule]);


// function redirectToMessages() {

// 	var i = setInterval(function() {
// 		if (!window.location.pathname.startsWith("/messages")) {
// 			window.location.href = "https://www.facebook.com/messages";
// 		}
// 		else {
// 			clearInterval(i);
// 		}
// 	}, 1000)
		
// }
// if (window.location.host === "www.facebook.com") {
// 	$(window).on('hashchange', function() {
// 		redirectToMessages()
// 	});
// 	redirectToMessages()
// }

// var pattern=/\bBlocked/;
// var viewtext_base_url = "http://viewtext.org/article?url=";
// var newurl;
// if (pattern.test(window.document.title)) {
// 	newurl = viewtext_base_url + encodeURIComponent(window.location.href);
// 	chrome.extension.sendRequest({redirect: newurl}); // send message to redirect
// }





