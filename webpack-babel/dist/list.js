/*! 点评平台研发中心 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./page/list.js":
/*!**********************!*\
  !*** ./page/list.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(fetchJson);

function timeout(num) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, num);
  });
}

console.log('start: ' + Date.now());
timeout().then(console.log('end: ' + Date.now()));

function fetchJson() {
  return regeneratorRuntime.wrap(function fetchJson$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return new Promise(function (resolve) {
            fetch({
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (res) {
              if (res.ok) {
                response.json().then(function (json) {
                  return resolve({
                    code: 200,
                    data: json
                  });
                });
              }
            });
          });

        case 2:
          _context.next = 4;
          return new Promise(function (resolve) {
            fetch({
              headers: {
                'Content-Type': 'application/json'
              }
            }).then(function (res) {
              if (res.ok) {
                response.json().then(function (json) {
                  return resolve({
                    code: 200,
                    data: json
                  });
                });
              }
            });
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

function includesTest() {
  var arry = [1, 2, 3];
  console.log(arry.includes(1));
}

var Event =
/*#__PURE__*/
function () {
  function Event(prfx) {
    _classCallCheck(this, Event);

    this.prfx = prfx || '';
    this.queue = {};
  }

  _createClass(Event, [{
    key: "on",
    value: function on(type, listener) {
      var _type = this.prfx + type;

      if (typeof listener !== 'function') {
        return;
      }

      if (!this.queue[_type]) {
        this.queue[_type] = [];
      }

      this.queue[_type].push(listener);
    }
  }, {
    key: "trigger",
    value: function trigger(type) {
      var _type = this.prfx + type;

      var i;
      var args = [];

      for (i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      if (!this.queue[_type]) {
        return;
      }

      for (i = 0; i < this.queue[_type].length; i++) {
        this.queue[_type][i].apply(this, args);
      }
    }
  }, {
    key: "off",
    value: function off(type, listener) {
      var _type = this.prfx + type;

      var listeners = this.queue[_type];

      if (listeners && listeners.length) {
        var idx = listeners.indexOf(listener); // 避免错误的listener,误删除了倒数的第一个listener

        if (idx !== -1) {
          listeners.splice(idx, 1);
        }
      }
    }
  }]);

  return Event;
}();

var event = new Event('dp_');
event.Event = Event; // export default event

/***/ }),

/***/ 1:
/*!****************************!*\
  !*** multi ./page/list.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./page/list.js */"./page/list.js");


/***/ })

/******/ });
//# sourceMappingURL=list.js.map