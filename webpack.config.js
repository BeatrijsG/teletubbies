const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: './src/js/index.js',
	output: {
	  path: path.resolve(__dirname, 'site'),
	  filename: 'js/main.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: { minimize: true }
					}
				]
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader:	"css-loader",
					},
					{
						loader: "postcss-loader"
					},
					{
						loader: "sass-loader",
						options: {
							implementation: require("sass")
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "index.html"
		}),
		new HtmlWebPackPlugin({
			template: "./src/results.html",
			filename: "results.html"
		}),
		new HtmlWebPackPlugin({
			template: "./src/results_ajax.html",
			filename: "results_ajax.html"
		}),
		new MiniCssExtractPlugin({
			filename: "css/style.css"
		})
	]
};
