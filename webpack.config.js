const currentTask = process.env.npm_lifecycle_event
var path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const copyToRootArr = ['menu.html', 'footer.html','ledogbe.css', 'sne.js'];

function copyFilesToRoot(arr) {
	console.log('startet copyFilesToRoot')
	arr.forEach(filename => {
		fse.copy(`./app/${filename}`, `./dist/${filename}`)
		.then(() => {
			console.log(`${filename} success!`)
		})
		.catch(err => {
			console.error(err)
		});
	});
	copyRecursiveSync('app/assets', 'dist/assets');  
	// })
}

const copyRecursiveSync = function copyRecursiveSync (src, dest) {
    fse.copySync(src, dest);

    fse.readdirSync(src)
        .map((name) => name)
        .filter((dir) => fse.lstatSync(path.join(src, dir)).isDirectory())
        .forEach((dir) => {
			if (['scripts', 'styles'].includes(dir)) {}
			else {
				copyRecursiveSync(path.join(src, dir), path.join(dest, dir));
				console.log("copy "+path.join(src, dir)+" to "+path.join(dest, dir));	
			}
            
        });
};

const postCSSPlugins = [
	require('postcss-import'),
	require('postcss-mixins'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	require('autoprefixer')
];

class RunAfterCompile {
	apply(compilerr) {
		compilerr.hooks.done.tap('Copy assets', function() {
			copyFilesToRoot(copyToRootArr)
		})
	}
}

let cssConfig = {
	test: /\.css$/i,
	use: ['css-loader?url=false', 
	{loader: 'postcss-loader', options: {plugins: postCSSPlugins}}]
}

// html + php - menu+footer
 let pages = fse.readdirSync('./app').filter(function(file) {
	if (file.endsWith('menu.html') || file.endsWith('footer.html')) {
		return false
	} else if (file.endsWith('.html') || file.endsWith('.php')) {
		return true
	}
  }).map(function(page) {
	  console.log('fil-navn='+page)
	return new HtmlWebpackPlugin({
	  filename: page,
	  template: `./app/${page}`,
	  minify: false
	})
  }) 

  

//let test = [new HtmlWebpackPlugin({filename: 'index.html', template: './app/index.html'})]

let config = {
	entry: "./app/assets/scripts/App.js",
	plugins: pages,
	module: {
		rules: [
			cssConfig
		]
	}
}

if (currentTask == 'dev') {
	cssConfig.use.unshift('style-loader')
	config.output = {
		path: path.resolve(__dirname, "app"),
		filename: "bundled.js"
	}
	config.devServer = {
		before: function(app, server) {
			server._watch('./app/**/*html')
		},
		contentBase: path.join(__dirname, 'app'),
		hot: true,
		port: 3000,
		host: '0.0.0.0'
	}
	config.mode = 'development'
}


if (currentTask == 'build') {
	cssConfig.use.unshift(MiniCssExtractPlugin.loader)
	config.output = {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, "dist")
	}
	config.mode = 'production'
	config.optimization = {
		splitChunks: {chunks: 'all'}
	}
	config.plugins.push(
		new CleanWebpackPlugin(), 
		new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
		new RunAfterCompile()
	)
	//copyFilesToRoot(copyToRootArr);
}


/*	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	} */


module.exports = config