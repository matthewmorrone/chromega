function getTab(sender, count) {
	chrome.tabs.query({windowId: sender.tab.windowId}, function(tabs) {
		var newTabId = tabs[(((count + sender.tab.index) % tabs.length) + tabs.length) % tabs.length].id;
		return chrome.tabs.update(newTabId, {active: true});
	});
}

function commander(command) {
	switch (command) {
		case "next_tab":
			chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
				return getTab({tab: tab[0]}, 1);
			});
		break;
		case "prev_tab":
			chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
				return getTab({tab: tab[0]}, -1);
			});
		break;
		case "close_tab":
			chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
				chrome.tabs.remove(tab[0].id, function() {
					return chrome.runtime.lastError;
				});
			});
		break;
		case "duplicate":
			chrome.tabs.getSelected(null, function(tab) {
				chrome.tabs.duplicate(tab.id);
			});
		break;
		case "extensions":
			chrome.tabs.create({url: "chrome://extensions"});
		break;
		case "apps":
			chrome.tabs.create({url: "chrome://apps"});
		break;
		case "bookmarks":
			chrome.tabs.create({url: "chrome://bookmarks"});
		break;
		case "settings":
			chrome.tabs.create({url: "chrome://settings"});
		break; 
		case "inbox":
			chrome.tabs.create({url: "https://mail.google.com/"});
		break;
		case "drive":
			chrome.tabs.create({url: "https://drive.google.com/"});
		break; 
		case "music":
			chrome.tabs.create({url: "https://play.google.com/music/listen"});
		break; 
		default: break;
	}
}

chrome.commands.onCommand.addListener(commander);
