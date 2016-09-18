"use strict"

const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const gutil = require('gulp-util');
const makeItFaster = require('spawn-task-experiment').spawn;


const LessPluginCleanCSS = require('less-plugin-clean-css'),
      LessPluginAutoPrefix = require('less-plugin-autoprefix'),
      cleancss = new LessPluginCleanCSS({ advanced: true }),
      autoprefix = new LessPluginAutoPrefix({ browsers: ["last 5 versions"] });


let all_jsx_tasks = [];

function createJsxTask(task) {
    all_jsx_tasks.push(task);
    function doTheJob() {
        const gulp = require('gulp');
        const browserify = require('browserify');
        const babelify = require('babelify');
        const uglify = require('gulp-uglify');
        const source = require('vinyl-source-stream');
        const buffer = require('vinyl-buffer');
        const gutil = require('gulp-util');

        const task = "__task__";
        let env_type = "__env_type__";
        function buildJsx(entry_point, out_dir, out_file) {
            let bundler = browserify({
                entries: entry_point,
                extensions: ['.jsx'],
                paths: ['./src/jsx/', './src/jsx_new/'],
                debug: env_type !== 'production',
            })
            .transform(babelify, {
                presets: ['es2015', 'react'],
                plugins: [
                    'transform-class-properties',
                    'transform-object-rest-spread',
                    'syntax-trailing-function-commas',
                ],
            })
            .bundle()
            .pipe(source(out_file))
            .pipe(buffer())
            .pipe(env_type === 'production' ? uglify() : gutil.noop())
            .pipe(gulp.dest(out_dir));
            return bundler;
        }
        return buildJsx(
            `src/jsx_new/entry_points/${task}.jsx`,
            "../js",
            `${task}.js`
        );
    }
    let str_func = doTheJob.toString()
        .replace("__task__", task)
        .replace("__env_type__", gutil.env.type);
    gulp.task(task, makeItFaster(str_func));
}

function createRuleSetJsxTask(task) {
    all_jsx_tasks.push("rs_" + task);
    function doTheJob() {
        let gulp = require('gulp');
        let browserify = require('browserify');
        let babelify = require('babelify');
        let uglify = require('gulp-uglify');
        let source = require('vinyl-source-stream');
        let buffer = require('vinyl-buffer');
        let gutil = require('gulp-util');

        let task = "__task__";
        let env_type = "__env_type__";
        function buildJsx(entry_point, out_dir, out_file) {
            let bundler = browserify({
                entries: entry_point,
                extensions: ['.jsx'],
                paths: ['./src/jsx/', './src/jsx/rules_sets/' + task + '/'],
                debug: env_type !== 'production',
            })
            .transform(babelify, {
                presets: ['es2015', 'react'],
                plugins: [
                    'transform-class-properties',
                    'transform-object-rest-spread',
                    'syntax-trailing-function-commas',
                ],
            })
            .bundle()
            .pipe(source(out_file))
            .pipe(buffer())
            .pipe(env_type === 'production' ? uglify() : gutil.noop())
            .pipe(gulp.dest(out_dir));
            return bundler;
        }
        return buildJsx(
            `src/jsx/rules_sets/${task}/root.jsx`,
            '../js/rules_sets',
            `${task}.js`
        );
    }
    let str_func = doTheJob.toString()
        .replace("__task__", task)
        .replace("__env_type__", gutil.env.type);
    gulp.task(`rs_${task}`, makeItFaster(str_func));
}

createJsxTask('start_page');
createJsxTask('admin');
createJsxTask('auto_printer');
createJsxTask('competitions');
createJsxTask('judge');
createJsxTask('lib');
createJsxTask('presenter');
createJsxTask('screen');
createJsxTask('screen_operator');

createRuleSetJsxTask('rosfarr');

gulp.task('all', gulp.parallel.apply(gulp.parallel, all_jsx_tasks));

gulp.task('default', gulp.series('all'));
