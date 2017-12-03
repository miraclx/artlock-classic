/*

	   Frost.JS © 2017 Mirculous Owonubi <omiraculous@gmail.com>
	   Version 3.5.284

*/

if (typeof Array.prototype.indexOf !== 'function') {
  Array.prototype.indexOf = function(item) {
    for (var i = 0; i < this.length; i++) {
      if (this[i] === item) {
        return i;
      }
    }
    return -1;
  };
} // var is_id = false;

(function() {
  function Frost(els) {
    for (var i = 0; i < els.length; i++) {
      this[i] = els[i];
    }
    this.length = els.length;
  }
  Frost.prototype = {
    // ========= UTILS =========
    forEach: function(callback) {
      this.map(callback);
      return this;
    },
    map: function(callback) {
      var results = [];
      if (this._used_id) {
        results.push(callback.call([].push(this), this, 0));
      } else {
        for (var i = 0; i < this.length; i++) {
          results.push(callback.call(this, this[i], i));
        }
      }
      return results; //.length > 1 ? results : results[0];
    },
    mapOne: function(callback) {
      var m = this.map(callback);
      return m.length > 1 ? m : m[0];
    },
    delay: function(func, time) {
      time *= 1000;
      setTimeout(func(), time);
    },
    getRand: function(max) {
      return Math.floor(Math.random() * max) + 1;
    },
    reduce: function(limit, syntax) {
      ret = '';
      nxt_white_sp = syntax.indexOf(' ');
      if (nxt_white_sp < 0 || nxt_white_sp == 0 || nxt_white_sp > limit) nxt_white_sp = limit;
      if (syntax.length > limit) {
        for (_red_ = 0; _red_ <= nxt_white_sp; _red_++)
          ret += syntax[_red_];
        ret += '...';
      } else {
        ret = syntax;
      }
      return ret;
    },
    is_upper: function(char) {
      upper_alpha = 'ABC:DE@FGHIJKLM*NOPQRS?TUVWXYZ';
      return (upper_alpha.indexOf(char) >= 0);
    },
    is_lower: function(char) {
      lower_alpha = 'abc!de/fghi;jklm+nopqrstuv-wxyz';
      return (lower_alpha.indexOf(char) >= 0);
    },
    encrypt: function(offset, decoded) {
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
    decrypt: function(offset, encoded) {
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
  };
  window.c$ = new Frost(document);
}());
