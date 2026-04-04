const fs = require("fs");
const path = require("path");
const vm = require("vm");

function loadModels() {
  const filePath = path.join(__dirname, "..", "src", "modelData", "models.js");
  const source = fs
    .readFileSync(filePath, "utf8")
    .replace(/export default models;\s*$/, "module.exports = models;");

  const sandbox = {
    console,
    module: { exports: {} },
    exports: {},
    require,
    __dirname: path.dirname(filePath),
    __filename: filePath,
  };

  vm.runInNewContext(source, sandbox, { filename: filePath });

  return sandbox.module.exports;
}

module.exports = loadModels;
