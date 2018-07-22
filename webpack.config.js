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
				use:[
					'style-loader',
					'css-loader'
				]
			}
		]
	}
}