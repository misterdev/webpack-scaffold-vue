module.exports = (answers) => {
	const { name, entry, inFolder, outFolder, assetsFolder } = answers;

	return {
		entry: `"${inFolder}/${entry}.js"`,
		mode: '"development"',
		module: {
		  rules: [
			{
			  test: "/\.js$/",
			  exclude: "/node_modules/",
			  loader: '"babel-loader"',
			},
			{
			  test: "/\.vue$/",
			  exclude: "/node_modules/",
			  loader: '"vue-loader"',
			},
			{
			  test: "/\.(png|jpe?g|gif|webp)(\?.*)?$/",
			  loader: '"file-loader"',
			},
			{
			  test: "/\.css$/",
			  oneOf: [
				{
				  resourceQuery: "/\?vue/",
				  use: [
					{
					  loader: '"vue-style-loader"',
					},
					{
					  loader: '"css-loader"',
					},
				  ],
				},
			  ],
			},
		  ],
		},
		plugins: [
		  "new VueLoaderPlugin()",
		  `new HtmlWebpackPlugin({
			templateParameters: {
			  BASE_URL: '/',
			  PROJECT_NAME: "${name}"
			},
			template: './${assetsFolder}/index.html',
		  })`,
		  `new CopyWebpackPlugin([
			{
			  from: './${assetsFolder}',
			  to: './${outFolder}',
			  toType: 'dir',
			  ignore: ['.DS_Store'],
			},
		  ])`,
		],
	}
};
