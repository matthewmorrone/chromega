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
