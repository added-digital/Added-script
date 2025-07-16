const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    ["glob"]: "./src/index.js",
    ["home"]: "./src/home.js",
    ["studio"]: "./src/studio.js",
    ["work"]: "./src/work.js",
    ["case"]: "./src/case.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "[name]",
    libraryTarget: "umd",
    globalObject: "this",
    umdNamedDefine: true,
    clean: true,
  },
};
