if (window.location.host === "www.google.com") {
	$(".r").each(function() {
		$(this).find("a").each(function() {
			console.log($(this).attr("href"))
			$(this).removeAttr("onmousedown")
		})
	})
}

if (window.location.host === "inbox.google.com") {
	$(".jS.kl").remove()
	function removeImages() {
		setTimeout(function() {
			$(".jS.kl").remove()
			window.requestAnimationFrame(removeImages)
		}, 1000)
	}
	// window.requestAnimationFrame(removeImages)
}
if (window.location.host === "gist.github.com") {
	// $('[placeholder="Search…"]').on("focus", function() {
	$('.js-quicksearch-field').on("focus", function() {
		$(this).val("user:matthewmorrone1 ");
	})
}
if (window.location.host.includes("github")) {
	// $('[placeholder="Search…"]').on("focus", function() {
	$('.js-site-search-focus').on("focus", function() {
		$(this).val("user:matthewmorrone1 ");
	})
}
if (window.location.host.includes("pinterest")) {

	$(document).on("mouseover", ".item.selected", function(e) {
		if ($(".pinnedToBoardWarning").length === 0) {
			// $(this).click()
			$(e.target).click()
		}
	})
}
if (window.location.host.includes("pinterest") && window.location.pathname === "/pin/create/extension/") {
	setTimeout(function() {
		$li = $("li").eq(0)
		$li.find("button").show().click()
		setTimeout(function() {
			window.close()
		}, 5000)
	}, 500)
}
var langs = ["javascript", "coffeescript", "css", "html", "livescript", "purescript", "autohotkey", "php", "json"];
if (window.location.host.includes("github")) {
	$(".repo-list-item").each(function() {
		if (!$(this).hasClass("source")) {
			$(this).remove();
			return;
		}
		var lang = $(this).find(".repo-list-stats")[0].childNodes[0].textContent.trim().toLowerCase();
		if ($.inArray(lang, langs) === -1) {
			$(this).remove();
		}
	})
}



