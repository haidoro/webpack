const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry:'./src/index.js',
	output:{
		path:`${__dirname}/dist`,
		filename:'main.js'
	},
	devServer:{
		contentBase:'./dist'
	},
	module:{
		rules:[
			{
				test: /\.css$/,
				use:ExtractTextPlugin.extract({
					use:'css-loader'
				})
			}
		]
	},
	plugins:[
		new ExtractTextPlugin('style.css'),
		]
}
