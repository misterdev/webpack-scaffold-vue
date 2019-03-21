module.exports = (answers) => {
	const { name, entry, inFolder: src, outFolder: dist, publicFolder } = answers;

	return {
		entry: `"./${src}/${entry}.js"`,
		mode: '"development"',
		module: {
		  rules: [
			{
			  test: "/\\.js$/",
			  exclude: "/node_modules/",
			  loader: '"babel-loader"',
			},
			{
			  test: "/\\.vue$/",
			  exclude: "/node_modules/",
			  loader: '"vue-loader"',
			},
			{
			  test: "/\\.(png|jpe?g|gif|webp)(\\?.*)?$/",
			  loader: '"file-loader"',
			},
			{
			  test: "/\\.css$/",
			  oneOf: [
				{
				  resourceQuery: "/\\?vue/",
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
					PROJECT_NAME: "${name}"
				},
				template: './${publicFolder}/index.html',
		  })`,
		  `new CopyWebpackPlugin([
			{
			  from: './${publicFolder}',
			  to: './${dist}',
			  toType: 'dir',
			  ignore: ['.DS_Store'],
			}
		  ])`,
		],
	}
};
