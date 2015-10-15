
function KeyListener(e, d) {
	var result = "";
	if (e.ctrlKey) 	{result += "ctrl+"}
	if (e.altKey) 	{result += "alt+"}
	if (e.shiftKey) {result += "shift+"}
	if (e.metaKey) 	{result += "meta+"}
	if (d) {
		groupCollapsed(result+keys[e.which], e.type);
			log("which: " + e.which)
			log("charCode: " + e.charCode)
			log("keyCode: " + e.keyCode)
			log("keyIdentifier: " + e.keyIdentifier)
			log(e)
		groupEnd();
	}
	return result+keys[e.which];

}
var commands = {
	"ctrl+e" : "extensions",
	"ctrl+." : "settings",
	"ctrl+g" : "duplicate",
	"ctrl+b" : "bookmarks",
}

//The key listening event should only be bound to the top window
if (window == top) {
	window.addEventListener("keydown", function(e) {
		var seq = KeyListener(e)
		var com = commands[seq]
		if (com) {
			log(seq, com)
			commander(commands[seq])

		}
	}, false); 
	// window.addEventListener("keyup", function(e) {KeyListener(e)}, false); 
	// window.addEventListener("keypress", function(e) {KeyListener(e)}, false); 

}


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





