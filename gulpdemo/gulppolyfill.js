//项目路径 cd gulpdemo/gulppolyfill.js
//运行    gulp --gulpfile gulpdemo/gulppolyfill.js 

// require('babel-polyfill')
var gulp = require("gulp")
var babel = require("gulp-babel")
var rename = require("gulp-rename")

// polyfill
gulp.task("default", function() {
    return gulp.src('page/es6.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename({
        	basename: 'es6',
        	suffix: ".polyfill",
        	extname: ".js"
        }))
        .pipe(gulp.dest("dist"))
})
