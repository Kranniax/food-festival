const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
        watch: true,
      },
    ],
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    watchFiles: ["*.html", "assets/**/*"],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder.
    }),
  ],
  mode: "development",
};
