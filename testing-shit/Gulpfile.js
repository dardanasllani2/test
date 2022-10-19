const configureExperiment = require('@sogody/experiment-framework/configureExperiment');
const package = require('./package.json');
const gulp = require('gulp');
const config = require('./config.json');

configureExperiment({
  name: package.name,
  config
}, gulp);