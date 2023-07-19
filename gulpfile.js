// import gulp package
const gulp = require('gulp');
// integrate gulp with sass
const sass = require('gulp-sass')(require('sass'));
// import source maps (map css -> scss)
const sourcemaps = require('gulp-sourcemaps');
// import gulp-uglify
const uglify = require('gulp-uglify');
// import gulp-obfuscate
const obfuscate = require('gulp-obfuscate');
// import gulp-imagemin
const imagemin = require('gulp-imagemin');

function comprimeImagens() {
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJavascript() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

// public
// function funcaoPadrao(callback) {
//     setTimeout(function() {
//         console.log('Executando via Gulp');
//         callback();
//     }, 3000);
// }

// // public
// function dizOi(callback) {
//     console.log('Olá Gulp!')
//     dizTchau();
//     callback();
// }

// // private
// function dizTchau() {
//     console.log('Tchau.')
// }

// exports.default = gulp.parallel(funcaoPadrao, dizOi);
// exports.dizOi = dizOi;

exports.default = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimeJavascript));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimeImagens));
}