const gulp = require('gulp');
const paths = require('./config').paths;
const files = require('./config').files;
const server = require('./browser-sync');

const scripts = () => {
    return gulp.src([
        'node_modules/formbouncerjs/dist/bouncer.polyfills.min.js',
        paths.js.src + '/app.js',
        files.js,
        files.partialJs
    ])
    .pipe($.sourcemaps.init())
    .pipe($.concat('scripts.js'))
    .pipe($.terser())
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(paths.js.dest));
};

const run = gulp.series(scripts);

exports.run = run;
exports.reload = gulp.series(run, server.reload);