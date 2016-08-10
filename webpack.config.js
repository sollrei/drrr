/**
 *
 *
 * @update: 15/12/5
 * @author: zhangdan
 *
 */
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
    //插件项
    plugins: [commonsPlugin],
    //页面入口文件配置
    //entry: {
    //    index : './js/main.js',
    //    svg: './js/svg.js',
    //    sock: './js/socket.js'
    //},
    entry: './js/message.js',
    //入口文件输出配置
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'}
        ]
    }
    //,
    ////其它解决方案配置
    //resolve: {
    //    root: 'E:/github/flux-example/src', //绝对路径
    //    extensions: ['', '.js', '.json', '.scss'],
    //    alias: {
    //        AppStore : 'js/stores/AppStores.js',
    //        ActionType : 'js/actions/ActionType.js',
    //        AppAction : 'js/actions/AppAction.js'
    //    }
    //}
};