console.clear()
if (window.location.host === "www.google.com") {
	$(".r").each(function() {
		$(this).find("a").each(function() {
			console.log($(this).attr("href"))
			$(this).removeAttr("onmousedown")
		})
	})
}
if (window.location.host === "www.facebook.com") {
	$(".jS.kl,#pagelet_ego_pane,.friendBrowserListUnit,.homeSideNav:not(:first-child)").hide();
	if (!window.location.pathname.startsWith("/messages")) {
		window.location.href = "https://www.facebook.com/messages";
	}

	var ul1 = $('ul[data-reactid*=".$ordered_list"]')
	,	li1 = $('ul[data-reactid*=".$ordered_list"] li')
	,	ul2 = $('ul[data-reactid*=".2:$more_online_friends"]')
	,	li2 = $('ul[data-reactid*=".2:$more_online_friends"] li')
	,	sep = $('._554m'); //.moreOnlineFriends

	fbChatAugment()
	setTimeout(function() {
		fbChatAugment()
	}, 2000)
	setInterval(function() {
		fbChatAugment()
	}, 10000)

	$(document).on("mouseover", ".fbChatOrderedList", function() {
		fbChatAugment()

		var $ul = $('ul[data-reactid*=".$ordered_list"]')
		$('li', $ul).sort(function(a, b){
			return (Math.round(Math.random()) - 0.5)
		}).appendTo($ul)
	})

}
function fbChatAugment() {
	$('._554m').remove();
	$('.moreOnlineFriends').remove();
	$('ul[data-reactid*=".2:$more_online_friends"] li').each(function(index, value){
		$('ul[data-reactid*=".$ordered_list"]').append(value);
	});
	$('ul[data-reactid*=".2:$more_online_friends"]').empty();
	$("._42fz").each(function() {
		if ($(this).find("._568-").text() !== "" || $(this).find(".sx_8ed4e7").length === 0) {
			$(this).remove()
		}
	})
	var $ul = $('ul[data-reactid*=".$ordered_list"]')
	$('li', $ul).sort(function(a, b){
		if($(a).find("._55lr span").text() < $(b).find("._55lr span").text()) return -1;
		if($(a).find("._55lr span").text() > $(b).find("._55lr span").text()) return 1;
		return 0;
	}).appendTo($ul)
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



