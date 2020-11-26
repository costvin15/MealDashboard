const NodemanWebpackPlugin = require("nodemon-webpack-plugin");
const NodeExternals = require("webpack-node-externals");

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    target: "node",
    externals: [
        NodeExternals(),
    ],
    plugins: [
        new NodemanWebpackPlugin(),
    ],
};