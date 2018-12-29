'use strict';

var _marked = /*#__PURE__*/regeneratorRuntime.mark(fetchJson);

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
                    return new Promise(function (resolve) {
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