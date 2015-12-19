if (chrome.downloads) {
	if (chrome.downloads.setShelfEnabled) {
		chrome.downloads.setShelfEnabled(false);
	}
}
chrome.storage.sync.get(function(items) {

	if (window.location.host.includes("wikipedia")) {
		$(function() {
			$("table").each(function() {
				var $table = $(this), $button = $("<button class='export-button' export='0'>Export</button>"), $th, exp
				$table.before($button)
				$(this).find("th").dblclick(function(e) {
					exp = parseInt($button.attr("export"), 10)
					$button.attr("export", exp+1)
					e.preventDefault()
					e.stopPropagation()
					$th = $(this)
					$th.toggleClass("export")
					$table.find("tr").each(function() {
						$(this).find("td").eq($th.index()).toggleClass("export")
					})
				})
			})
			$(document).on("click", ".export-button", function() {
				$table = $(this).next("table")
				var $table = $table.clone()
				var exp = parseInt($(this).attr("export"), 10)
				if (exp > 0) {
					$table.find("th:not(.export), td:not(.export)").remove()
				}
				var name = $(this).prevAll("h2").find(".mw-headline").text().replace(" ", "-").toLowerCase() + ".csv"
				var content = $.map($table.find("tr"), function(a){return $.map($(a).find("th,td"), function(b) {return $(b).text() || $(b).html()}).join(",")}).join("\n")
				exportFile(name, content)
				// $table.replaceWith($clone)
				$(".export").removeClass("export")

			})
		})
	}

	function clone(i) {
		return JSON.parse(JSON.stringify(i))
	}

	function exportFile(name, content) {
		// var encodedUri = encodeURI(content);
		// content = content.join("%0A")
		content = encodeURI(content)
		var a = document.createElement("a");
		a.setAttribute("target", '_blank');
		a.setAttribute("href", 'data:attachment/csv,' + content);
		a.setAttribute("download", name);
		a.click();
		document.body.appendChild(a);
	}

	$("#export").click(function() {
		exportFile("icons.csv", $.map($("#cache .entry"), function(a) {return $(a).find(".name").text() +", "+ $(a).find(".tags").text()}))
	})

	if (window.location.host.includes("cracked")) {
		console.clear()
		console.log("wtf")
		var loc, next, sec, block = ".mainFrameModule.contentTopModule, .rightColumn, .headerWrapper, .mainAd, .socialShareModule, [target='_blank'] img, .recommendedForYourPleasureModule.genericLeftModule, #Comments, .FacebookLike, .trc_related_container.trc_spotlight_widget, .footer, .socialShareAfterContent, script, iframe, .trc_related_container.trc_spotlight_widget, #taboola-autosized-2r"
		$(block).remove()

		if (window.location.pathname.includes("article")) {
			loc = window.location.href
			if (loc.split("_").last() === "p2.html") {
				nex = loc.replace("_p2.html", ".html")
				window.location.href = nex
			}

			nex = loc.split(".")
			nex.pop()
			nex = nex.join(".") + "_p2.html"
			sec = document.createElement("div")

			$(".leftColumn").find(".PaginationContent").remove()
			$(".leftColumn").after(sec)

			$(sec).addClass(".leftColumn")
			$(sec).load(nex+" .leftColumn", function() {
				$(sec).find(block).remove()
				$(sec).find("header, footer").remove()
				$(sec).find("img").each(function() {
					$(this).attr("src", $(this).attr("data-img"))
				})
				$(".dropShadowBottomCurved").removeClass("dropShadowBottomCurved")

			})

		}
		$(block).remove()
	}
	if (window.location.host.includes("peopleclick")) {
		$(function() {
			$(".x-table-layout input[type='text']").each(function(i, o) {
				if (i < 1 || i > 5) {$(this).focus().val("0").blur(); return}
				$(this).focus().val("7.5").blur()
			})
			$("#BR1_btnSubmit_btn").focus()
		})
	}
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
	// 	setTimeout(function() {
	// 		$('.repo_filterer li:eq(2) a').click()
	// 		$('.js-repo-filter-tab').eq(1).click()
	// 		$("#js-pjax-container > div > div > div.column.three-fourths > div.tab-content.js-repo-filter > div > div > ul > li:nth-child(3) > a").click()
	// }, 1000)
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
// github repo filter
// https://gist.github.com/matthewmorrone1/60356a70f10619ced0bd




