/**
 * @authors zzl81cn (zzl81cn@gmail.com)
 * @date    2015-07-10 09:49:00
 * @version v1.0
 */

// Import gulp plugins
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync').create(),
	del = require('del'),
	jsmin = require('gulp-uglify'),
	notify = require('gulp-notify'),
	runSequence = require('run-sequence'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass');

// Env properties
var root = './',
	dest = './dist',
	src = './src',
	srcCopy = 'src',
	// openBrowser = false,
	openBrowser = true,
	// proxyStaticPath
	staticSrc = ['./'],
	proxyURL = 'http://xx:xx';

gulp.task('serve', function () {
	browserSync.init({
		// 启动server后打开默认页面
		open: openBrowser,
		// scrollToTop
		// scrollProportionally: false,
		//镜像模式点击，滚动和表单在任何设备上输入将被镜像到所有设备里
		ghostMode: {
			clicks: false,
			forms: false,
			scroll: false
		},
		// staticServerPath
		// server: src,
		server: src,
		// ui: false,
		// 文件夹列表模式
		// directory: true,
		port: 9001
		// 代理配置
		// 本地文件目录
		/*serveStatic: staticSrc,
		 proxy:{
		 // 代理域
		 target: proxyURL2
		 // ,ws:true
		 }*/
	});

	gulp.watch(src + "/assets/styles/**/*.scss", ['sassTask']);
	gulp.watch([src + "/**/*.html", src + "/js/*.js"], {interval: 500}).on('change', browserSync.reload);
});

// Scss precompile task.
gulp.task('sassTask', function () {
	return gulp.src(src + '/assets/styles/**/*.scss')
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		// compressed,expanded
		.pipe(sass({outputStyle: 'expanded'}))
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'Firefox <= 20'],
			cascade: false
		}))
		.pipe(gulp.dest(src + '/css'))
		.pipe(browserSync.stream());
	}
);

gulp.task('jsminTask', function () {
return gulp.src('./js/*.js')
	.pipe(jsmin())
	.pipe(gulp.dest('./js-min'));
});

// Default task
gulp.task('default', function(done) {
	runSequence(
		// ['sassTask'],
		['serve'],
		done
	)
});

// 删除已部署版本文件(Clean dist directory)
gulp.task('clean', function (cb) {
del([
	// 这里我们使用一个通配模式来匹配 `dist` 文件夹中的所有东西
	'dist/**/*'
	// 如果我们不希望删掉这个文件，所以我们取反这个匹配模式
	//'!dist/mobile/deploy.json'
], cb);
});

// 配置部署版本文件(Copy src specifild file to dist folder.)
gulp.task('copyfile', function () {
	return gulp.src(
		[
			srcCopy + '/*.html',
			srcCopy + '/css/*.css',
			srcCopy + '/images/**/*',
			srcCopy + '/js/**/*'
		],
		{base: src}
	)
	.pipe(gulp.dest('dist', {base: root}))
});
// 开始整理部署版本(Start deploy)
gulp.task('dist', ['clean', 'copyfile']);