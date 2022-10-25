const path = require('path');

module.exports = {
    entry: './components/js/index.js',
    
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '')
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
        ]
    },

    watch: true,
    mode: 'development'
}