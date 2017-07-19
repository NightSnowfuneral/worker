var path =require('path')
var webpack=require('webpack')
var ExtractTextPlugin=require('extract-text-webpack-plugin')
var webpackProxy = require('./src/utils/WebpackProxy.js');
module.exports={
	entry:{
		main:path.resolve(__dirname,'src/index.js'),
		vendor:['react','react-dom','react-router','redux','react-redux']
	},
	output:{
		filename:'[name].bundle.js',
		path:path.resolve(__dirname,"dist"),
		publicPath:'/dist/'
	},
	module:{
		rules:[
			{
	          	test: /\.jsx?$/,
	          	use:[{loader:'react-hot-loader'},{loader:'babel-loader'}],
	         	include: path.join(__dirname, 'src'),
	       },
					{ 
			  test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,  
			  use: [{loader:'url-loader',options:{name:'[name].[ext]'}}]
		   },{
		       	test:/\.css$/,
				use: ExtractTextPlugin.extract({ 
					fallback: "style-loader", 
					use:["css-loader"]
				})
	       },{
		       	test: /\.(png|jpg|jpeg|gif)$/,
		       	use:[{loader:'url-loader',options:{name:'[name].[ext]'}}]
	       }
		]
	},
	resolve:{
		modules:['node_modules'],
	 	extensions:['.web.js','.js','.jsx','.css'],
	},
	plugins:[
		new webpack.optimize.OccurrenceOrderPlugin(),
	    
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			}
		}),
	    new ExtractTextPlugin('app.css'),
	    new webpack.optimize.CommonsChunkPlugin({ names: ['vendor']}),
	],
	devServer:{
		port:8084,
		public:'orange.sp:8084',
		proxy:webpackProxy
		
	}

}