function timeout(num) {
    return new Promise(resolve => {
        setTimeout(function() { resolve() }, num)
    })
}
console.log('start: ' + Date.now())
timeout().then(console.log('end: ' + Date.now()))


function* fetchJson() {
    yield new Promise(resolve => {
        fetch({ headers: { 'Content-Type': 'application/json' } }).then(res => {
            if (res.ok) {
                response.json().then(
                    json => resolve({
                        code: 200,
                        data: json
                    })
                )
            }
        })
    })
    yield new Promise(resolve => {
        fetch({ headers: { 'Content-Type': 'application/json' } }).then(res => {
            if (res.ok) {
                response.json().then(
                    json => resolve({
                        code: 200,
                        data: json
                    })
                )
            }
        })
    })
}

function includesTest() {
    var arry = [1, 2, 3]
    console.log(arry.includes(1))
}


class Event {
    constructor(prfx) {
        this.prfx = prfx || ''
        this.queue = {}
    }
    on(type, listener) {
        let _type = this.prfx + type
        if (typeof listener !== 'function') {
            return
        }
        if (!this.queue[_type]) {
            this.queue[_type] = []
        }
        this.queue[_type].push(listener)
    }
    trigger(type) {
        let _type = this.prfx + type
        let i
        let args = []
        for (i = 1; i < arguments.length; i++) {
            args.push(arguments[i])
        }
        if (!this.queue[_type]) {
            return
        }
        for (i = 0; i < this.queue[_type].length; i++) {
            this.queue[_type][i].apply(this, args)
        }
    }
    off(type, listener) {
        let _type = this.prfx + type
        let listeners = this.queue[_type]
        if (listeners && listeners.length) {
            let idx = listeners.indexOf(listener)
            // 避免错误的listener,误删除了倒数的第一个listener
            if (idx !== -1) {
                listeners.splice(idx, 1)
            }
        }
    }
}

let event = new Event('dp_')
event.Event = Event

// export default event
