if (chrome.downloads) {
	if (chrome.downloads.setShelfEnabled) {
		chrome.downloads.setShelfEnabled(false);
	}
}
chrome.storage.sync.get(function(items) {
	function sortHelper(c, d) {
		return function(a, b) {
				 if (c(a) > c(b))	return (d === "d" ?  1 : -1)
			else if (c(a) < c(b))	return (d === "d" ? -1 :  1)
			else					return 0
		}
	}
	if (Object.keys({items}).length === 0) {
		init()
	}
	if (items.debug) {console.log("chromega", window.location, items)}
	if ((window.location.host.includes("wikipedia") ||
		window.location.host.includes("freeformatter")) && items.wikipedia) {
		$(function() {
			$("table").each(function() {
				if ($(this).hasClass("processed")) {return}
				var $table = $(this),
					$button = $("<button class='export-button' export='0'>Export</button>"),
					$th, exp
				$table.before($button)
				$table.addClass("processed")

				$table.find("th").click(function(e) {
					exp = parseInt($button.attr("export"), 10)
					$button.attr("export", exp+1)
					e.preventDefault()
					e.stopPropagation()
					$th = $(this)
					$th.toggleClass("export")
					$table.find("tr:gt(0)").each(function() {
						$(this).find("th, td").eq($th.index()).toggleClass("export")
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
				var name = $(this).prevAll("h2").find(".mw-headline").text().replace(/ /g, "-").toLowerCase() || document.title
				name += ".csv"
				var content = $.map($table.find("tr"), function(a){
					return $.map($(a).find("th,td"), function(b) {
						log($(b).text(), $(b).html())
						return $(b).text() || $(b).html()
					}).join(",")
				}).join("\n")
				exportFile(name, content)
				$(".export").removeClass("export")
			})
			// to-do: when column headers have a colspan
		})
	}

	if (window.location.host.includes("newatlas") && items.newatlas) {
		var wheeldelta, wheeling, shiftKey
		$(document).on('mousewheel', function(e) {
			shiftKey = e.shiftKey
			clearTimeout(wheeling)
			wheeling = setTimeout(function() {
				e.preventDefault()
				wheeling = undefined
				if (wheeldelta > 0) {
					$(document).trigger('scrollDown', wheeldelta/100)

					// if ($(window).scrollTop()+$(window).height() == $(document).height()) {
					// 	$(document).trigger('scrollBottom', wheeldelta/100)
					// }
				}
				wheeldelta = 0
			}, 100)
			wheeldelta += e.originalEvent.deltaY
		});
		$(document).on('scrollDown', function(e, delta) {
			if ($(window).scrollTop()+$(window).height() >= $(document).height() - 100) {
				$(document).trigger('scrollBottom', wheeldelta/100)
			}
			var page = Number.parseInt(window.location.pathname.split('/')[2] || 1, 10)
			var next = page + 1

			if (Utils.isElementInView($('.pagination'), true)) {
				var sec = document.createElement("div")
				var url = window.location.href
				if (page === 1) {
					url = url.slice(0, -1) + '/page/' + next + '/'
				}
				else {
					url = url.slice(0, -3) + '/' + next + '/'
				}

				$(sec).load(url + " article", function() {
					$('article').last().after($(sec).html())
					window.history.pushState('Object', 'Title', '/page/'+next+"/");
				})
				$('.pagination').load(url + " .pagination")

			}





		})
	}


	if (window.location.host.includes("cracked") && items.cracked) {
		console.clear()
		var loc, nex, sec, block = ".mainFrameModule.contentTopModule, .rightColumn, .headerWrapper, .mainAd, .socialShareModule, [target='_blank'] img, .recommendedForYourPleasureModule.genericLeftModule, #Comments, .FacebookLike, .trc_related_container.trc_spotlight_widget, .footer, .socialShareAfterContent, script, iframe, .trc_related_container.trc_spotlight_widget, #taboola-autosized-2r"
		$(block).remove()
		if (window.location.pathname.includes("photoplasty")) {
			loc = window.location.href
			var i = 1, n = $(".paginationNumber:eq(1)").html()
			if (items.debug) {console.log(loc, i, n)}
			while (i++ < n) {
				nex = loc.slice(0, -1) + "_p"+i+"/"
				if (items.debug) {console.log(nex, i, n)}
				$.ajax({
					url: nex,
					async: false,
					dataType: "html"
				})
				.done(function(data) {
					sec = document.createElement("div")
					$(".leftColumn").find(".PaginationContent").remove()
					$(".columnistsModule.genericLeftModule").remove()
					$(".leftColumn").after(sec)
					$(sec).addClass("leftColumn")
					$(sec).html($(data).find(".leftColumn")[0].innerHTML)
					$("#safePlace").removeAttr("id")
					$("div").filter(function() {return $(this).html() === ""}).remove()
					$(block).remove()
					$(sec).find("header, footer").remove()
					$(sec).find("img").each(function() {
						$(this).attr("src", $(this).attr("data-img"))
					})
					$(".dropShadowBottomCurved").removeClass("dropShadowBottomCurved")
				})
			}
		}
		if (window.location.pathname.includes("article")
		|| window.location.pathname.includes("blog")
		|| window.location.pathname.includes("personal-experiences")) {
			loc = window.location.href
			if (window.location.pathname.includes("blog")) {
				nex = loc.slice(0, -1) + "_p2/"
			}
			else {
				if (loc.split("_").last() === "p2.html") {
					nex = loc.replace("_p2.html", ".html")
					window.location.href = nex
				}
				nex = loc.split(".")
				nex.pop()
				nex = nex.join(".") + "_p2.html"
			}
			sec = document.createElement("div")
			$(".leftColumn").find(".PaginationContent").remove()
			$(".columnistsModule.genericLeftModule").remove()
			$(".leftColumn").after(sec)
			$(sec).addClass(".leftColumn")
			$(sec).load(nex + " .leftColumn", function() {
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
	if (items.postmark) {
		console.log(items.postmark)
		if (window.location.host.includes("postmarkcu")) {
			if (window.location.href.includes("home")) {
				$("[name='userid']").val("matthewmorrone1")
				$("[name='userid']").parents("tr").next().find("a[href*='submit'] img").click() //.css("-webkit-filter", "invert(1)")
			}
		}
		if (window.location.host.includes("global1.onlinebank")) {
			$("#accountListTable tr:last-child").remove()
			$("#payFrom option:last-child, #payFrom option:nth-child(3), #payTo option:last-child, #payTo option:nth-child(3)").remove()
			$("#payTo option:last-child").html("Savings")
			$("#payFrom option, #payTo option").each(function() {
				$(this).html($(this).text().replace(/\*\d\-\d+/g, ""))
				$(this).html($(this).text().replace(/ 10 /, ""))
			})
		}
	}


	if (window.location.host === "www.facebook.com") {
		setTimeout(function() {
			document.getElementById("u_ps_0_4_2").click()
		}, 1000)
	}

	if (window.location.host === "www.google.com" && items.google) {
		var a, href, datahref, text
		$(".r").each(function() {
			$(this).find("a").each(function() {
				href = $(this).attr("href")
				text = $(this).text()
				a = $("<a></a>")
				a.href = href
				a.innerHTML = text
				a.target = "_blank"
				$(this).after(a)
			})
		})
		$(document).on("click", ".r a", function(e) {
			e.preventDefault()
			e.stopPropagation()
			href = $(this).attr("href")
			text = $(this).text()
			datahref = $(this).attr("data-href")
			if (datahref/* && !$(this).hasClass(".noredirect")*/) {
				a = $("<a></a>")
				a[0].href = datahref
				a[0].innerHTML = text
				a.attr("class", "noredirect")
				a[0].target = "_blank"
				$(this).parent().after(a)
				$(this).remove()
				$(a).click()
			}
			return false
		})
	}
	if (window.location.host === "inbox.google.com" && items.googleInbox) {
		$(".jS.kl").remove()
		function removeImages() {
			setTimeout(function() {
				$(".jS.kl").remove()
				window.requestAnimationFrame(removeImages)
			}, inc)
		}
		window.requestAnimationFrame(removeImages)
	}

	if ((window.location.host === "gist.github.com" || window.location.host.includes("github")) && items.github/*Gist*/) {
		$(document).on("focus", ".js-site-search-focus", function() {
			$(this).val("user:matthewmorrone1 ") // extract this from location object?
			$(this).one("keydown", function(e) {
				if (e.which === 8) {
					$(this).val("")
				}
			})
		})
		// if (window.location.search.includes("repositories")) {
		// 	document.elementFromPoint(1308, 138).click()
		// }
	}
})

