'use strict';
let gulp = require('gulp'),
    bs = require('browser-sync'),
    sass = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCss = require('gulp-clean-css'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename'),
    //images
    imagemin = require('gulp-imagemin'),
    mozjpeg = require('imagemin-mozjpeg'),
    pngquant = require('imagemin-pngquant'),
    webp = require('imagemin-webp'),
    extReplace = require("gulp-ext-replace"),
    // responsive = require('gulp-responsive'),//https://www.npmjs.com/package/gulp-responsive
    // clean = require('gulp-clean'),
    $ = require('gulp-load-plugins')(),
    image = require('gulp-image');

gulp.task('transfer', function () {
    gulp.src(['./src/img/**/*.+(ico|svg|png)'])
        .pipe(image())
        .pipe(gulp.dest('./dist/img/'));
});

//https://github.com/mahnunchik/gulp-responsive/blob/HEAD/examples/gulp-responsive-config.md
gulp.task('images', ['clean'], function () {
    // Make configuration from existing HTML and CSS files
    var config = $.responsiveConfig([
        './src/sass/*.sass',
        './src/*.html'
    ]);
    console.log(config);
    gulp.src(['./src/**/*.jpg'])
        // Use configuration
        .pipe($.responsive(config, {
            stats: true,
            errorOnUnusedImage: false,
            passThroughUnused: false,
            progressive: true,
            quality: 60,
            withMetadata: false,
            compressionLevel: 9,
            format: 'jpg',
            // min: true,
            // max: true,
            resize: { fit: "contain", position: "center" }
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    gulp.src('./dist/img', { read: false })
        .pipe($.clean());
});

//https://www.npmjs.com/package/gulp-responsive
gulp.task('thumbs', function () {
    gulp.src('./dist/img/**/*.jpg')
        .pipe($.responsive({
            '**/*.jpg': {
                stats: true,
                progressive: true,
                width: '100%',
                quality: 15,
                blur: true,
                compressionLevel: 9,
                format: 'jpg',
                rename: {
                    suffix: '-thumb'
                }
            }
        }, {
            // Global configuration for all images
            // Use progressive (interlace) scan for JPEG and PNG output
            progressive: true,
            // Strip all metadata
            withMetadata: false,
        }))
        .pipe(gulp.dest('./dist/img/'))
});

const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('default', ['serve']);

// Static Server + watching scss/html files
gulp.task('serve', ['pages', 'sass', 'js'], function () {


    bs.init({ // browser sync
        server: "./dist"
    });
    gulp.watch("./src/sass/*.+(sass|scss)", ['sass']);
    gulp.watch("./src/js/**/*.js", ['js']).on('change', bs.reload);
    gulp.watch("./src/**/*.html", ['pages']).on('change', bs.reload);
});

// Gulp task to minify HTML files
gulp.task('pages', function () {
    return gulp.src(['./src/**/*.html'])
        // .pipe(htmlmin({
        //     collapseWhitespace: true,
        //     removeComments: true
        // }))
        .pipe(gulp.dest('./dist/'));
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./src/sass/*.+(sass|scss)")
        .pipe(sass())
        .pipe(autoprefixer({
            // overrideBrowserslist: ['last 2 versions'],                
            overrideBrowserslist: AUTOPREFIXER_BROWSERS,
            cascade: false
        }))
        .pipe(cleanCss({ compatibility: 'ie8' })) // Минификация css 
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("./dist/css/"))
        .pipe(bs.stream());
});

gulp.task('js', function () {
    gulp.src([
        './src/js/**/*.js',
        './src/libs/**/*.js',
        '!src/js/_*.js', //!-позволяет пропустить файлы
    ])
        // .pipe(uglify({
        //     mangle: true,
        //     // mangle: { toplevel: true }
        //     output: {
        //         // beautify: true
        //     }
        // }))
        .on('error', function (e) {
            console.log(e);
        })
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('imagemin', () => {
    gulp.src('./src/img/**/*')
        .pipe(imagemin([
            pngquant({ quality: [0.7, 0.7] }),
            mozjpeg({ quality: 75 })
        ]))
        .pipe(gulp.dest('./dist/img/'))
});

// its working
// export to webp
gulp.task("ewebp", function () {
    let src = ["./src/img/**/*.+(jpg|png|jpeg|webp)"]; // Where your PNGs are coming from.
    let dest = "./src/img/"; // Where your WebPs are going.
    return gulp.src(src)
        .pipe(
            imagemin([
                webp({
                    quality: 75
                })
            ]))
        .pipe(extReplace(".webp"))
        .pipe(gulp.dest(dest));
});

gulp.task('deploy', function () {

    var conn = ftp.create({
        host: 'arch',
        user: 'artegm',
        password: 'ghjhghgh',
        parallel: 10,
        log: gutil.log
    });

    var globs = [
        'src/**/*',
        // 'css/**',
        // 'js/**',
        // 'fonts/**',
        // 'index.html'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src(globs, { base: '.', buffer: false })
        .pipe(conn.newer('/public_html/projects/flowers/')) // only upload newer files
        .pipe(conn.dest('/public_html/projects/flowers/'));

});