var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var less = require('gulp-less');
var concat = require('gulp-concat');
var gutil = require('gulp-util');


var LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix = new LessPluginAutoPrefix({ browsers: ["last 5 versions"] });


function buildJsx(entry_point, out_dir, out_file) {
    browserify({
        entries: entry_point,
        extensions: ['.jsx'],
        paths: ['./src/jsx/'],
        debug: gutil.env.type !== 'production',
    })
    .transform(babelify, {
        presets: ['es2015-loose', 'react'],
        plugins: ['transform-class-properties'],
    })
    .bundle()
    .pipe(source(out_file))
    .pipe(buffer())
    .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    .pipe(gulp.dest(out_dir));
}

var all_jsx_tasks = [];

function createJsxTask(task) {
    all_jsx_tasks.push(task);
    gulp.task(task, function() {
        buildJsx(
            'src/jsx/' + task + '.jsx',
            '../js',
            task + '.js'
        );
    });
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

gulp.task('all', all_jsx_tasks);

gulp.task('watch', function() {
    gulp.watch('src/**', function() {
        gulp.run('all');
    });
});

gulp.task('default', ['all']);
