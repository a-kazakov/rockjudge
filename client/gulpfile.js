"use strict"

/* eslint-disable no-shadow */
/* eslint-disable prefer-rest-params */

const gulp = require("gulp");
const gutil = require("gulp-util");
const makeItFaster = require("spawn-task-experiment").spawn;

const OUT_DIR = gutil.env.gdest || "../static/";

function makeTask(func, args) {
    const params = Array.from(args);
    const str_func = func.toString();
    const str_params = params.map(p => JSON.stringify(p)).join(",");
    const str_wrapper = `function() { (${str_func})(${str_params}); }`;
    return makeItFaster(str_wrapper);
}

let task_groups = {};

function addTaskToGroup(task, group) {
    if (!task_groups[group]) {
        task_groups[group] = [];
    }
    task_groups[group].push(task);
}

function addGroupTasks() {
    for (const group of Object.keys(task_groups)) {
        gulp.task(group, gulp.parallel.apply(gulp.parallel, task_groups[group]));
    }
}

function makeGeneralLessTask() {
    return makeTask((task, entry_file, out_dir, out_file, path) => {
        const LessPluginCleanCSS = require('less-plugin-clean-css');
        const LessPluginAutoPrefix = require('less-plugin-autoprefix');
        const gulp = require('gulp');
        const less = require('gulp-less');
        const concat = require('gulp-concat');

        const cleancss = new LessPluginCleanCSS({ advanced: true });
        const autoprefix = new LessPluginAutoPrefix({ browsers: ["last 5 versions"] });

        return gulp.src(entry_file)
            .pipe(less({
                plugins: [autoprefix, cleancss],
                paths: path,
            }))
            .pipe(concat(out_file))
            .pipe(gulp.dest(out_dir));
    }, arguments);
}

function makeGeneralJsxTask() {
    return makeTask((task, entry_file, out_dir, out_file, path, debug) => {
        const gulp = require("gulp");
        const browserify = require("browserify");
        const babelify = require("babelify");
        const uglify = require("gulp-uglify");
        const source = require("vinyl-source-stream");
        const buffer = require("vinyl-buffer");
        const gutil = require("gulp-util");

        return browserify({
            entries: entry_file,
            extensions: [".jsx"],
            paths: path,
            debug: debug,
        })
            .transform(babelify, {
                presets: ["@babel/env", "@babel/react"],
                plugins: [
                    "@babel/plugin-proposal-class-properties",
                    "@babel/plugin-proposal-object-rest-spread",
                    "@babel/plugin-proposal-optional-chaining",
                    "@babel/plugin-proposal-nullish-coalescing-operator",
                ],
            })
            .bundle()
            .pipe(source(out_file))
            .pipe(buffer())
            .pipe(debug ? gutil.noop() : uglify())
            .pipe(gulp.dest(out_dir));
    }, arguments);
}

function addPrimaryLessTask(module_name) {
    const task_name = `css_${module_name}`;
    const task_func = makeGeneralLessTask(
        task_name,
        `src/less/entry_points/${module_name}.less`,
        `${OUT_DIR}/css`,
        `${module_name}.css`,
        ["src/less/"]
    );
    addTaskToGroup(task_name, module_name);
    addTaskToGroup(task_name, "css");
    addTaskToGroup(task_name, "css_core");
    addTaskToGroup(task_name, "core");
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}

function addPrimaryJsxTask(module_name) {
    const debug = gutil.env.gtype !== "production";
    const task_name = `js_${module_name}`;
    const task_func = makeGeneralJsxTask(
        task_name,
        `src/jsx/entry_points/${module_name}.jsx`,
        `${OUT_DIR}/js`,
        `${module_name}.js`,
        ["./src/jsx/", "./src/jsx/lib/"],
        debug
    );
    addTaskToGroup(task_name, module_name);
    addTaskToGroup(task_name, "js");
    addTaskToGroup(task_name, "js_core");
    addTaskToGroup(task_name, "core");
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}

function addRulesSetLessTask(rules_set_name) {
    const task_name = `css_rs_${rules_set_name}`;
    const task_func = makeGeneralLessTask(
        task_name,
        `src/less/rules_sets/${rules_set_name}/index.less`,
        `${OUT_DIR}/css/rules_sets`,
        `${rules_set_name}.css`,
        [`src/less/rules_sets/${rules_set_name}`, "src/less/include"]
    );
    addTaskToGroup(task_name, `rs_${rules_set_name}`);
    addTaskToGroup(task_name, "css");
    addTaskToGroup(task_name, `css_rules_sets`);
    addTaskToGroup(task_name, `rules_sets`);
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}

function addRulesSetJsxTask(rules_set_name) {
    const debug = gutil.env.gtype !== "production";
    const task_name = `js_rs_${rules_set_name}`;
    const task_func = makeGeneralJsxTask(
        task_name,
        `src/jsx/rules_sets/${rules_set_name}/root.jsx`,
        `${OUT_DIR}/js/rules_sets`,
        `${rules_set_name}.js`,
        [`./src/jsx/rules_sets/${rules_set_name}/`, './src/jsx/lib'],
        debug
    );
    addTaskToGroup(task_name, `rs_${rules_set_name}`);
    addTaskToGroup(task_name, "js");
    addTaskToGroup(task_name, `js_rules_sets`);
    addTaskToGroup(task_name, `rules_sets`);
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}


addPrimaryLessTask('start_page');
addPrimaryLessTask('admin');
addPrimaryLessTask('auto_printer');
addPrimaryLessTask('competitions');
addPrimaryLessTask('judge');
addPrimaryLessTask('presenter');
addPrimaryLessTask('screen');
addPrimaryLessTask('screen_operator');

addPrimaryJsxTask('start_page');
addPrimaryJsxTask('admin');
addPrimaryJsxTask('auto_printer');
addPrimaryJsxTask('competitions');
addPrimaryJsxTask('judge');
addPrimaryJsxTask('presenter');
addPrimaryJsxTask('screen');
addPrimaryJsxTask('screen_operator');

addRulesSetLessTask('skating');
addRulesSetJsxTask('skating');

addRulesSetLessTask('vftsarr');
addRulesSetJsxTask('vftsarr');

addGroupTasks();

gulp.task('default', gulp.series('all'));
