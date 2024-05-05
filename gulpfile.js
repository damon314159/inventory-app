import rollup from '@rollup/stream'
import { deleteAsync as del } from 'del'
import 'dotenv/config'
import gulp from 'gulp'
import nodemon from 'gulp-nodemon'
import gulpSass from 'gulp-sass'
import ts from 'gulp-typescript'
import * as dartSass from 'sass'
import source from 'vinyl-source-stream'
import rollupConfig from './src/frontend/rollup.config.js'

const { src, dest, series, parallel, watch } = gulp

// Create base tasks for each process

function clean() {
  // Remove leftover dist and temp files
  return del(['dist/**', '!dist', 'temp/**, !temp'])
}

const sass = gulpSass(dartSass)
function scssCompile() {
  return src('src/frontend/stylesheets/index.scss')
    .pipe(
      sass({
        includePaths: ['node_modules'],
        outputStyle: 'compressed',
        quietDeps: true,
      })
    )
    .pipe(dest('dist/public/styles'))
}

const projectServer = ts.createProject('tsconfig.json')
function tsCompileServer() {
  // Use the root tsconfig to output server code for node.js runtime
  return projectServer.src().pipe(projectServer()).js.pipe(dest('dist'))
}

const projectClient = ts.createProject('src/frontend/tsconfig.json')
function tsCompileClient() {
  // Use the frontend tsconfig to output frontend code with ES5 target
  return projectClient.src().pipe(projectClient()).js.pipe(dest('temp'))
}

function jsBundleClient() {
  // Use the frontend rollup conf to bundle the transpiled frontend code
  return rollup(rollupConfig)
    .pipe(source('index.js'))
    .pipe(dest('./dist/public/scripts'))
}

function copyViews() {
  // Move the src views into dist
  return src('src/frontend/views/**').pipe(dest('dist/views'))
}

function copyAssets() {
  // Move the assets into dist
  return src('assets/**/*.{jpg,png,svg}', { encoding: false }).pipe(
    dest('dist/public/assets')
  )
}

// Compose tasks into static build process
// Use series and parallel methods to optimise build time
// Triggered with `npm run build`

const buildJsClient = series(tsCompileClient, jsBundleClient)
const buildJs = parallel(tsCompileServer, buildJsClient)
const copyFiles = parallel(copyViews, copyAssets)
const build = series(clean, parallel(scssCompile, buildJs, copyFiles))

export { clean, build }

// Compose tasks into watch build process
// Allows a smoother dev process without manual rebuilds
// Triggered with `npm run watch`

function watchScss() {
  return watch('src/frontend/stylesheets/**', scssCompile)
}
function watchTsServer() {
  return watch(['src/**/*.ts', '!src/frontend/**'], tsCompileServer)
}
function watchTsClient() {
  return watch('src/frontend/scripts/**', buildJsClient)
}
function watchViews() {
  return watch('src/frontend/views/**', copyViews)
}
function watchAssets() {
  return watch('assets/**', copyAssets)
}

// Use nodemon instead of node for fast, stateful restarts in watch mode
function start() {
  return nodemon({
    script: 'dist/bin/www.js',
    watch: 'dist',
    ext: 'js, json, ejs, css',
    // Debouncing
    delay: 500,
  })
}

// Run a clean build before watching
const watchSrc = series(
  build,
  parallel(
    watchScss,
    watchTsServer,
    watchTsClient,
    watchViews,
    watchAssets,
    start
  )
)

export { watchSrc }
