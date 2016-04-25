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
					$in = $('<input type="text" class="search-input" />'),
					$th, exp
				// $table.before($button)
				// $table.before($in)
				// $table.tablesearcher({'input' : $in})
				$table.addClass("processed")

				// $table.find("th").click(function(e) {
				// 	exp = parseInt($button.attr("export"), 10)
				// 	$button.attr("export", exp+1)
				// 	e.preventDefault()
				// 	e.stopPropagation()
				// 	$th = $(this)
				// 	$th.toggleClass("export")
				// 	$table.find("tr:gt(0)").each(function() {
				// 		$(this).find("th, td").eq($th.index()).toggleClass("export")
				// 	})
				// })
				var dir = "d"
				$table.find("th").click(function(e) {
					$th = $(this)
					dir = (dir === "d" ? "a" : "d")
					$table.find("tr:gt(0)").sort(sortHelper(function(c) {
						var res = $(c).find("th, td").eq($th.index()).text()
						if (!isNaN(res)) {
							return parseInt(res, 10)
						}
						return res
					}, dir)).appendTo($table);

				})

				// function(a, b) {
				// 	return $(a).find("th, td").eq($th.index()).text() - $(b).find("th, td").eq($th.index()).text()
				// }
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
				var content = $.map($table.find("tr"), function(a){return $.map($(a).find("th,td"), function(b) {return $(b).text() || $(b).html()}).join(",")}).join("\n")
				exportFile(name, content)
				$(".export").removeClass("export")

			})
			// to-do: when column headers have a colspan
		})
	}

	function clone(i) {
		return JSON.parse(JSON.stringify(i))
	}

	function exportFile(name, content) {
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
	if (window.location.host.includes("postmarkcu") && items.postmark) {
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
	if (window.location.host.includes("peopleclick") && items.peopleclick) {
		$(document).on("click", "a#ext-gen443", function(e) {
			var inc = 500
			setTimeout(function() {
				$('.x-tree-node-anchor').last().parents(".x-tree-node-el").addClass("x-tree-selected").click()
				$('#ContentPH_cbBillRules').click()
				setTimeout(function() {
					$('#ext-gen660').addClass("x-combo-selected").click()
					setTimeout(function() {
						$('#ContentPH_ContentPH_brWindow_btn1_btn').click()
						$(document).one("mousedown", "input[type='text']", function(e) {
							$(".x-table-layout").last().find("tr").each(function(i, o) {
								$(this).find("input[type='text']").each(function(j, p) {
									console.log(i, j)
									if (i === 1 && j > 0 && j < 6) {
										$(this).focus()
										$(this).val("8:30 am")
										$(this).blur()
									}
									if (i === 3 && j > 0 && j < 6) {
										$(this).focus()
										$(this).val("5:00 pm")
										$(this).blur()
									}
									if (i === 5 && j > 0 && j < 6) {
										$(this).focus()
										$(this).val("1")
										$(this).blur()
									}
								})
							})
						})
						$("input[type='text']").eq(0).click()
					}, inc)
				}, inc)
			}, inc)

		})

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

	if (window.location.host === "gist.github.com" && items.githubGist) {
		$(document).on("focus", ".js-site-search-focus", function() {
			$(this).val("user:matthewmorrone1 ")
			$(this).one("keydown", function(e) {
				if (e.which === 8) {
					$(this).val("")
				}
			})
		})
	}

	if (window.location.host.includes("github") && items.github) {
		$(document).on("focus", ".js-site-search-focus", function() {
			$(this).val("user:matthewmorrone1 ")
			$(this).one("keydown", function(e) {
				if (e.which === 8) {
					$(this).val("")
				}
			})
		})
		if (window.location.search.includes("repositories")) {
			document.elementFromPoint(1308, 138).click()
		}
	}
	if (window.location.host.includes("pinterest") && items.pinterest) {
		$(document).on("load", ".item.selected", function(e) {
			if ($(".pinnedToBoardWarning").length === 0) {
				$(e.target).click()
			}
		})
		if (window.location.pathname === "/pin/create/extension/") {
			setTimeout(function() {
				// chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
				//	var url = tabs[0].url;
				//	alert(tabs[0].id)
				// 	chrome.tabs.executeScript(tabs[0].id, {code: 'window.top.focus()'})
				// })
				// chrome.tabs.executeScript(null, {code: 'window.top.focus()'})
				var $li = $("li").eq(0)
				$li.find("button").show().click()
				setTimeout(function() {
					window.close()
				}, 5000)
			}, inc)
		}
	}
});
// github repo filter
// https://gist.github.com/matthewmorrone1/60356a70f10619ced0bd
