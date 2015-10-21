
if (window.location.host === "www.google.com") {
	$(".r").each(function() {
		$(this).find("a").each(function() {
			console.log($(this).attr("href"))
			$(this).removeAttr("onmousedown")
		})
	})
}
if (window.location.host === "www.facebook.com") {
	$(".jS.kl,#pagelet_ego_pane,.friendBrowserListUnit,.homeSideNav:not(:first-child),.fbChatSidebar").hide();
	if (!window.location.pathname.startsWith("/messages")) {
		window.location.href = "https://www.facebook.com/messages";
	}
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
	$('[placeholder="Search…"]').on("focus", function() {
		$(this).val("user:matthewmorrone1 ");
	})
}
if (window.location.pathname === "/pin/create/extension/") {
	$(".selected").click()
	
}
var langs = ["javascript", "coffeescript", "css", "html", "livescript", "purescript", "autohotkey", "php", "json"];
if (window.location.host.includes("github")) {
	$(".repo-list li").each(function() {
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



