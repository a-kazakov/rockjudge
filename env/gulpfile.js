"use strict"

/* eslint-disable no-shadow */
/* eslint-disable prefer-rest-params */

const gulp = require("gulp");
const gutil = require("gulp-util");
const makeItFaster = require("spawn-task-experiment").spawn;

const BASE_DIR = gutil.env.gbase;
const OUT_DIR = gutil.env.gdest;

if (OUT_DIR == null || BASE_DIR == null) {
    throw new Error("gbase and gtest flags must be specified");
}

function makeTask(func, ...args) {
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

function makeGeneralLessTask(user_args) {
    return makeTask((args) => {
        const {task, entry_file, out_dir, out_file, paths, base_dir} = args;
        const LessPluginCleanCSS = require('less-plugin-clean-css');
        const LessPluginAutoPrefix = require('less-plugin-autoprefix');
        const gulp = require('gulp');
        const less = require('gulp-less');
        const concat = require('gulp-concat');

        const cleancss = new LessPluginCleanCSS({ advanced: true });
        const autoprefix = new LessPluginAutoPrefix({ browsers: ["last 5 versions"] });

        return gulp.src(`${base_dir}/${entry_file}`)
            .pipe(less({
                plugins: [autoprefix, cleancss],
                paths: paths.map(p => `${base_dir}/${p}`),
            }))
            .pipe(concat(out_file))
            .pipe(gulp.dest(out_dir));
    }, {base_dir: BASE_DIR, ...user_args});
}

function makeGeneralJsxTask(user_args) {
    return makeTask((args) => {
        const {task, entry_file, out_dir, out_file, paths, debug, base_dir} = args;
        const gulp = require("gulp");
        const browserify = require("browserify");
        const babelify = require("babelify");
        const uglify = require("gulp-uglify");
        const source = require("vinyl-source-stream");
        const buffer = require("vinyl-buffer");
        const gutil = require("gulp-util");

        return browserify({
            entries: `${base_dir}/${entry_file}`,
            extensions: [".jsx"],
            paths: paths.map(p => `${base_dir}/${p}`).concat(['./node_modules']),
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
    }, {base_dir: BASE_DIR, ...user_args});
}

function addCoreLessTask(module_name) {
    const task_name = `css_${module_name}`;
    const task_func = makeGeneralLessTask({
        task: task_name,
        entry_file: `less/entry_points/${module_name}.less`,
        out_dir: `${OUT_DIR}/static/css`,
        out_file: `${module_name}.css`,
        paths: ["less/"],
    });
    addTaskToGroup(task_name, module_name);
    addTaskToGroup(task_name, "css");
    addTaskToGroup(task_name, "css_core");
    addTaskToGroup(task_name, "core");
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}

function addCoreJsxTask(module_name) {
    const debug = gutil.env.gtype !== "production";
    const task_name = `js_${module_name}`;
    const task_func = makeGeneralJsxTask({
        task: task_name,
        entry_file: `jsx/core/entry_points/${module_name}.jsx`,
        out_dir: `${OUT_DIR}/static/js`,
        out_file: `${module_name}.js`,
        paths: ["jsx/core/", "jsx/lib/"],
        debug: debug,
    });
    addTaskToGroup(task_name, module_name);
    addTaskToGroup(task_name, "js");
    addTaskToGroup(task_name, "js_core");
    addTaskToGroup(task_name, "core");
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}

function addCoreStaticTask() {
    const task_name = 'static_core';
    const task_func = makeTask((args) => {
        const {base_dir, out_dir} = args;
        const gulp = require('gulp');
        return gulp.src(`${base_dir}/static/**`)
            .pipe(gulp.dest(`${out_dir}/static/`));
    }, {base_dir: BASE_DIR, out_dir: OUT_DIR });
    addTaskToGroup(task_name, "static");
    addTaskToGroup(task_name, "core");
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}

function addRulesSetLessTask(rules_set_name) {
    const task_name = `css_rs_${rules_set_name}`;
    const task_func = makeGeneralLessTask({
        task: task_name,
        entry_file: `less/rules_sets/${rules_set_name}/index.less`,
        out_dir: `${OUT_DIR}/static/css/rules_sets`,
        out_file: `${rules_set_name}.css`,
        paths: [`less/rules_sets/${rules_set_name}`, "less/include"],
    });

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
    const task_func = makeGeneralJsxTask({
        task: task_name,
        entry_file: `jsx/rules_sets/${rules_set_name}/root.jsx`,
        out_dir: `${OUT_DIR}/static/js/rules_sets`,
        out_file: `${rules_set_name}.js`,
        paths: [`jsx/rules_sets/${rules_set_name}/`, 'jsx/lib'],
        debug: debug
    });
    addTaskToGroup(task_name, `rs_${rules_set_name}`);
    addTaskToGroup(task_name, "js");
    addTaskToGroup(task_name, `js_rules_sets`);
    addTaskToGroup(task_name, `rules_sets`);
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}

function addPluginLessTask(plugin_name) {
    const task_name = `css_plugin_${plugin_name}`;
    const task_func = makeGeneralLessTask({
        task: task_name,
        entry_file: `plugins/${plugin_name}/less/index.less`,
        out_dir: `${OUT_DIR}/${plugin_name}`,
        out_file: `styles.css`,
        paths: [`plugins/${plugin_name}/less`, "less/include"],
    });

    addTaskToGroup(task_name, `plugin_${plugin_name}`);
    addTaskToGroup(task_name, "css");
    addTaskToGroup(task_name, `css_plugins`);
    addTaskToGroup(task_name, `plugins`);
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}

function addPluginJsxTask(plugin_name) {
    const debug = gutil.env.gtype !== "production";
    const task_name = `js_plugin_${plugin_name}`;
    const task_func = makeGeneralJsxTask({
        task: task_name,
        entry_file: `plugins/${plugin_name}/jsx/root.jsx`,
        out_dir: `${OUT_DIR}/${plugin_name}`,
        out_file: `root.js`,
        paths: [`plugins/${plugin_name}/jsx`, 'jsx/lib'],
        debug: debug
    });
    addTaskToGroup(task_name, `plugin_${plugin_name}`);
    addTaskToGroup(task_name, "js");
    addTaskToGroup(task_name, `js_plugins`);
    addTaskToGroup(task_name, `plugins`);
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}

function addPluginStaticTask(plugin_name) {
    const task_name = `static_plugin_${plugin_name}`;
    const task_func = makeTask((args) => {
        const {base_dir, out_dir, plugin_name} = args;
        const gulp = require('gulp');
        return gulp.src(`${base_dir}/plugins/${plugin_name}/static/**`)
            .pipe(gulp.dest(`${out_dir}/${plugin_name}`));
    }, {base_dir: BASE_DIR, out_dir: OUT_DIR, plugin_name });
    addTaskToGroup(task_name, `plugin_${plugin_name}`);
    addTaskToGroup(task_name, "static");
    addTaskToGroup(task_name, "static_plugins");
    addTaskToGroup(task_name, "plugins");
    addTaskToGroup(task_name, "all");
    gulp.task(task_name, task_func);
}

const CORE_MODULES = [
    'start_page',
    'admin',
    'auto_printer',
    'competitions',
    'judge',
    'presenter',
    'screen',
    'screen_operator',
];
const RULES_SETS = [
    'skating',
    'vftsarr',
    'cheerleading',
];
const PLUGINS = [
    'screen',
];

CORE_MODULES.forEach(addCoreLessTask);
CORE_MODULES.forEach(addCoreJsxTask);
addCoreStaticTask();

RULES_SETS.forEach(addRulesSetLessTask);
RULES_SETS.forEach(addRulesSetJsxTask);

PLUGINS.forEach(addPluginLessTask);
PLUGINS.forEach(addPluginJsxTask);
PLUGINS.forEach(addPluginStaticTask);

addGroupTasks();

gulp.task('default', gulp.series('all'));
