/*点评平台技术研发中心*/
class Cat {
    constructor(name) {
        super()
        this.name = name
    }
    hello() {
        console.log(this.name)
    }
}

let cat = new Cat('gulp')
cat.Cat = Cat
export default cat

