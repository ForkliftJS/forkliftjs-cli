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
    var taskPath = path.join(process.cwd(), 'node_modules', 'forkliftjs', 'lib', 'tasks', taskName);
    var task = require(taskPath);

    task.run();
  } catch(err) {
    printVersion();
    echo(['Task', taskName, 'not found. :('].join(' '));
    echo('Please make sure you have installed ForkliftJS locally and is up-to-date.');
    echo('Run npm outdated to see if you are running the latest version.');
  };
};
