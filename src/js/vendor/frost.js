/*

	   Frost.JS © 2017 Mirculous Owonubi
	   Version 3.5.284


	   /### Added more functionality!


	*/
if (typeof Array.prototype.indexOf !== 'function') {
  Array.prototype.indexOf = function (item) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === item) {
        return i;
      }
    }
    return - 1;
  };
}// var is_id = false;

window.ice = (function () {
  function Frost(els) {
    for (var i = 0; i < els.length; i++) {
      this[i] = els[i];
    }
    this.length = els.length;
  }
  Frost.prototype = {
    // ======== Variables ========
    // ========= UTILS =========
    c$: function (selector) {
      var els;
      elem = this.mapOne(function (el) {
        return el;
      });
      if (typeof selector === 'undefined') {
        els = document;
      } else if (typeof selector === 'string') {
        is_id = selector.charAt(0) == '#';
        els = elem.querySelectorAll(selector);
      } else if (selector.length) {
        els = selector;
      } else {
        els = [
          selector
        ];
      }
      _ret = new Frost(els);
      if (is_id) {
        _ret = _ret[0];
        for (attrname in Frost.prototype) {
          _ret[attrname] = Frost.prototype[attrname];
        }
        _ret._used_id = is_id;
        is_id = false;
        return _ret;
      } else {
        _ret.used_id = false;
        return _ret;
      }
    },
    make: function (tagName, attrs) {
      var el = new Frost([document.createElement(tagName)]);
      if (attrs) {
        if (attrs.className) {
          el.addClass(attrs.className);
          delete attrs.className;
        }
        if (attrs.text) {
          el.text(attrs.text);
          delete attrs.text;
        }
        for (var key in attrs) {
          if (attrs.hasOwnProperty(key)) {
            el.attr(key, attrs[key]);
          }
        }
      }
      return el;
    },
    forEach: function (callback) {
      this.map(callback);
      return this;
    },
    map: function (callback) {
      var results = [
      ];
      if (this._used_id) {
        results.push(callback.call([].push(this), this, 0));
      } else {
        for (var i = 0; i < this.length; i++) {
          results.push(callback.call(this, this[i], i));
        }
      }
      return results; //.length > 1 ? results : results[0];
    },
    mapOne: function (callback) {
      var m = this.map(callback);
      return m.length > 1 ? m : m[0];
    },
    delay: function (func, time) {
      time *= 1000;
      setTimeout(func(), time);
    },
    getRand: function (max) {
      return Math.floor(Math.random() * max) + 1;
    },
    reduce: function (limit, syntax) {
      ret = '';
      nxt_white_sp = syntax.indexOf(' ');
      if (nxt_white_sp < 0 || nxt_white_sp == 0 || nxt_white_sp > limit) nxt_white_sp = limit;
      if (syntax.length > limit) {
        for (_red_ = 0; _red_ <= nxt_white_sp; _red_++)
        ret += syntax[_red_];
      } else {
        ret = syntax;
      }
      return ret;
    },
    is_upper: function (char) {
      upper_alpha = 'ABC:DE@FGHIJKLM*NOPQRS?TUVWXYZ';
      return (upper_alpha.indexOf(char) >= 0);
    },
    is_lower: function (char) {
      lower_alpha = 'abc!de/fghi;jklm+nopqrstuv-wxyz';
      return (lower_alpha.indexOf(char) >= 0);
    },
    encrypt: function (offset, decoded) {
      offset = parseInt(offset);
      lower_alpha = 'abc!de/fghi;jklm+nopqrstuv-wxyz';
      upper_alpha = 'ABC:DE@FGHIJKLM*NOPQRS?TUVWXYZ';
      encoded = '';
      numbers = ' 0123456789';
      if (offset > 31) {
        offset = 30;
      }
      for (char in decoded) {
        if (this.is_upper(decoded[char])) {
          no = upper_alpha.indexOf(decoded[char]);
          en_no = no + offset;
          if (en_no > 30) {
            en_no -= 31;
          }
          en_char = upper_alpha[en_no];
        } else if (this.is_lower(decoded[char])) {
          no = lower_alpha.indexOf(decoded[char]);
          en_no = no + offset;
          if (en_no > 30) {
            en_no -= 31;
          }
          en_char = lower_alpha[en_no];
        } else {
          en_char = decoded[char];
        }
        encoded += en_char;
      }
      return encoded;
    },
    decrypt: function (offset, encoded) {
      offset = parseInt(offset);
      lower_alpha = 'abc!de/fghi;jklm+nopqrstuv-wxyz';
      upper_alpha = 'ABC:DE@FGHI-JKLM*NOPQRS?TUVWXYZ';
      decoded = '';
      numbers = ' 0123456789';
      if (offset > 31) {
        offset = 30;
      }
      for (char in encoded) {
        if (this.is_upper(encoded[char])) {
          no = upper_alpha.indexOf(encoded[char]);
          de_no = no - offset;
          if (de_no < 0) {
            de_no += 31;
          }
          de_char = upper_alpha[de_no];
        } else if (this.is_lower(encoded[char])) {
          no = lower_alpha.indexOf(encoded[char]);
          de_no = no - offset;
          if (de_no < 0) {
            de_no += 31;
          }
          de_char = lower_alpha[de_no];
        } else {
          de_char = encoded[char];
        }
        decoded += de_char;
      }
      return decoded;
    },
    // ========== DOM MANIPULATION ==========
    text: function (text) {
      if (typeof text !== 'undefined') {
        return this.forEach(function (el) {
          el.innerText = text;
        });
      } else {
        return this.mapOne(function (el) {
          return el.innerText;
        });
      }
    },
    html: function (html) {
      if (typeof html !== 'undefined') {
        return this.forEach(function (el) {
          el.innerHTML = html;
        });
      } else {
        return this.mapOne(function (el) {
          return el.innerHTML;
        });
      }
    },
    siblings: function () {
      return this.mapOne(function (elem) {
        el = ((elem.parentNode || {
        }).firstChild);
        var matched = [
        ];
        for (; el; el = el.nextSibling) {
          if (el.nodeType === 1 && el !== elem) {
            matched.push(el);
          }
        }
        return new Frost(matched);
      });
    },
    addSuffix: function (int) {
      int += '';
      end = int[int.length - 1];
      if (end == 1) {
        var suffix = 'st';
      }
      else if (end == 2) {
        var suffix = 'nd';
      }
      else if (end == 3) {
        var suffix = 'rd';
      }
      else {
        var suffix = 'th';
      }
      if (int == '11') suffix = 'th';
      return suffix;
    },
    keypress: function ( /*  key,  */
    action) {
      document.onkeydown = (function (evt) {
        // alert(evt.keyCode);
        action();
      });
    },
    addClass: function (classes) {
      var className = '';
      if (typeof classes !== 'string') {
        for (var i = 0; i < classes.length; i++) {
          className += classes[i];
        }
      } else {
        className = ' ' + classes;
      }
      return this.forEach(function (el) {
        // el.className += className;
        el.classList.add(className);
      });
    },
    delClass: function (className) {
      return this.forEach(function (el) {
        el.classList.remove(className);
      });
    },
    attr: function (attr, val) {
      el = this.forEach(function (el) {
        return el;
      });
      if (typeof attr === 'object') {
        for (i in attr) {
          el[0].setAttribute(i, attr[i]);
        };
      } else if (typeof val !== 'undefined') {
        return this.forEach(function (el) {
          el.setAttribute(attr, val);
        });
      } else {
        return this.mapOne(function (el) {
          return el.getAttribute(attr);
        });
      }
    },
    css: (function (val) {
      dta = this.forEach(function (el) {
        return el;
      });
      dta = dta[0].getAttribute('style') + '; ';
      if (dta === 'null; ') {
        dta = '';
      }
      if (typeof val === 'object') {
        for (_csx in val) {
          dta = dta + _csx + ':' + val[_csx] + '; ';
        };
        return this.forEach(function (el) {
          el.setAttribute('style', dta);
        });
      }
      else if (typeof val !== 'undefined') {
        return this.forEach(function (el) {
          el.setAttribute('style', dta + val);
        });
      } else {
        return this.mapOne(function (el) {
          return el.getAttribute('style');
        });
      }
    }),
    Title: function (text) {
      _title = document.querySelector('title');
      if (_title == null) {
        title_el = this.make('title');
        _title = title_el[0];
        c$(c$('head') [0]).append(title_el);
      }
      if (text) {
        _title.innerHTML = text;
      } else {
        return _title.innerHTML;
      }
    },
    append: function (els) {
      return this.forEach(function (parEl, i) {
        els.forEach(function (childEl) {
          parEl.appendChild((i > 0) ? childEl.cloneNode(true)  : childEl);
        });
      });
    },
    prepend: function (els) {
      return this.forEach(function (parEl, i) {
        for (var j = els.length - 1; j > - 1; j--) {
          parEl.insertBefore((i > 0) ? els[j].cloneNode(true)  : els[j], parEl.firstChild);
        }
      });
    },
    remove: function () {
      return this.forEach(function (el) {
        return el.parentNode.removeChild(el);
      });
    },
    ready: (function (func, fallback) {
      if (document.readyState === 'complete' || (document.readyState !== 'loading' && !document.documentElement.doScroll)) {
        func();
      } else {
        if (fallback) {
          // Run if user specifies function
          fallback();
        }        //  ###-fallback  document.addEventListener("DOMContentLoaded", func);

        window.addEventListener('load', func);
      }
    }),
    on: function () {
      if (document.addEventListener) {
        return function (evt, fn) {
          return this.forEach(function (el) {
            el.addEventListener(evt, fn, false);
          });
        };
      } else if (document.attachEvent) {
        return function (evt, fn) {
          return this.forEach(function (el) {
            el.attachEvent('on' + evt, fn);
          });
        };
      } else {
        return function (evt, fn) {
          return this.forEach(function (el) {
            el['on' + evt] = fn;
          });
        };
      }
    }(),
    off: function () {
      if (document.removeEventListener) {
        return function (evt, fn) {
          return this.forEach(function (el) {
            el.removeEventListener(evt, fn, false);
          });
        };
      } else if (document.detachEvent) {
        return function (evt, fn) {
          return this.forEach(function (el) {
            el.detachEvent('on' + evt, fn);
          });
        };
      } else {
        return function (evt, fn) {
          return this.forEach(function (el) {
            el['on' + evt] = null;
          });
        };
      }
    }()
  };
  var ice = {
    get: function (selector) {
      var els,
      is_id = false;
      if (typeof selector === 'undefined') {
        els = document;
      } else if (typeof selector === 'string') {
        is_id = selector.charAt(0) == '#';
        els = document.querySelectorAll(selector);
      } else if (selector.length) {
        els = selector;
      } else {
        els = [
          selector
        ];
      }
      _ret = new Frost(els);
      if (is_id) {
        _ret = _ret[0];
        for (attrname in Frost.prototype) {
          _ret[attrname] = Frost.prototype[attrname];
        }
        _ret._used_id = is_id;
        is_id = false;
        return _ret;
      } else {
        _ret.used_id = false;
        return _ret;
      }
    }
  };
  return ice;
}());
window.c$ = ice.get;
/*
         #####-NOTES-#####
  1) How to use?
     • c$('div') will return a nodelist of all div elements!
     • c$('head').c$('title') will return a nodelist selecting the 'title' element within the 'head' element.
     • To select a specific element, use an iterator
       -- c$('div')[0] will select the first div element
  2) To manipulate css of an element
     • c$('div').css('display: none') will set the display property of all div elements to none
     • c$('div').css({
	         'display': 'none',
	         'border-radius': '5px'
       }) will set the display and border-radius properties of the div element to none and 5px resspectively
     • c$('div').css() will return the css value of the div elements
  3) To manipulate inner text
     • c$('.sect').text('Hello!') will set the class (.sect)'s inner text to 'Hello!'
     • c$('.sect').text() will return the class (.sect)'s inner text.
  4) To manipulate html
     • c$('.sect').html('Hello!') will set the class (.sect)'s innerHTML to 'Hello!'
     • c$('.sect').html() will return the class (.sect)'s innerHTML.
  5) To create an element
     • c$().create('div') will create a blank div element with no attributes this will not be on your document yet
      -- to create an element with attributes, use c$().create('div', {
	             'class':'sect',
	             'id':'new_el'
	            }); to create a div element with 'class' and 'id' properties to 'sect' and 'new_el' respectively
     • To let your created element show up on page, follow step [6].
  6) To append an element
     • c$(parEl).append(childEl) will append either a cloned or created 'childEl' to 'parEl'.
  7) To prepend an element
     •
  8) To add class to an element
     • c$('div')[0].addClass('sect') will select the first 'div' element and add 'sect' to its class list.
  9) To set element attributes
     • c$('div')[0].attr('id','div_el') will set the 'id' property of the first 'div' element to 'div_el'.
     • c$('div').attr({
	       'id': 'div_el',
	       'class': 'div_el'
       }) will set the 'id' and 'class' properties to 'div_el' respectively.
  10) To set document title
      • c$().title('Hello') will set document title to 'Hello'
  11) To execute function when document is fully loaded
      • c$().ready( function () {
	        alert('Document is ready!!!');
        }); will execute the function and alert 'Document is ready!!!' when page is fully loaded and ready to use.
      • c$().ready(
	        function () {
	          alert(''Loaded!'');
         },
         function () {
           alert('Not Loaded!')
         }) will execute the second function when the page isnt fully loaded and execute the first when loaded!
  12) To remove an element from the DOM
      • c$('.sect').remove() will remove all elements with class name 'sect'.
  13)

*/
/* ###- Doc End -### */
