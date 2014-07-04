require('jasmine-before-all');
var ScreenShotReporter = require('protractor-screenshot-reporter');
jasmine.getEnv().addReporter(new ScreenShotReporter({
    baseDirectory: './testResults/screenshots',
    pathBuilder: function pathBuilder(spec, descriptions, results, capabilities) {
      return descriptions.join('-');
    },
    takeScreenShotsOnlyForFailedSpecs: true
}));
