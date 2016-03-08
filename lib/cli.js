function printVersion() {
  var version = require('../package.json').version;
  require('shelljs').echo(['ForkliftJS CLI version', version].join(' '));
}

module.exports.runTask = function(taskName) {
  var echo = require('shelljs').echo;

  if (!taskName) {
    printVersion();
    echo('Please specify a task name.');
    return;
  }

  try {
    var path = require('path');
    var taskPath = path.join(__dirname, 'lib', 'tasks', taskName);
    var task = require(taskPath);

    task.run();
  } catch(err) {
    printVersion();
    echo(['Task', taskName, 'not found. :('].join(' '));
  };
};
