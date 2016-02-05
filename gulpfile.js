var gulp = require('gulp');
var del = require('del');
var bowerFiles = require('main-bower-files');
var exists = require('path-exists');
var browserSync = require('browser-sync').create();
var plugs = require('gulp-load-plugins')(); // require and invoke

var paths = {
    in: {
        index: 'src/client/index.html',
        angularjs: 'src/client/app/**/*.js',
        templates: 'src/client/app/**/*.html',
        less: 'src/client/app/**/*.less'
    },
    out: {
        dist: 'src/server/public',
        js: 'src/server/public/js',
        lib: 'src/server/public/lib',
        css: 'src/server/public/css'
    }
};

var env = process.env.NODE_ENV || 'localhost';

// By default, run build
gulp.task('default', ['build']);

// Build is dependent on clean running and finishing
gulp.task('build', ['build:all'], function () {

    return gulp.src(paths.in.index)
        .pipe(gulp.dest(paths.out.dist))
        .on('error', plugs.util.log);
});

gulp.task('build:all', ['build:angular', 'build:less', 'build:bower']);

// Standalone clean
gulp.task('clean', function () {

    return del(paths.out.dist);
});

gulp.task('build:less', function () {

    return gulp.src(paths.in.less)
        .pipe(plugs.less())
        .pipe(plugs.concat('app.css'))
        .pipe(gulp.dest(paths.out.css))
        .on('error', plugs.util.log);
});

gulp.task('watch:less', function () {

    return gulp.src(paths.in.less)
        .pipe(plugs.less())
        .pipe(plugs.concat('app.css'))
        .pipe(gulp.dest(paths.out.css))
        .pipe(browserSync.stream())
        .on('error', plugs.util.log);
});

gulp.task('build:templates', function () {

    return gulp.src(paths.in.templates)
        .pipe(plugs.angularTemplatecache({
            filename: 'app-tpls.min.js',        // specify filename
            moduleSystem: 'IIFE',               // force IIFE
            standalone: true,                   // generate new module
            module: 'app.templates',            // module name
            transformUrl: function (url) {
                return 'app/' + url;
            }
        }))
        .pipe(plugs.uglify({
            mangle: true,
            output: {
                quote_style: 3
            }
        }))
        .pipe(gulp.dest(paths.out.js));
});

gulp.task('build:angular', ['build:templates'], function () {

    if (env === 'localhost') {
        return gulp.src(paths.in.angularjs)
            .pipe(plugs.angularFilesort())
            .pipe(plugs.ngAnnotate({
                remove: false,
                add: true,
                single_quotes: true
            }))
            .pipe(plugs.jshint())
            .pipe(plugs.jshint.reporter('default'))
            .pipe(plugs.concat('app.min.js'))
            .pipe(gulp.dest(paths.out.js))
            .on('error', plugs.util.log);
    }
    else {
        return gulp.src(paths.in.angularjs)
            .pipe(plugs.angularFilesort())
            .pipe(plugs.ngAnnotate({
                remove: false,
                add: true,
                single_quotes: true
            }))
            .pipe(plugs.sourcemaps.init())
            .pipe(plugs.concat('app.min.js'))
            .pipe(plugs.uglify({
                mangle: true,
                output: {
                    quote_style: 3
                }
            }))
            .pipe(plugs.sourcemaps.write('./'))
            .pipe(gulp.dest(paths.out.js))
            .on('error', plugs.util.log);
    }
});

gulp.task('build:bower', function () {

    // Replace files by their minified version when possible
    var bowerWithMin = bowerFiles().map(function (path, index, arr) {
        var newPath = path.replace(/.([^.]+)$/g, '.min.$1');
        return exists(newPath) ? newPath : path;
    });

    // Copy them to another directory
    return gulp.src(bowerWithMin)
        .pipe(plugs.concat('vendor.min.js'))
        .pipe(gulp.dest(paths.out.lib));
});

gulp.task('watch:angular', ['build:angular'], function () {

    browserSync.reload();
});

gulp.task('watch:index', function () {

    gulp.src(paths.in.index)
        .pipe(gulp.dest(paths.out.dist));

    browserSync.reload();
});

gulp.task('watch', ['build'], function () {

    browserSync.init({
        server: {
            baseDir: './src/server/public/'
        }
    });

    gulp.watch(paths.in.angularjs, ['watch:angular']);
    gulp.watch(paths.in.templates, ['watch:angular']);
    gulp.watch(paths.in.less, ['watch:less']);

    gulp.watch(paths.in.index, ['watch:index']);
    //gulp.watch('src/server/public/**/*.html').on('change', browserSync.reload);
});