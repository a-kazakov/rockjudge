var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var makeItFaster = require('spawn-task-experiment').spawn;


var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix = new LessPluginAutoPrefix({ browsers: ["last 5 versions"] });


var all_jsx_tasks = [];

function createJsxTask(task) {
    all_jsx_tasks.push(task);
    function doTheJob() {
        var gulp = require('gulp');
        var browserify = require('browserify');
        var babelify = require('babelify');
        var uglify = require('gulp-uglify');
        var source = require('vinyl-source-stream');
        var buffer = require('vinyl-buffer');
        var gutil = require('gulp-util');

        var task = "__task__";
        var env_type = "__env_type__";
        function buildJsx(entry_point, out_dir, out_file) {
            var bundler = browserify({
                entries: entry_point,
                extensions: ['.jsx'],
                paths: ['./src/jsx/'],
                debug: env_type !== 'production',
            })
            .transform(babelify, {
                presets: ['es2015-loose', 'react'],
                plugins: ['transform-class-properties'],
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
    var str_func = doTheJob.toString()
        .replace("__task__", task)
        .replace("__env_type__", gutil.env.type);
    gulp.task(task, makeItFaster(str_func));
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

gulp.task('all', gulp.parallel.apply(gulp.parallel, all_jsx_tasks));

gulp.task('default', gulp.series('all'));
