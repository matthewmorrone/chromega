var log = console.log.bind(console);
var clear = console.clear.bind(console);
clear();


Object.defineProperty(Object.prototype, "define", {
  configurable: true,enumerable: false,writable: false,value: function(name, value) {
    if (Object[name]) {
      delete Object[name];
    }
    Object.defineProperty(this, name, {configurable: true,enumerable: false,value: value});
    return this.name;
  }
});
Object.prototype.define("each", function(fn) {
  for (var k in this) {
    fn.call(this, this[k], k);
  }
});
Function.define("noop", function() {
});
Array.prototype.define("each", Array.prototype.forEach);


function addStylesheetRules(rules) {
  var styleEl = document.createElement('style'), styleSheet;
  document.head.appendChild(styleEl);
  styleSheet = styleEl.sheet;
  for (var i = 0, rl = rules.length; i < rl; i++) {
    var j = 1, rule = rules[i], selector = rules[i][0], propStr = '';
    if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
      rule = rule[1];
      j = 0;
    }
    for (var pl = rule.length; j < pl; j++) {
      var prop = rule[j];
      propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
    }
    styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
  }
}
addStylesheetRules([
  ['.check, .check:hover, .check:visited', 
    ['color', 'black']
  ]
]);
$.fn.pureText = function() {
  return $(this)
  .clone() //clone the element
  .children() //select all the children
  .remove() //remove all the children
  .end() //again go back to selected element
  .text();
}

$.fn.tagNameUpperCase = function() {
  return this.prop("tagName");
};
$.fn.tagName = function() {
  return this.prop("tagName").toLowerCase() || "";
};
$.fn.textNodes = function() {
  return $(this).contents().filter(function() {
    return this.nodeType == 3;
  })
}
$.fn.outerHTML = function() {
  return $('<div>').append($(this).clone()).html();
}
function walk(root) 
{
  if (root.tagName === "A") {
    return;
  }
  if (root.nodeType == 3) 
  {
    doReplace(root);
    return;
  }
  var children = root.childNodes;
  for (var i = children.length - 1; i >= 0; i--) 
  {
    walk(children[i]);
  }
}
function doReplace(text) 
{
  var div = document.createElement("div");
  div.innerHTML = text.nodeValue.replace(/\b(\w+)\b/g, "<a href='https://en.wikipedia.org/wiki/$1' class='check'>$1</a>");
//     div.innerHTML = text.nodeValue.replace(/\b(\w+)\b/g, "<a href='https://en.wiktionary.org/wiki/$1' class='check'>$1</a>");

  var parent = text.parentNode;
  var children = div.childNodes;
  for (var i = children.length - 1; i >= 0; i--) 
  {
    parent.insertBefore(children[i], text.nextSibling);
  }
  parent.removeChild(text);
}

var words = [], url
$("#bodyContent").each(function() {
  $(this).contents().each(function() {
    walk(this)
  })
})



// $(document).on("click", ".check", function(e) {
//     e.preventDefault()
//     var word = $(this).text(), url = "http://en.wikipedia.org/wiki/" + word + "/", el = e.target
//     $.ajax(url, {
//         method: "post",
//         crossDomain: true,
//         complete: function(res) {
//             alert(res.status)
//         }
//     });
// })


