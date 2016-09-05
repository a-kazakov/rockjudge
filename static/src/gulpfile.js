"use strict"

let gulp = require('gulp');
let less = require('gulp-less');
let concat = require('gulp-concat');
let gutil = require('gulp-util');
let makeItFaster = require('spawn-task-experiment').spawn;


let LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix = new LessPluginAutoPrefix({ browsers: ["last 5 versions"] });


let all_jsx_tasks = [];

function createJsxTask(task) {
    all_jsx_tasks.push(task);
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
                paths: ['./src/jsx/', './src/jsx_new/'],
                debug: env_type !== 'production',
            })
            .transform(babelify, {
                presets: ['es2015', 'react'],
                plugins: ['transform-class-properties', 'transform-object-rest-spread'],
            })
            .bundle()
            .pipe(source(out_file))
            .pipe(buffer())
            .pipe(env_type === 'production' ? uglify() : gutil.noop())
            .pipe(gulp.dest(out_dir));
            return bundler;
        }
        return buildJsx(
            'src/jsx/' + task + '.jsx',
            '../js',
            task + '.js'
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
                plugins: ['transform-class-properties', 'transform-object-rest-spread'],
            })
            .bundle()
            .pipe(source(out_file))
            .pipe(buffer())
            .pipe(env_type === 'production' ? uglify() : gutil.noop())
            .pipe(gulp.dest(out_dir));
            return bundler;
        }
        return buildJsx(
            'src/jsx/rules_sets/' + task + '/root.jsx',
            '../js/rules_sets',
            task + '.js'
        );
    }
    let str_func = doTheJob.toString()
        .replace("__task__", task)
        .replace("__env_type__", gutil.env.type);
    gulp.task("rs_" + task, makeItFaster(str_func));
}

createJsxTask('start_page');
createJsxTask('admin');
createJsxTask('auto_printer');
createJsxTask('competitions');
createJsxTask('connection_tester');
createJsxTask('judge');
createJsxTask('lib');
createJsxTask('presenter');
createJsxTask('screen');
createJsxTask('screen_operator');

createRuleSetJsxTask('rosfarr');

gulp.task('all', gulp.parallel.apply(gulp.parallel, all_jsx_tasks));

gulp.task('default', gulp.series('all'));
