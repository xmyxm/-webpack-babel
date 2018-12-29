'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(fetchJson);

function timeout(num) {
    return new _promise2.default(function (resolve) {
        setTimeout(function () {
            resolve();
        }, num);
    });
}
console.log('start: ' + Date.now());
timeout().then(console.log('end: ' + Date.now()));

function fetchJson() {
    return _regenerator2.default.wrap(function fetchJson$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return new _promise2.default(function (resolve) {
                        fetch({ headers: { 'Content-Type': 'application/json' } }).then(function (res) {
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
                    return new _promise2.default(function (resolve) {
                        fetch({ headers: { 'Content-Type': 'application/json' } }).then(function (res) {
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
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

function includesTest() {
    var arry = [1, 2, 3];
    console.log(arry.includes(1));
}