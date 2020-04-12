//webpack的配置文件
//热更新第二步
let webpack = require('webpack');
let htmlPlugin = require('./node_modules/html-webpack-plugin'); //创建一个在内存中生成html的插件
let path = require('path');
module.exports = {
  //这是配置server的第二种方式,相对来说麻烦点
  devServer: {
    open: true,
    port: 3500,
    contentBase: 'src',
    hot: true, //热更新第一步,
    /* before函数也可创建服务器接口
    before(app) {
      app.get('/test/get', function(req, res) {
        res.json({ get: 'response get' });
      });
    },
    */
  },
  plugins: [
    //配置插件的节点
    new webpack.HotModuleReplacementPlugin(), //new一个热更新的模板对象  启动热更新(热更新第三步)

    //插件的配置节点
    new htmlPlugin({
      //创建一个在内存中生成html的插件(根据磁盘中的文件)
      template: path.join(__dirname, './src/index.html'), //指定模板文件的路径
      filename: 'index.html', //生成内存的页面filename要与磁盘上一致
    }),
  ],
  module: {
    //模块的处理方式
    //匹配规则(第三方文件)
    rules: [
      //css less less配置
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      //图片文件
      {
        test: /\.(jpg|png|bmp|gif|jpeg)$/,
        use: 'url-loader?limit=8700&name=[hash:8]-[name].[ext]', //转为8位hash值加文件名.ext后缀名
      },
      //字体文件
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader',
      },
      //配置vue
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      //配置babel适用ES6语法
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
