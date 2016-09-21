"use strict"

/* eslint-disable no-shadow */
/* eslint-disable prefer-rest-params */

const gulp = require("gulp");
const gutil = require("gulp-util");
const makeItFaster = require("spawn-task-experiment").spawn;

function makeTask(func) {
    const params = Array.from(arguments).slice(1);
    const str_func = func.toString();
    const str_params = params.map(p => JSON.stringify(p)).join(",");
    const str_wrapper = `function() { (${str_func})(${str_params}); }`;
    return makeItFaster(str_wrapper);
}

const js_task = makeTask((debug) => {
    const gulp = require("gulp");
    const browserify = require("browserify");
    const babelify = require("babelify");
    const uglify = require("gulp-uglify");
    const source = require("vinyl-source-stream");
    const buffer = require("vinyl-buffer");
    const gutil = require("gulp-util");

    return browserify({
        entries: "./jsx/root.jsx",
        extensions: [".jsx"],
        paths: ["./jsx/"],
        debug: debug,
    })
        .transform(babelify, {
            presets: ["es2015", "react"],
            plugins: [
                "transform-class-properties",
                "transform-object-rest-spread",
                "syntax-trailing-function-commas",
            ],
        })
        .bundle()
        .pipe(source("root.js"))
        .pipe(buffer())
        .pipe(debug ? gutil.noop() : uglify())
        .pipe(gulp.dest("../static/"));
}, gutil.env.type !== "production");


const css_task = makeTask(() => {
    const LessPluginCleanCSS = require('less-plugin-clean-css');
    const LessPluginAutoPrefix = require('less-plugin-autoprefix');
    const gulp = require('gulp');
    const less = require('gulp-less');
    const concat = require('gulp-concat');

    const cleancss = new LessPluginCleanCSS({ advanced: true });
    const autoprefix = new LessPluginAutoPrefix({ browsers: ["last 5 versions"] });

    return gulp.src("./less/index.less")
        .pipe(less({
            plugins: [autoprefix, cleancss],
            paths: ["./less"],
        }))
        .pipe(concat("styles.css"))
        .pipe(gulp.dest("../static/"));
});


gulp.task("js", js_task);
gulp.task("css", css_task);

gulp.task("all", gulp.parallel("js", "css"));
gulp.task("default", gulp.series("all"));
