if (chrome.downloads) {
	if (chrome.downloads.setShelfEnabled) {
		chrome.downloads.setShelfEnabled(false);
	}
}
chrome.storage.sync.get(function(items) {
	console.log(items)
	if (window.location.host === "www.google.com" && items.google) {
		$(".r").each(function () {
			$(this).find("a").each(function () {
				console.log($(this).attr("href"))
				$(this).removeAttr("onmousedown")
			})
		})
	}
	if (window.location.host === "inbox.google.com" && items.googleInbox) {
		$(".jS.kl").remove()
		function removeImages() {
			setTimeout(function () {
				$(".jS.kl").remove()
				window.requestAnimationFrame(removeImages)
			}, 1000)
		}
		// window.requestAnimationFrame(removeImages)
	}
	if (window.location.host === "gist.github.com" && items.githubGist) {
		$('.js-quicksearch-field').on("focus", function () {
			$(this).val("user:matthewmorrone1 ");
		})
	}
	if (window.location.host.includes("github") && items.github) {
		$('.js-site-search-focus').on("focus", function () {
			$(this).val("user:matthewmorrone1 ");
		})
	}
	if (window.location.host.includes("pinterest") && items.pinterest) {
		$(document).on("mouseover", ".item.selected", function (e) {
			if ($(".pinnedToBoardWarning").length === 0) {
				$(e.target).click()
			}
		})
		if (window.location.pathname === "/pin/create/extension/") {
			setTimeout(function () {
				var $li = $("li").eq(0)
				$li.find("button").show().click()
				setTimeout(function() {
					window.close()
				}, 5000)
			}, 500)
		}
	}
});





