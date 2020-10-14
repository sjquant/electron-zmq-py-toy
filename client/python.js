const { PythonShell } = require("python-shell");
const path = require("path");

let python = null;

module.exports = {
  startPython: function () {
    const options = {
      pythonPath: path.join(process.resourcesPath, "py/ElectronZMQPyToy.exe"),
    };
    python = new PythonShell(".", options);
    return python;
  },
};
