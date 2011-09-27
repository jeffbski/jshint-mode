/*
  load .jshintrc options from project and home

  var jshint_options = require('./jshint-mode-options').getOptions();
*/

var fs = require('fs'),
    path = require('path');

function _removeJsComments(str) {
    str = str || '';
    str = str.replace(/\/\*[\s\S]*(?:\*\/)/g, ''); //everything between "/* */"
    str = str.replace(/\/\/[^\n\r]*/g, ''); //everything after "//"
    return str;
}
 
function _loadAndParseConfig(filePath) {
    var config = {},
        fileContent;

    try {
        if (path.existsSync(filePath)) {
            fileContent = fs.readFileSync(filePath, "utf-8");
            config = JSON.parse(_removeJsComments(fileContent));
        }
    } catch (e) {
        process.stdout.write("Error opening config file " + filePath + '\n');
        process.stdout.write(e + "\n");
        process.exit(1);
    }

    return config;
}

function _mergeConfigs(homerc, cwdrc) {
    var homeConfig = _loadAndParseConfig(homerc),
        cwdConfig = _loadAndParseConfig(cwdrc),
        prop;

    for (prop in cwdConfig) {
        if (typeof prop === 'string') {
            if (prop === 'predef') {
                homeConfig.predef = (homeConfig.predef || []).concat(cwdConfig.predef);
            } else {
                homeConfig[prop] = cwdConfig[prop];
            }
        }
    }

    return homeConfig;
}

module.exports = {
    getOptions: function(){
      var defaultConfig = path.join(process.env.HOME, '.jshintrc');
      var projectConfig = path.join(process.cwd(), '.jshintrc');
      var config = _mergeConfigs(defaultConfig, projectConfig);
      return config;
    }
};

