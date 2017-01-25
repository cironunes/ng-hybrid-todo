var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'app/test.ts'
    ],
    mime: {
      'text/x-typescript': ['ts','tsx']
    },
    exclude: [],
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'app/*.tsx': ['webpack'],
      'app/*.ts': ['webpack'],
    },
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      entry: webpackConfig.entry
    },
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
};
