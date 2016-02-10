$(function() {
	var $img, $url
	$("input").each(function() {
		if (!$(this).attr("url")) {
			return
		}
		$img = document.createElement("img")
		$url = "http://www.google.com/s2/favicons?domain="+$(this).attr("url")+".com"
		$img.src = $url
		$img.setAttribute("class", "icon")
		$(this).parent().prepend($img)
	})
})