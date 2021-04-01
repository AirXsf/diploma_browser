/*
 * @Date: 2020-04-02 20:39:04
 * @LastEditors: wangbiao_isf_ah
 * @Description: webpack配置文件
 * @LastEditTime: 2021-04-01 10:26:14
 */
//webpack的配置文件
//创建一个在内存中生成html的插件  
let htmlPlugin = require('./node_modules/html-webpack-plugin');
let path = require('path');
module.exports = {
  //入口文件(可指定多个html和js);
  entry: {
    one: path.join(__dirname, './src/index.js'),
    two: path.join(__dirname, './src/goods.js'),
    three: path.join(__dirname, './src/detail.js'),
  },
  //出口文件(只要几个即可,前面为name序号)
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].main.js',
  },
  plugins: [
    //插件的配置节点
    new htmlPlugin({
      //创建一个在内存中生成html的插件(根据磁盘中的文件)
      //指定模板文件的路径
      template: path.join(__dirname, './src/index.html'),
      //生成内存的页面filename要与磁盘上一致
      filename: 'index.html',
      hash: true,
      chunks: ['one'],
    }),
    //打包多个html文件
    new htmlPlugin({
      template: path.join(__dirname, './src/goods.html'),
      filename: 'goods.html',
      hash: true,
      chunks: ['two'],
    }),
    new htmlPlugin({
      template: path.join(__dirname, './src/detail.html'),
      filename: 'detail.html',
      hash: true,
      chunks: ['three'],
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
