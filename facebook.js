function trollolol() {
	var $ul = $('ul[data-reactid*=".$ordered_list"]')
	$('li', $ul).sort(function(a, b){
		return (Math.round(Math.random()) - 0.5)
	}).appendTo($ul)
}
if (window.location.host === "www.facebook.com") {
	$(".jS.kl,#pagelet_ego_pane,.friendBrowserListUnit,.homeSideNav:not(:first-child),.fbChatSidebar").hide();

	// var ul1 = $('ul[data-reactid*=".$ordered_list"]')
	// ,	li1 = $('ul[data-reactid*=".$ordered_list"] li')
	// ,	ul2 = $('ul[data-reactid*=".2:$more_online_friends"]')
	// ,	li2 = $('ul[data-reactid*=".2:$more_online_friends"] li')
	// ,	sep = $('._554m'); //.moreOnlineFriends

	// fbChatAugment()
	// setTimeout(function() {
	// 	fbChatAugment()
	// }, 2000)
	// setInterval(function() {
	// 	fbChatAugment()
	// }, 10000)

	// $(document).on("mouseover", ".fbChatOrderedList", function() {
	// 	fbChatAugment()
	// 	// setTimeout(trollolol, 30*1000);
	// })

}
function fbChatAugment() {
	$('._554m').remove(); //, ._55lt, ._56p9, ._3jy5, ._2w7, .MercuryThreadImage
	// _3jy5 seenByListener repliedLast seenByAll

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

	var $ul = $('ul[data-reactid*=".$ordered_list"]'), fullname, firstname, lastname
	$('li', $ul).sort(function(a, b){
		if($(a).find("._55lr span").text() < $(b).find("._55lr span").text()) return -1;
		if($(a).find("._55lr span").text() > $(b).find("._55lr span").text()) return 1;
		return 0;
	}).appendTo($ul)

	return;
	$('li', $ul).each(function(){
		fullname = $(this).find("._55lr span").text().replace(" Jr.", "").replace(" II", "")
		if (fullname.includes(",")) {return;}
		fullname = fullname.split(" ");
		lastname = fullname.pop();
		firstname = fullname[0];
		fullname = fullname.join(" ");
		console.log(lastname + ", " + fullname)
		$(this).find("._55lr span").text(lastname + ", " + firstname)
	})
}