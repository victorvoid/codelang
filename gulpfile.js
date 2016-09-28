// Gulpfile.js
var gulp = require( "gulp" ),
codelang = require('./dist/index.js')

gulp.task('codelang', function () {
	codelang.start();
})

gulp.task('default', ['codelang']);