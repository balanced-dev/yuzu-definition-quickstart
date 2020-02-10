const gulp = require('gulp'); 
const paths = require('./config').paths; 
const files = require('./config').files; 

const distCss = () => {

	return gulp.src(paths.styles.dest + '/**/*')
		.pipe($.stripCssComments({
			all: true
		}))
		.pipe($.cleanCss())
		.pipe(gulp.dest(paths.styles.dist))
};

const distUiInventory = () => {

	gulp.src(paths.fonts.dest + '/**/*')
		.pipe(gulp.dest(paths.fonts.dist));

	return gulp.src(base.devRoot + '/templates.html')
		.pipe(gulp.dest(base.distRoot));
};

const distJs = () => {

	return gulp.src([paths.js.dest + '/scripts*.js'])
		.pipe(gulp.dest(paths.js.dist))
};

const distCleanTemplates = () => {

	return $.del([
		paths.handlebars.templates.dist + '/**/*'
  	], { force: true });
};

const distCopyBlocks = () => {

	return gulp.src([paths.handlebars.templates.src + '/blocks/**/*.hbs'])
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.templates.dist + '/src/blocks'));

};

const distCopyBlocksHtml = () => {

	return gulp.src(paths.handlebars.templates.dest + '/blocks/**/*')
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.templates.distHtml + '/blocks/'));
};

const distCopyPages = () => {

	return gulp.src([paths.handlebars.templates.src + '/pages/**/*.hbs'])
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.templates.dist + '/src/pages'));
};

const distCopyPagesHtml = () => {
	return gulp.src(paths.handlebars.templates.dest + '/pages/**/*')
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.templates.distHtml + '/pages/'));
};

const distCopyLayouts = () => {

	return gulp.src([paths.handlebars.templates.src + '/_layouts/**/*.hbs'])
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.templates.dist + '/src/_layouts'));
};

const distCopyLayoutsHtml = () => {
	return gulp.src(paths.handlebars.templates.dest + '/_layouts/**/*')
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.templates.distHtml + '/_layouts/'));
};


const distSchemaPages = () => {

	return gulp.src(files.templates + '/pages/**/*.schema')
		.pipe($.yuzuDefinitionCore.gulpSchema(files.templatePartials, false))
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.schema.dist +'/pages'));
};

const distSchemaLayouts = () => {

	return gulp.src(files.templates + '/_layouts/**/*.schema')
		.pipe($.yuzuDefinitionCore.gulpSchema(files.templatePartials, false))
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.schema.dist +'/layouts'));
};

const distSchemaBlocks = () => {

	return gulp.src(files.templates + '/blocks/**/*.schema')
		.pipe($.yuzuDefinitionCore.gulpSchema(files.templatePartials, true))
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.schema.dist +'/blocks'));
};

const distData = () => {

	return gulp.src(files.templates + '/pages/**/*.json')
		.pipe($.yuzuDefinitionCore.gulpData(files.templatePartials))
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.data.dist));
};

const distPaths = () => {
	return gulp.src(files.templates + '/**/*.schema')
		.pipe($.yuzuDefinitionCore.gulpPaths(files.templatePartials))
		.pipe($.flatten())
		.pipe(gulp.dest(paths.handlebars.paths.dist));
};

exports.style = gulp.series(distCss, distJs, distUiInventory);
exports.templates = gulp.series(distCleanTemplates, distCopyBlocks, distCopyPages, distCopyLayouts, distCopyPagesHtml, distCopyBlocksHtml, distCopyLayoutsHtml, distSchemaPages, distSchemaLayouts, distSchemaBlocks, distData, distPaths);