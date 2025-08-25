const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    ["glob"]: "./src/index.js",
    ["home"]: "./src/home.js",
    ["studio"]: "./src/studio.js",
    ["contact"]: "./src/contact.js",
    ["work"]: "./src/work.js",
    ["case"]: "./src/case.js",
    ["blog"]: "./src/blog.js",
    ["vercel"]: "./src/vercel.json",
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
