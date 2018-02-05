module.exports = {
  entry: [
    "./frontend/app.js"
  ],
  output: {
    filename: "public/js/app.js"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
