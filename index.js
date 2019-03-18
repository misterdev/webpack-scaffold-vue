const Generator = require('yeoman-generator');
const { List, Input, InputValidate } = require('@webpack-cli/webpack-scaffold');

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
			entry: 'main',
			outFolder: './dist',
			publicFolder: './public'
		}
	}

	prompting() {
		const validateName = (value) => {
			// If it contains a space
			if (value.indexOf(' ') > 0) {
				return `Invalid name: spaces are not allowed, try something like ${value.toLowerCase().replace(' ', '-')}`
			} else {
				return true;
			}
		}

		return this.prompt([
			InputValidate('name', 'You are creating a new Vue project! How do you want to name it? (my-vue-project)', validateName),
			Input('inFolder', 'Which folder will your source code be in? (./src)'),
			Input('entry', 'Which is the entry point of your app? (main)'),
			Input('outFolder', 'Which folder will your generated bundles be in? (./dist)'),
			Input('publicFolder', 'Which folder will your public assets be in? (./public)'),
			List('manager', 'Which package manager do you prefer?', ['yarn', 'npm'])
		]).then (answers => {
			
			this.answers = answers;
			this.answers.name = (answers.name !== '') ? answers.name : this.defaults.name;
			this.answers.entry = (answers.entry !== '') ? answers.entry : this.defaults.entry;
			this.answers.inFolder = (answers.inFolder !== '') ? answers.inFolder : this.defaults.inFolder;
			this.answers.outFolder = (answers.outFolder !== '') ? answers.outFolder : this.defaults.outFolder;
			this.answers.publicFolder = (answers.publicFolder !== '') ? answers.publicFolder : this.defaults.publicFolder;

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
		this.fs.extendJSON(this.destinationPath('.eslintrc'), createEslintrc());

		const { entry, inFolder: src, publicFolder } = this.answers;
		const templates = [
			{ src: 'public/favicon.ico', dist: `${publicFolder}/favicon.ico` },
			{ src: 'src/main.js', dist: `${src}/${entry}.js` },
			{ src: 'src/App.vue', dist: `${src}/App.vue` },
			{ src: 'src/assets/logo.png', dist: `${src}/assets/logo.png` },
			{ src: 'src/components/HelloWorld.vue', dist: `${src}/components/HelloWorld.vue` },
			{ src: 'config/.gitignore', dist: '.gitignore'}
		]

		this.fs.copyTpl(
			this.templatePath('public/index.html'),
			this.destinationPath(`${publicFolder}/index.html`),
			{ title: this.answers.name.toLowerCase() }
		);

		templates.forEach(template => {
			this.fs.copyTpl(
				this.templatePath(template.src),
				this.destinationPath(template.dist)
			);
		})

	}

	install() {
		this.installDependencies(this.manager)
	}
};
