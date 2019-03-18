module.exports = (answers) => {
    
	const { name, entry, inFolder: src } = answers;
  
  return ({
    "name": name,
    "version": "1.0.0",
    "main": `${src}/${entry}.js`,
    "license": "MIT",
    "scripts": {
      "serve": "webpack-dev-server --mode development --progress --hot --open",
      "build": "webpack --mode production --progress",
      "lint": `eslint  ${src}/*.{js,vue} ${src}/**/*.{js,vue}`,
      "lint:fix": `eslint --fix  ${src}/*.{js,vue} ${src}/**/*.{js,vue}`
    },
    "dependencies": {
      "vue": "^2.6.9"
    },
    "devDependencies": {
      "@babel/core": "^7.3.4",
      "@babel/preset-env": "^7.3.4",
      "babel-eslint": "^10.0.1",
      "babel-loader": "^8.0.5",
      "copy-webpack-plugin": "^5.0.1",
      "css-loader": "^2.1.1",
      "eslint": "^5.15.2",
      "eslint-config-airbnb-base": "^13.1.0",
      "eslint-plugin-import": "^2.16.0",
      "eslint-plugin-vue": "^5.2.2",
      "file-loader": "^3.0.1",
      "html-webpack-plugin": "^3.2.0",
      "vue-loader": "^15.7.0",
      "vue-template-compiler": "^2.6.9",
      "webpack": "^4.29.6",
      "webpack-cli": "^3.2.3",
      "webpack-dev-server": "^3.2.1"
    }
  })
}