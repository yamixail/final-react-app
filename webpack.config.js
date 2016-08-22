var webpack = require('webpack')
var LiveReloadPlugin = require('webpack-livereload-plugin')

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/app',

    output: {
        path: 'dist',
        filename: 'bundle.js'
    },

    watch: !isProduction,

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },

    plugins: [],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    devServer: {
        inline: true,
        contentBase: 'src/',
        historyApiFallback: true
    }
}

// Production plugins only
if (isProduction) {
    module.exports.plugins.concat([
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ]);
} else {
    // Development plugins only
    module.exports.plugins.concat([
        new LiveReloadPlugin({
            port: process.env.PORT || 8080,
            appendScriptTag: true
        })
    ]);
}
