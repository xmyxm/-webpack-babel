//项目路径 cd gulpdemo/gulpruntime.js
//运行    gulp --gulpfile gulpdemo/gulpruntime.js 

var gulp = require("gulp")
var babel = require("gulp-babel")
var rename = require("gulp-rename")

// runtime
gulp.task("default", function() {
    return gulp.src('page/es6.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-runtime']
        }))
        .pipe(rename({
        	basename: 'es6',
        	suffix: ".runtime",
        	extname: ".js"
        }))
        .pipe(gulp.dest("dist"))
})
