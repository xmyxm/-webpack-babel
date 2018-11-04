const demoPage = {
    data: {
        name: 'baidu'
    },
    onLoad(options = {}) {
        swan.navigateTo({
            //此路径为相对路径；如需写为绝对地址，则可写为‘/example/xxx?key=valu’。
            url: 'example/xxx?key=value'
        });
    },
    onUnload() {

    }
}
Page(demoPage)

