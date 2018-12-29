//项目路径 cd gulpdemo/gulpprefixer.js
//运行    gulp --gulpfile gulpdemo/gulpprefixer.js

var gulp = require("gulp")
var babel = require("gulp-babel")
var prefix = require('./plugn/gulp-prefixer')
var rename = require("gulp-rename")

// prefixer
gulp.task("default", function() {
    return gulp.src('page/cat.js')
        .pipe(prefix('/*点评平台技术研发中心*/\n'))
        .pipe(rename({
        	basename: 'cat',
        	suffix: ".prefix",
        	extname: ".js"
        }))
        .pipe(gulp.dest("dist"))
})
