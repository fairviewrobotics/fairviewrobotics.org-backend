const { src, dest, series, task } = require('gulp');
const ts = require('gulp-typescript');
const nodemon = require('gulp-nodemon');
const del = require('del');

const buildFolder = 'dist';
const tsProject = ts.createProject('tsconfig.json');

const clean = done => del(buildFolder).then(() => done());

// gulp.task is needed for the outdated nodemon "tasks" array to work
task('clean', clean);

const build = () => 
  src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(dest(buildFolder));

task('build', series(clean, build));

const watch = done =>
  nodemon({
    script: `${buildFolder}/app.js`,
    ext: 'ts',
    watch: 'src',
    tasks: ['build'],
    done
  })

task('watch', series(clean, build, watch));