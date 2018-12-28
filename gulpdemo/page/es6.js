function timeout(num) {
	return new Promise(resolve => {
		setTimeout(function() {resolve()}, num)
	})
}
console.log('start: ' + Date.now())
timeout().then(console.log('end: ' + Date.now()))


function * fetchJson() {
	yield new Promise(resolve => {
			fetch({headers:{'Content-Type': 'application/json'}}).then(res => {
			if(res.ok) {
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
			fetch({headers:{'Content-Type': 'application/json'}}).then(res => {
			if(res.ok) {
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
	var arry = [1,2,3]
	console.log(arry.includes(1))
}
