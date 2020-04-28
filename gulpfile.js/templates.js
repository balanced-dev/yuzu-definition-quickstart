const gulp = require('gulp'); 
const { series, parallel } = require('gulp');
const paths = require('./config').paths; 
const files = require('./config').files; 
const server = require('./browser-sync'); 
const yuzu = require('yuzu-definition-core');
const fs = require('fs');

const clearTemplateOutput = () => {
	return $.del([ files.templateHTML ]);
};

const renderTemplates = () => {
	return gulp.src(files.templates + '/**/*.json')
		.pipe(yuzu.gulpBuild(files.templatePartials, $.yuzuDefinitionHbsHelpers, paths.handlebars.data.layout))
		.pipe($.rename(function (path) {
			path.dirname = path.dirname.replace('data', '');
			path.extname = ".html";
		}))
		.pipe(gulp.dest(files.templateHTML));
};

const savePreviewPaths = () => {
	return Promise.resolve(
		fs.writeFileSync(files.templatePaths, JSON.stringify(yuzu.build.getPreviews(files.templateHTML)))
	);
};

exports.run = series(clearTemplateOutput, renderTemplates, savePreviewPaths);
exports.reload = series(renderTemplates, server.reload);
