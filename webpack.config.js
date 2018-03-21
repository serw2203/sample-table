const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

const url = 'http://localhost:3001'

module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'index.js',
        publicPath: '/',
        path: path.join(__dirname, '/build')
    },

    plugins: [
        new CopyPlugin([{from: 'src/static'}])
    ],

    devtool: 'source-map',

    target: 'web',

    resolve: {
        extensions: ['.js', '.jsx']
    },

    devServer: {
        historyApiFallback: true,
        disableHostCheck: true,
        contentBase: 'build',
        host: '0.0.0.0',
        port: 9090,
        proxy: {
            ['/api/*']: {
                target: `${url}`,
                secure: false,
                changeOrigin: true,
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',

                    options: {
                        presets: [
                            'env', 'stage-0', 'react', 'stage-2'
                        ],
                        plugins: ['transform-react-jsx'],
                        compact: false
                    }
                }
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader':
            {
                test: /\.(js)$/,
                enforce: 'pre',
                use: ['source-map-loader']
            },
            // Style loader:
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: "style-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: "less-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|gif|eot|svg|ttf|woff(2)?|(jpeg|jpg)(\?[0-9]+)?)$/,
                use: [{loader: 'base64-inline-loader?limit32000&name=[name].[ext]'}]
            }
        ]
    }

}
