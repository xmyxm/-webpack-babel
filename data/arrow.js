class babelPlugn {
    constructor(config) {
        super(config)
        this.name = 'babel'
    }
    say(){
    	let print = () => {
    		console.log('print:name ')
    		console.log(this.name)
    	}
    }
}

export default babelPlugn
