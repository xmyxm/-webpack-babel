//项目路径 cd gulpdemo/gulppolyfill.js
//运行    gulp --gulpfile gulpdemo/gulppolyfill.js runtime

require('babel-polyfill')
var gulp = require("gulp")
var babel = require("gulp-babel")

// runtime
gulp.task("polyfill", function() {
    return gulp.src('page/es6.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest("dist"))
})
