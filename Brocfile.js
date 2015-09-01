var pickFiles = require('broccoli-static-compiler');
var compileModules = require('broccoli-babel-transpiler');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');
var concat = require('broccoli-concat');
var replace = require('broccoli-string-replace');

var optionalTreesToMerge = [];

var libTreeES6 = pickFiles('lib', {
  srcDir: '/',
  files: ['**/*.js'],
  destDir: '/pinky-swear'
});

var testsTreeES6 = pickFiles('tests', {
  srcDir: '/',
  files: ['**/*.js'],
  destDir: '/tests'
});

var libTree = compileModules(libTreeES6, {
  modules: 'umd',
  moduleIds: true
});

var testsTree = compileModules(testsTreeES6, {
  modules: 'umd',
  moduleIds: true
});

var libConcat = concat(libTree, {
  inputFiles: [ '**/*.js' ],
  outputFile: '/pinky-swear.js'
});

var testsConcat = concat(testsTree, {
  inputFiles: [ '**/*.js' ],
  outputFile: '/tests.js'
});

var cpToTest = function(absPath) {
  var dir = path.dirname(absPath);
  var filename = path.basename(absPath);
  return pickFiles(dir, {
    srcDir: '/',
    files: [filename],
    destDir: '/tests'
  });
}

var testIndex = cpToTest('tests/index.html');
var loader = cpToTest('vendor/loader.js');

if (process.env.INTEGRATION_TEST) {
  var promisesAplusTests = pickFiles('node_modules/promises-aplus-tests/lib/tests', {
    srcDir: '/',
    files: ['helpers/*.js', '*.js'],
    destDir: '/'
  });

  promisesAplusTests = compileModules(promisesAplusTests, {
    modules: 'umd',
    moduleIds: true
  });

  promisesAplusTests = concat(promisesAplusTests, {
    inputFiles: ['**/*.js'],
    outputFile: '/tests/promises-aplus-specification.js'
  });

  promisesAplusTests = replace(promisesAplusTests, {
    files: ['**/*.js'],
    pattern: {
      match: /require\("\.\//g,
      replacement: 'require("'
    }
  });

  optionalTreesToMerge.push(promisesAplusTests);
}

RSVPTree = cpToTest('node_modules/rsvp/dist/rsvp.js');

chaiTree = cpToTest('node_modules/testem/public/testem/chai.js');
sinonTree = cpToTest('node_modules/sinon/pkg/sinon.js');


module.exports = mergeTrees([
  libTree,
  testsTree,
  testIndex,
  testsConcat,
  libConcat,
  loader,
  chaiTree,
  sinonTree,
  RSVPTree
]);
