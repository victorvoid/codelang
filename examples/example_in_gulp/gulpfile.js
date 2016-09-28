var gulp 	 = require( "gulp" ),
	codelang = require('codelang');

gulp.task('codelang', function () {
	codelang.start();
})

gulp.task('default', ['codelang']);