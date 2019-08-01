import _spliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/splice";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _regeneratorRuntime from "@babel/runtime-corejs3/regenerator";
import _asyncToGenerator from "@babel/runtime-corejs3/helpers/esm/asyncToGenerator";
import _Date$now from "@babel/runtime-corejs3/core-js-stable/date/now";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";

var _marked =
/*#__PURE__*/
_regeneratorRuntime.mark(fetchJson);

function timeout(num) {
  return new _Promise(function (resolve) {
    _setTimeout(function () {
      resolve();
    }, num);
  });
}

console.log('start: ' + _Date$now());
timeout().then(console.log('end: ' + _Date$now()));

var asyncFun =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _Promise(_setTimeout, 2000);

          case 2:
            return _context.abrupt("return", '2s 延时后返回字符串');

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function asyncFun() {
    return _ref.apply(this, arguments);
  };
}();

function fetchJson() {
  return _regeneratorRuntime.wrap(function fetchJson$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return new _Promise(function (resolve) {
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
          _context2.next = 4;
          return new _Promise(function (resolve) {
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
          return _context2.stop();
      }
    }
  }, _marked);
}

function includesTest() {
  var arry = [1, 2, 3];
  console.log(_includesInstanceProperty(arry).call(arry, 1));
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
        var idx = _indexOfInstanceProperty(listeners).call(listeners, listener); // 避免错误的listener,误删除了倒数的第一个listener


        if (idx !== -1) {
          _spliceInstanceProperty(listeners).call(listeners, idx, 1);
        }
      }
    }
  }]);

  return Event;
}();

var event = new Event('dp_');
event.Event = Event; // export default event