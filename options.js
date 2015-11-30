// Saves options to chrome.storage
function save() {
	var google = document.getElementById('google').checked
	var googleInbox = document.getElementById('inbox-google').checked
	var githubGist = document.getElementById('gist-github').checked
	var github = document.getElementById('github').checked
	var pinterest = document.getElementById('pinterest').checked
	chrome.storage.sync.set({
		"google" : google,
		"googleInbox" : googleInbox,
		"githubGist" : githubGist,
		"github" : github,
		"pinterest" : pinterest
	}, function() {
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function() {
			status.textContent = '';
		}, 750);
	});
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore() {
	chrome.storage.sync.get({
		'google' : true,
		'googleInbox' : true,
		'githubGist' : true,
		'github' : true,
		'pinterest' : true
	}, function(items) {
		document.getElementById('google').checked = items.google
		document.getElementById('inbox-google').checked = items.googleInbox
		document.getElementById('gist-github').checked = items.githubGist
		document.getElementById('github').checked = items.github
		document.getElementById('pinterest').checked = items.pinterest
	});
}
document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);
