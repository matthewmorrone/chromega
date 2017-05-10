
var options = {
	"cracked": true,
	"debug": true,
	"gist": true,
	"github": true,
	"google": true,
	"inbox": true,
	"newatlas": true,
	"pinterest": true,
	"wikipedia": true
}


// Saves options to chrome.storage
function save() {
	for (var k in options) {
		options[k] = document.getElementById(k).checked
	}
	chrome.storage.sync.set(options, function() {})
}

function init() {
	chrome.storage.sync.set(options, function() {
		return true
	})
}

function restore() {
	chrome.storage.sync.get(options, function(items) {
		for (var k in items) {
			document.getElementById(k).checked = items[k]
			$(document.getElementById(k)).parents("li").addClass(items[k] ? "" : "disabled")
		}
	})
}
document.addEventListener('DOMContentLoaded', restore)

$(function() {
	$("[type='checkbox']").change(function() {
		if ($(this).is(':checked')) {
			$(this).parents('li').removeClass("disabled")
		}
		else {
			$(this).parents('li').addClass("disabled")
		}
		save()
	})
})

