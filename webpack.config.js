const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    ["glob"]: "./src/index.js",
    ["home"]: "./src/home.js",
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
