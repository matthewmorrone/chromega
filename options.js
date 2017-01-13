
var options = {
  "cracked": true,
  "debug": true,
  "gifreeze": true,
  "gist": true,
  "github": true,
  "google": true,
  "inbox": true,
  "peopleclick": true,
  "pinterest": true,
  "postmark": true,
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
      $(document.getElementById(k)).parents("label")[0].setAttribute("class", items[k] ? "enabled" : "disabled")
    }
  })
}
document.addEventListener('DOMContentLoaded', restore)

$(function() {
  $("label").click(function() {
    save()
    if ($(this).find("input[type='checkbox']")[0].checked === false) {
      $(this).removeClass("enabled").addClass("disabled")
    }
    else {
      $(this).removeClass("disabled").addClass("enabled")
    }
    // chrome.tabs.getSelected(null, function(tab) {
    //   var code = 'window.location.reload();';
    //   chrome.tabs.executeScript(tab.id, {code: code});
    // });
    chrome.tabs.reload()
  })
})

