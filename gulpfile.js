charset = "utf-8";

/**
 * @authors Created by zhouzilong on 2016/8/2.
 * @version 1.0
 */

// /**/ 代表不限层级

var gulp = require('gulp'),
    // less = require('gulp-less'),
    // mincss = require('gulp-minify-css'),
//    notify = require('gulp-notify'),
//    plumber = require('gulp-plumber'),
//    sass = require('gulp-sass'),
//    sass = require('gulp-ruby-sass'),
//    autoprefixer = require('gulp-autoprefixer'),
//    jsmin = require('gulp-uglify'),
    browserSync = require('browser-sync').create();

var src = './src',
    dest = './dist';

// gulp.task('sassTask', function(){
// 	return gulp.src('./sass/*.scss')
// 			.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
// 			// compressed,expanded
// 			.pipe(sass({outputStyle:'expanded'}))
// 			.pipe(autoprefixer({
// 						browsers: ['last 2 versions','Firefox <= 20'],
// 						cascade: false
// 					}))
// 			.pipe(gulp.dest('./css'))
// 			.pipe(browserSync.stream());
// });

// gulp.task('serve', ['lessTask','sassTask','jsminTask'], function(){
gulp.task('serve', function(){
   browserSync.init({
       open: false,
       //scrollProportionally: false, // scrollToTop
       //点击，滚动和表单在任何设备上输入将被镜像到所有设备里
       ghostMode: {
           clicks: false,
           forms: true,
           scroll: false
       },
       server: "./src",
       port: 9001
   })
    // gulp.watch("./less/*.less", ['lessTask']);
    // gulp.watch("./sass/*.scss", ['sassTask']);
    //gulp.watch("./src/styles/sass/*.scss", ['sassTask']); // 1
    // gulp.watch("./js/*.js", ['jsminTask']);
    // gulp.watch("./css/*.css", ['autoPrefixer']);
    gulp.watch(["./src/**/*.html","./src/**/*.js"]).on('change', browserSync.reload); // 1
});

//gulp.task('sassTask', function(){
//    return sass('./src/styles/sass/*.scss')
//        .on('error', sass.logError)
//        .pipe(autoprefixer({
//            browsers: ['last 2 versions','Firefox <= 20'],
//            cascade: false
//        }))
//        .pipe(gulp.dest('./src/styles/css'))
//        .pipe(browserSync.stream());
//});
//
//gulp.task('lessTask', function(){
//    // multiple files change to array type (['','',...])
//    return gulp.src('less/*.less')
//        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
//        .pipe(less())
//        // .pipe(mincss({compatibility: 'ie7'}))
//        // .pipe(mincss())
//        .pipe(autoprefixer({
//            browsers: ['last 2 versions','Firefox <= 20'],
//            cascade: false
//        }))
//
//        .pipe(gulp.dest('css'))
//        .pipe(browserSync.stream());
//});
//
//gulp.task('jsminTask', function(){
//    return gulp.src('./js/*.js')
//        .pipe(jsmin())
//        .pipe(gulp.dest('./js-min'));
//});

gulp.task('default', ['serve']);

// Only watch less types files
// gulp.task('default', function(){
// 	gulp.watch('less/source.less',['lessTask']);
// });