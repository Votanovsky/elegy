const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const fs = require('fs');


function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: 'head',
        })
    })
}

const htmlPlugins = generateHtmlPlugins('./src/html/views');

module.exports = {
    entry: './src/js/index.js',
    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    plugins: [
        new CopyPlugin({
        patterns: [
          { from: "src/fonts", to: "fonts" },
          { from: "src/html/includes", to: "html/includes" },
          { from: "src/js", to: "js" },
          { from: "src/php", to: "php" },
          { from: "src/lang", to: "lang" },
          { from: "**/.DS_Store", 
            context: path.resolve(__dirname, "src"),
            to: ""},
          //   { from: "src/media", to: "media" },
          { from: ".*",
            context: path.resolve(__dirname, "src", "media"),
            to: "media"},
          { from: "**/*",
            context: path.resolve(__dirname, "src", "media", "icon"),
            to: "media/icon" },
          { from: "blob/*.webp",
            context: path.resolve(__dirname, "src", "media", "img"),
            to: "media/img" },
          { from: "cases/*.webp",
            context: path.resolve(__dirname, "src", "media", "img"),
            to: "media/img" },
        // {from: "src/styles", to: "styles"}
          { from: "*.css(.*)?", 
            context: path.resolve(__dirname, "src", "styles"),
            to: "styles" },
        ],
      }),].concat(htmlPlugins).concat(devMode ? [] : [new MiniCssExtractPlugin()]),

    module: {
        rules: [
            {
                test: /\.m?js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                include: path.resolve(__dirname, 'src/styles'),
                use: [
                    // Creates `style` nodes from JS strings
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ]
    },

    // watch: true,
    // mode: 'development'
}