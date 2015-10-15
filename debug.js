

var events = {
	abort:				function(e) {Listener(e)},
	beforeinput:		function(e) {Listener(e)},
	blur:				function(e) {MouseListener(e)},
	click:				function(e) {MouseListener(e)},
	compositionstart:	function(e) {Listener(e)},
	compositionupdate:	function(e) {Listener(e)},
	compositionend:		function(e) {Listener(e)},
	dblclick:			function(e) {MouseListener(e)},
	error:				function(e) {Listener(e)},
	focus:				function(e) {MouseListener(e)},
	focusin:			function(e) {MouseListener(e)},
	focusout:			function(e) {MouseListener(e)},
	input:				function(e) {Listener(e)},
	keydown:			function(e) {KeyListener(e)},
	keyup:				function(e) {KeyListener(e)},
	keypress:			function(e) {KeyListener(e)},
	load:				function(e) {Listener(e)},
	mousedown:			function(e) {MouseListener(e)},
	// mouseenter:			function(e) {MouseListener(e)},
	// mouseleave:			function(e) {MouseListener(e)},
	// mousemove:			function(e) {MouseListener(e)},
	// mouseout:			function(e) {MouseListener(e)},
	// mouseover:			function(e) {MouseListener(e)},
	mouseup:			function(e) {MouseListener(e)},
	resize:				function(e) {Listener(e)},
	scroll:				function(e) {MouseListener(e)},
	select:				function(e) {Listener(e)},
	unload:				function(e) {Listener(e)},
	wheel:				function(e) {MouseListener(e)}
}
function Listener(e) {
	groupCollapsed(e.type);
		log(e)
	groupEnd();
}
function KeyListener(e) {
	groupCollapsed(e.type);
		log("which: " + e.which)
		log("charCode: " + e.charCode)
		log("alt: " + e.altKey)
		log("ctrl: " + e.ctrlKey)
		log("meta: " + e.metaKey)
		log("shift: " + e.shiftKey)
	groupEnd();
}
function MouseListener(e) {
	groupCollapsed(e.type);
		log("which: " + e.which)
		log("x: " + e.x)
		log("y: " + e.y)
		log("alt: " + e.altKey)
		log("ctrl: " + e.ctrlKey)
		log("meta: " + e.metaKey)
		log("shift: " + e.shiftKey)
	groupEnd();
}



//The key listening event should only be bound to the top window
if (window == top) {
	events.each(function(f, n) {
		window.addEventListener(n, f, false); 
	})
}
