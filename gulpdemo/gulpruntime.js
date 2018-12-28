//项目路径 cd gulpdemo/gulpruntime.js
//运行    gulp --gulpfile gulpdemo/gulpruntime.js runtime

var gulp = require("gulp")
var babel = require("gulp-babel")

// runtime
gulp.task("runtime", function() {
    return gulp.src('page/es6.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-runtime', ''] 
        }))
        .pipe(gulp.dest("dist"))
})

//
// require('babel-polyfill'); 