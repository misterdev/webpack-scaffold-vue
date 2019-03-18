const Generator = require('yeoman-generator');
const { List, Input } = require('@webpack-cli/webpack-scaffold');

const createWebpackConfig = require('./config/webpack');
const createPackageJson = require('./config/package-json');
const createBabelrc = require('./config/babelrc');
const createEslintrc = require('./config/eslintrc');

module.exports = class WebpackGenerator extends Generator {

	constructor(args, opts) {
		super(args, opts);
		opts.env.configuration = {
			dev: {
				webpackOptions: {}
			}
		};
		this.manager = {
			yarn: false,
			npm: false,
			bower: false
		}
		
		this.defaults = {
			name: 'my-vue-project',
			inFolder: './src',
			entry: 'index',
			outFolder: './dist',
			assetsFolder: './public'
		}
	}

	prompting() {
		return this.prompt([
			Input('name', 'You are creating a new Vue project! How do you want to name it? (my-vue-project)'),
			Input('inFolder', 'Which folder will your source code be in? (./src)'),
			Input('entry', 'Which is the entry point of your app? (index)'),
			Input('outFolder', 'Which folder will your generated bundles be in? (./dist)'),
			Input('assetsFolder', 'Which folder will your public assets be in? (./public)'),
			List('manager', 'Which package manager do you prefer?', ['yarn', 'npm'])
		]).then (answers => {
			
			this.answers = answers;
			this.answers.name = (answers.name !== '') ? answers.name : this.defaults.name;
			this.answers.entry = (answers.entry !== '') ? answers.entry : this.defaults.entry;
			this.answers.inFolder = (answers.inFolder !== '') ? answers.inFolder : this.defaults.inFolder;
			this.answers.outFolder = (answers.outFolder !== '') ? answers.outFolder : this.defaults.outFolder;
			this.answers.assetsFolder = (answers.assetsFolder !== '') ? answers.assetsFolder : this.defaults.assetsFolder;

			
			this.manager[this.answers.manager] = true;
			this.options.env.configuration.dev.webpackOptions = createWebpackConfig(this.answers, this.defaults);
			this.options.env.configuration.dev.topScope = [
				"const HtmlWebpackPlugin = require('html-webpack-plugin')",
				"const CopyWebpackPlugin = require('copy-webpack-plugin')",
				"const VueLoaderPlugin = require('vue-loader/lib/plugin')"
			];
		});
	}

	writing() {
		this.config.set('configuration', this.options.env.configuration);
		this.fs.extendJSON(this.destinationPath('package.json'), createPackageJson(this.answers));
		this.fs.extendJSON(this.destinationPath('.babelrc'), createBabelrc());
		this.fs.extendJSON(this.destinationPath('.babelrc'), createEslintrc());
		
		this.templatePath('src/main.js') 
	}

	install() {
		this.installDependencies(this.manager)
	}
};
