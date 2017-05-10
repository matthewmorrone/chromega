for (c in console) {
	if (c === "memory") {
		continue
	}
	eval(c + " = console." + c + ".bind(console)")
}
// eval("table = console.table.bind(console)")

if (!jQuery) {
	var jq = document.createElement('script');
	jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
	document.getElementsByTagName('head')[0].appendChild(jq);
}
if (!Array.prototype.last){
	Array.prototype.last = function(){
		return this[this.length - 1];
	};
};
Object.defineProperty(Object.prototype, "define", {
	configurable: true,
	enumerable: false,
	writable: false,
	value: function(name, value) {
		if (Object[name]) {
			delete Object[name];
		}
		Object.defineProperty(this, name, {
			configurable: true,
			enumerable: false,
			value: value
		});
		return this.name;
	}
});
Array.prototype.define("each", Array.prototype.forEach);
Object.prototype.define("each", function(fn /*, ctx*/ ) {
	for (var k in this) {
		fn.call(this, this[k], k);
	}
});
Object.prototype.define("eachOwn", function(fn) {
	var o = this;
	Object.keys(o).each(function(key) {
		fn.call(o, o[key], key);
	});
});
Object.prototype.define("getKeys", function() {
	return Object.keys(this);
});
Object.prototype.define("map", function(fn, ctx) {
	var ctx = ctx || this,self = this,result = {};
	Object.keys(self).forEach(function(kv) {
		result[k] = fn.call(ctx, self[k], k, self);
	});
	return result;
});
function exportFile(name, content) {
	log(content)
	content = encodeURI(content)
	var a = document.createElement("a");
	a.setAttribute("target", '_blank');
	a.setAttribute("href", 'data:attachment/csv,' + content);
	a.setAttribute("download", name);
	a.click();
	document.body.appendChild(a);
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data



    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    // var dataURL = canvas.toDataURL("image/png");

    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return imgData
}

function Utils() {

}

Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};

var Utils = new Utils();

function getImageType(arrayBuffer){
	var type = "";
	var dv = new DataView(arrayBuffer,0,5);
	var nume1 = dv.getUint8(0,true);
	var nume2 = dv.getUint8(1,true);
	var hex = nume1.toString(16) + nume2.toString(16) ;

	switch(hex){
		case "8950":
			type = "image/png";
			break;
		case "4749":
			type = "image/gif";
			break;
		case "424d":
			type = "image/bmp";
			break;
		case "ffd8":
			type = "image/jpg";
			break;
		default:
			type = null;
			break;
	}
	return type;
}