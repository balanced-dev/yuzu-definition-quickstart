const gulp = require('gulp');
const config = require('./config'); 
const base = require('./config').base; 
const files = require('./config').files; 
const server = require('./browser-sync'); 

const dist = require('./dist'); 
const style = require('./style'); 
const js = require('./js');
const templates = require('./templates'); 
const assets = require('./assets'); 

//load modules into gulp friendly container
$ = require('gulp-load-plugins')({
	pattern: ['gulp-*', 'gulp.*', 'main-*', 'yuzu-definition-*', 'yuzu-def-*', 'browser-sync', 'run-sequence', 'handlebars', 'path', 'del', 'ansi-colors', 'fancy-log'],
	camelize: true
}),

//plumber setup
gulp_src = gulp.src;
gulp.src = function() {
	return gulp_src.apply(gulp, arguments)
		.pipe($.plumber(function(error) {
			let message = typeof(error) === 'string' ? error : '('+ error.plugin + '): ' + error.message;
			// Output an error message
			$.fancyLog.error($.ansiColors.bold($.ansiColors.bgRed(' ERROR ') + ' ' + $.ansiColors.red(message)));
		}));
};

const watch = (done) => {

    gulp.watch([files.scssSetup, files.partialsScss], style.reload);
	gulp.watch([paths.js.src + '/**/*.js', files.partialJs], js.reload);
	gulp.watch([base.devTemplates + '/**/*.schema', base.devTemplates + '/**/*.json', base.devTemplates + '/**/*.hbs'], templates.reload);
	gulp.watch([files.images, files.fonts], assets.reload);
	
	done();
};

const buildUi = gulp.parallel(templates.run, style.run, js.run, assets.run);

exports.buildUi = buildUi;
exports.ui = gulp.series(buildUi, watch, server.init);
exports.watch = watch;
exports.dist = gulp.series(dist.style, dist.templates);
exports.showPaths = config.showPaths;