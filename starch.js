// var log = console.log.bind(console)
// for (c in console) {
//	if (c === "memory") {
//		continue
//	}
//	eval(c + " = console." + c + ".bind(console)")
// }
// eval("table = console.table.bind(console)")

if (!jQuery) {
	var jq = document.createElement('script')
	jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"
	document.getElementsByTagName('head')[0].appendChild(jq)
}

function Nihil() {}
Nihil.prototype = Object.create(null)

function isObject(object) {
	var type = typeof object
	return type === 'function' || type === 'object' && !!object
}
var nativeAlert = window.alert
window.alert = function() {
	return nativeAlert(arguments.join("\n"))
}
function loadCSS(e, t, n) {
	"use strict"
	var i = window.document.createElement("link")
	var o = t || window.document.getElementsByTagName("script")[0]
	i.rel = "stylesheet"
	i.href = e
	i.media = "only x"
	o.parentNode.insertBefore(i, o)
	setTimeout(function() {
		i.media = n || "all"
	})
}
Object.defineProperty(Object.prototype, "define", {
	configurable: true,
	enumerable: false,
	writable: true,
	value: function(name, value) {
		if (Object[name]) {
			delete Object[name]
		}
		Object.defineProperty(this, name, {
			configurable: true,
			enumerable: false,
			writable: true,
			value: value
		})
		return this
	}
})
Object.prototype.define("hasProperty", function(a) {
	return Object.hasOwnProperty(this, a)
})
Object.prototype.define("getPropertyName", function(a) {
	return Object.getOwnPropertyName(this, a)
})
Object.prototype.define("getPropertyNames", function() {
	return Object.getOwnPropertyNames(this)
})
Object.prototype.define("getPropertyDescriptor", function(a) {
	return Object.getOwnPropertyDescriptor(this, a)
})
Object.prototype.define("getPropertyDescriptors", function() {
	var result = {}
	Object.getOwnPropertyNames(this).each(function(a, b) {
		result[a] = Object.getOwnPropertyDescriptor(this, a)
	}, this)
	return result
})
Object.prototype.define("each", function(fn/*, ctx*/) {
	for (var k in this) {
		fn && this.hasProperty(k) && fn.call(this, this[k], k)
	}
	return this
})
Object.prototype.define("eachOwn", function(fn) {
	var o = this
	Object.keys(o).each(function(key) {
		fn.call(o, o[key], key)
	})
})
Object.prototype.define("forEach", function(callback, scope) {
	var collection = this
	if (Object.prototype.toString.call(collection) === '[object Object]') {
		for (var prop in collection) {
			if (Object.prototype.hasOwnProperty.call(collection, prop)) {
				callback.call(scope, collection[prop], prop, collection)
			}
		}
	} else {
		for (var i = 0, len = collection.length; i < len; i++) {
			callback.call(scope, collection[i], i, collection)
		}
	}
})
Object.prototype.define("assign", function(...sources) {
	let target = this
	sources.forEach(source => {
		let descriptors = Object.keys(source).reduce((descriptors, key) => {
			descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
			return descriptors;
		}, {})
		Object.getOwnPropertySymbols(source).forEach(sym => {
			let descriptor = Object.getOwnPropertyDescriptor(source, sym)
			if (descriptor.enumerable) {
				descriptors[sym] = descriptor
			}
		})
		Object.defineProperties(target, descriptors)
	})
	return target;
})
Object.prototype.define("map", function(fn, ctx) {
	var ctx = ctx || this,
		self = this,
		result = {}
	Object.keys(self).each(function(v, k) {
		result[k] = fn.call(ctx, self[k], k, self)
	})
	return result
})
Object.define("setPrototypeOf", function(obj, proto) {
	obj.__proto__ = proto
	return obj
})
Object.prototype.define("log", function() {
	return log(this)
})
Object.prototype.define("size", function() {
	return this.length || Object.keys(this).length
})
Object.prototype.define("str", function() {
	return JSON.stringify(this)
})
Object.prototype.define("toInt", function() {
	return parseInt(this, (arguments[0] || 10))
})
Object.prototype.define("clone", function() {
	return JSON.parse(JSON.stringify(this))
})
Object.prototype.define("values", function() {
	var keys = Object.keys(this)
	var ret = []
	for (var i = 0; i < keys.length; i++) {
		ret.push(this[keys[i]])
	}
	return ret
})
Object.prototype.define("setPrototypeOf", function(obj, proto) {
	obj.__proto__ = proto
	return obj
})
Array.prototype.define("flatten", function(ret) {
	var arr = this,
		ret = ret || [],
		len = arr.length
	for (var i = 0; i < len; ++i) {
		if (Array.isArray(arr[i])) {
			arr[i].flatten(ret)
		} else {
			ret.push(arr[i])
		}
	}
	return ret
})
Array.prototype.define("first", function() {
	if (arguments.length > 0) {
		this[0] = arguments[0]
	}
	return this[0]
})
Array.prototype.define("start", function() {
	return 0
})
Array.prototype.define("end", function() {
	return this.length - 1
})
Array.prototype.define("last", function() {
	if (arguments.length > 0) {
		this[this.length - 1] = arguments[0]
	}
	return this[this.length - 1]
})
Array.prototype.define("each", Array.prototype.forEach)
Array.define("fill", function(n) {
	return Array.apply(null, Array(n)).map(function(_, i) {
		return i
	})
})
Array.prototype.define("shuffle", function() {
	var m = this.length, t, i
	while (m) {
		i = Math.floor(Math.random() * m--)
		t = this[m]
		this[m] = this[i]
		this[i] = t
	}
	return this
})
String.prototype.define("replaceAt", function(index, character) {
	return this.substr(0, index) + character + this.substr(index+character.length)
})
String.prototype.define("swap", function(i1, i2) {
	var temp = this[i1]
	return this.replaceAt(i1, this[i2]).replaceAt(i2, temp)
})
String.define("random", function(len) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for(var i = 0; i < len; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text
})
String.define("format", function(format) {
	var args = Array.prototype.slice.call(arguments, 1)
	return format.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match
	})
})
String.prototype.define("format", function() {
	var args = arguments
	return this.replace(/{(\d+)}/g, function(match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match
	})
})
String.prototype.define("pad", function(n, char) {
	return (new Array(++n - this.length)).join(char || '0') + this
})
String.prototype.define("padLeft", String.prototype.pad).define("padRight", function(n, char) {
	return this + (new Array(++n - this.length)).join(char || '0')
})
String.prototype.define("replaceAll", function(a, b) {
	return this.split(a).join(b)
})
String.prototype.define("trim", function() {
	return this.replace(/^\s+|\s+$/g, '')
})
String.prototype.define("remove", function(a) {
	return this.replace(a, '')
})
Number.prototype.define("base", function(b, c) {
	var s = "", n = this
	if (b > (c = (c || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").split("")).length || b < 2) {
		return ""
	}
	while (n) {
		s = c[n % b] + s, n = Math.floor(n / b)
	}
	return s
})
Number.prototype.define("abs", function() {
	return Math.abs(this)
})
Number.prototype.base26 = (function () {
	return function base26() {
		n = this
		ret = ""
		while(parseInt(n)>0){
			--n
			ret += String.fromCharCode("A".charCodeAt(0)+(n%26))
			n/=26
		}
		return ret.split("").reverse().join("")
	}
}())
Function.prototype.define("repeat", function(n) {
	n = n || 2
	var m = 0, p = "", r = ""
	while (m < n) {
		p = 0
		p = "" + this.call()
		if (p) {
			r += p
		}
		m++
	}
	return "" + r
})
Function.prototype.define("proxy", function() {
	this.apply(context, arguments.slice(1))
})
Function.prototype.define("iter", function() {
	var internal = 0
	return function() {
		internal++
		return internal.base(26)
	}
})
var nativeRandom = Math.random
Math.random = function(min, max, round, mt) {
	if (arguments.length === 0) {
		return nativeRandom()
	}
	if (!round) {
		round = 1
	}
	if (!max) {
		var max = min
		min = 1
	}
	if (mt) {
		min = parseInt(min, 10)
		max = parseInt(max, 10)
	}
	return Math.floor(nativeRandom() * (max - min + 1)) + min
}
Math.random.range = function (min, max) {
	'use strict';

	min = parseFloat(min) || 0;
	max = parseFloat(max) || 0;

	return Math.floor(Math.random() * (max - min + 1)) + min;
};


Color = Object.create(Object.prototype) //{} //Object.create(null)
Color.define("random", function() {
	return "rgb(" + (Math.random() * 100) + "%, " + (Math.random() * 100) + "%, " + (Math.random() * 100) + "%)"
})


