const { PythonShell } = require("python-shell");

let python = null;

module.exports = {
  startPython: function () {
    const options = {
      pythonPath: process.env.PYTHON_PATH || "python",
    };
    python = new PythonShell(
      process.env.SCRIPT_PATH || "../server/main.py",
      options
    );
    return python;
  },
};
