var webpack = require('webpack')

var isProduction = process.env.NODE_ENV === 'production';

// Production plugins only
if (isProduction) {
    var productionPlugins = [
        new webpack.DefinePlugin({
            'process.env': {'NODE_ENV': JSON.stringify('production')}
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {warnings: false},
            output: {comments: false}
        })
    ]
}

module.exports = {
    entry: './src/app',

    output: {
        path: 'dist',
        filename: 'bundle.js'
    },

    watch: !isProduction,
    devtool: !isProduction && 'cheap-module-eval-source-map',

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },

    plugins: productionPlugins || [],

    resolve: {
        extensions: ['', '.js', '.jsx']
    },

    devServer: {
        inline: true,
        contentBase: 'src/',
        historyApiFallback: true
    }
}
