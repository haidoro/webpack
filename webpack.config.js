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
		        test: /\.(gif|png|jpg)$/,
		        use: [
		          {
		            loader: 'url-loader',
		            options: {
		              limit: 51200,
		              name: './images/[name].[ext]'
		            }
		          }
		        ]
		    },
		    {
		    	test: /\.scss$/,
		    	use:['style-loader','css-loader','sass-loader']
		    },
		]
	}
}
