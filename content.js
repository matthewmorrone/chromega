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
	if ((window.location.host.includes("wikipedia") || window.location.host.includes("freeformatter")) && items.wikipedia) {
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
					return $.map($(a).find("th, td"), function(b) {
						return $(b).text().trim() || $(b).html()
					}).join(":").replace(/,/g, ';').replace('-\n', '').replace(/:/g, ',')
				}).join("\n")
				exportFile(name, content)
				$(".export").removeClass("export")
			})
			// to-do: when column headers have a colspan
		})
	}
	function diminish() {
		$('h2.h1:contains("could"), h2.h1:contains("may")').each(function() {
			$(this).css({
				'font-size': '50%',
				'color': 'lightgray'
			})
			$(this).parents('.content-snippet').find('.content-snippet__image').css({
				'width': '50%',
				'margin': 'auto',
				'opacity': '.5'
			})
		})
	}
	if (window.location.host.includes("newatlas") && items.newatlas) {
		var wheeldelta, wheeling, shiftKey
		diminish()
		if (window.location.href.includes('page')) {
			window.history.pushState('Object', 'Title', '/')
		}
		$(document).on('mousewheel', function(e) {
			shiftKey = e.shiftKey
			clearTimeout(wheeling)
			wheeling = setTimeout(function() {
				e.preventDefault()
				wheeling = undefined
				if (wheeldelta > 0) {
					$(document).trigger('scrollDown', wheeldelta/100)
				}
				wheeldelta = 0
			}, 100)
			wheeldelta += e.originalEvent.deltaY
		});
		$(document).on('scrollDown', function(e, delta) {
			if (Utils.isElementInView($('.pagination'), false)) {
				var page = Number.parseInt(window.location.pathname.split('/')[2] || 1, 10)
				var next = page + 1
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
					window.history.pushState('Object', 'Title', 'http://newatlas.com/page/'+next+"/")
					diminish()

				})
				$('.pagination').load(url + " .pagination")
			}
		})
	}


	if (window.location.host.includes("cracked") && items.cracked) {
		var loc, nex, sec, block = ".mainFrameModule.contentTopModule, .rightColumn, .headerWrapper, .mainAd, .socialShareModule, [target='_blank'] img, .recommendedForYourPleasureModule, #Comments, .FacebookLike, .trc_related_container.trc_spotlight_widget, .footer, .socialShareAfterContent, script, iframe, .trc_related_container.trc_spotlight_widget, #taboola-autosized-2r, #persistent-share"
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
					if (items.gifreeze) {
						$('[src$=".gif"]').freezeframe();
					}
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
			$(".columnistsModule.genericLeftModule, .recommendedForYourPleasureFrendlyModule, #persistent-share").remove()
			$(".leftColumn").after(sec)
			$(sec).addClass("leftColumn")
			$(sec).load(nex + " .leftColumn", function() {
				if (items.gifreeze) {
					$('[src$=".gif"]').freezeframe();
				}
				$(sec).find(block).remove()
				$(sec).find("header, footer").remove()
				$(sec).find("img").each(function() {
					$(this).attr("src", $(this).attr("data-img"))
				})
				$(".dropShadowBottomCurved").removeClass("dropShadowBottomCurved")
				$(".leftColumn").removeAttr('style')

			})
		}
		$(block).remove()
	}



	if (window.location.host === "www.facebook.com") {
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
			$(this).val("user:matthewmorrone ") // extract this from location object?
			$(this).one("keydown", function(e) {
				if (e.which === 8) {
					$(this).val("")
				}
			})
		})
	}

	if (window.location.host.includes("messenger")) {


		setTimeout(function() {

			$('._1ht6').append("<span class='meta'>&#x27a4;</span>")
			$('._1ht6').click(function() {
				var link = $(this).parents('a').get(0).outerHTML, data = ""
				link = link.match(/href=\"(.+?)\"/)[1]
				setTimeout(function() {

					$('#js_1 > div').each(function() {
						var name = $(this).find('._ih3').text()+"".trim()
						$(this).find('.clearfix ._o46').each(function() {
							var row = ''
							var time = $(this).find('[data-tooltip-content]').attr('data-tooltip-content')+"".trim()
							var text = $(this).find('[body]').attr('body')+"".trim()
							var atta = ''
							var read = ''
							if ($(this).find('._jf2').attr('title')) {
								read = $(this).find('._jf2').attr('title')+"".trim()
							}
							if ($(this).find('._5rw4').attr('href')) {
								atta = decodeURIComponent($(this).find('._5rw4').attr('href'))
								atta = atta.replace(/^https\:\/\/facebook\.com\/l\.php\?u=/, "")
								atta = atta.replace(/\?.+$/, "")
							}
							if (!text) {
								return
							}
							if ($(this).find(".img").length > 0 && text == "undefined") {
								var $cln = $($(this).find(".img").get(0)).clone()
								$cln.width(50)
								text = $cln[0].outerHTML
							}
							row = `<tr><td>${name}</td><td>${time}</td><td>${text}</td></tr>` //<td>${read}</td><td>${atta}</td>
							data += row
						})
					})
					$('.overlay').remove()
					var $overlay = $('<div></div>', {class: 'overlay'}).css({
						display: 'block',
						position: 'fixed',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						backgroundColor: "rgba(0, 0, 0, 0.5)"
					})
					var $content = $('<div></div>').css({
						display: 'block',
						margin: 'auto',
						marginTop: '100px',
						width: '50%',
						height: '70%',
						backgroundColor: "rgba(255, 255, 255, 0.75)",
						overflowY: 'scroll',
					})
					$content.html("<table>"+data+"</table>")
					$overlay.append($content)

					$(document.body).append($overlay)

					$overlay.click(function() {
						$('.overlay').remove()
					})


				}, 1000)
			})
		}, 2000)

	}
})

