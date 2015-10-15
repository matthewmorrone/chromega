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
	// var ctx = ctx || this, self = this;
	// Object.keys(self).forEach(function(k) {
	//   fn.call(ctx, self[k], k, self); 
	// });
	for (var k in this) {
		fn.call(this, this[k], k);
	}
});
Object.prototype.define("eachOwn", function(fn) {
	var o = this;
	// var keys = Object.keys(o);
	Object.keys(o).each(function(key) {
		// for(var i = 0, k; i < keys.length; i++) {
		// k = keys[i];
		fn.call(o, o[key], key);
	});
});
Object.prototype.define("getKeys", function() {
	return Object.keys(this);
});
Object.prototype.define("map", function(fn, ctx) {
	var ctx = ctx || this,
		self = this,
		result = {};
	Object.keys(self).forEach(function(kv) {
		result[k] = fn.call(ctx, self[k], k, self);
	});
	return result;
});
// var each = Function.prototype.call.bind([].forEach);
// Array.prototype.define("exclude", function diff(B) {
// 	var A = this, M = A.length, N = B.length, c = 0, C = [];
// 	for (var i = 0; i < M; i++) {
// 		var j = 0,
// 			k = 0;
// 		while (B[j] !== A[i] && j < N) {
// 			j++;
// 		}
// 		while (C[k] !== A[i] && k < c) {
// 			k++;
// 		}
// 		if (j == N && k == c) {
// 			C[c++] = A[i];
// 		}
// 	}
// 	return C;
// });
// Object.prototype.define("exclude", function (obj2) {
//   var obj1 = this, result = {};
//   obj1.each(function (value, key) {
//     if (obj2[key]) { 
//       log("excluded", value, key)
//       return
//     }
//     result[key] = value;
//     log("included", value, key)

//   });
//   return result;
// });
// Object.prototype.define("diff", function (obj2) {
//   var obj1 = this, result = {};
//   obj1.each(function (value, key) {
//     if (!obj2.hasOwnProperty(key) || obj2[key] !== obj1[key]) {
//       result[key] = value;
//     }
//   });
//   return result;
// });
// Object.prototype.define("filter", function(filter, thisObj) {
//   var obj = this, result = {}, context = thisObj || null, key;
//   for (key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       if (filter.call(context, obj[key], key, obj)) {
//         result[key] = obj[key];
//       }
//     }
//   }
//   return result;
// });

(function(Object, ForEach) {
	Object.getDescriptor = function(object, name) {
		if (name == null) {
			for (var descriptors = new Object, list = Object.getOwnPropertyNames(object), length = list.length, index = 0; index < length; ++index) {
				descriptors[list[index]] = Object.getOwnPropertyDescriptor(object, list[index]);
			}
			return descriptors;
		} else {
			return Object.getOwnPropertyDescriptor(object, name);
		}
	};
	Object.setDescriptor = function(object, nameOrDescriptor, descriptors) {
		if (descriptors == null) {
			return Object.defineProperties(object, nameOrDescriptor);
		} else {
			return Object.defineProperty(object, nameOrDescriptor, descriptors);
		}
	};
	Object.extend = function(object) {
		ForEach.call(arguments, function(single) {
			if (object === single) return;
			ForEach.call(Object.getOwnPropertyNames(single), function(name) {
				objectDescriptor = Object.getOwnPropertyDescriptor(object, name);
				singleDescriptor = Object.getOwnPropertyDescriptor(single, name);
				if (objectDescriptor && singleDescriptor && objectDescriptor.value instanceof Object && singleDescriptor.value instanceof Object) {
					objectDescriptor.value = Object.extend(objectDescriptor.value, singleDescriptor.value);
				} else {
					Object.defineProperty(object, name, singleDescriptor);
				}
			});
		});
		return object;
	};
	Object.computedExtend = function(object) {
		ForEach.call(arguments, function(single) {
			if (object === single) return;
			for (name in single) {
				if (object[name] instanceof Object && single[name] instanceof Object) {
					object[name] = Object.computedExtend(object[name], single[name]);
				} else {
					object[name] = single[name];
				}
			}
		});
		return object;
	};
	Object.clone = function(object) {
		object = arguments[0] = Object.create(object.constructor.prototype, Object.getDescriptor(object));
		ForEach.call(Object.getOwnPropertyNames(object), function(name, descriptor) {
			descriptor = Object.getOwnPropertyDescriptor(object, name);
			if (descriptor.value instanceof Object) {
				Object.defineProperty(object, name, {
					configurable: descriptor.configurable,
					enumerable: descriptor.enumerable,
					writable: descriptor.writable,
					value: Object.clone(descriptor.value)
				});
			}
		});
		arguments.length > 1 && Object.extend.apply(this, arguments);
		return object;
	};
	Object.get = function(object, property) {
		for (property = property.split("."); property.length;) {
			object = object[property.shift()];
		}
		return object;
	};
})(Object, Array.prototype.forEach);