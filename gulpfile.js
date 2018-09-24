var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	useref = require('gulp-useref'),
	uglify = require('gulp-uglify'),
	cssnano = require('gulp-cssnano'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	gulpIf = require('gulp-if'),
	del = require('del'),
	runSequence = require('run-sequence');

gulp.task('sass', function() {
	return gulp.src('app/scss/global.scss')
			   .pipe(sass())
			   .pipe(gulp.dest('app/css'))
			   .pipe(browserSync.reload({stream: true}))
});

gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	})
});

gulp.task('useref', function() {
	return gulp.src('app/*.html')
			   .pipe(useref())
			   .pipe(gulpIf('*.js', uglify()))
			   .pipe(gulpIf('*.css', cssnano()))
			   .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  .pipe(cache(imagemin({interlaced: true})))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/css/fonts/**/*')
  .pipe(gulp.dest('dist/css/fonts'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('watch', ['browserSync', 'sass'], function() {
	gulp.watch('app/scss/**/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload)
});

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
});
