//webpack的配置文件
let htmlPlugin = require('./node_modules/html-webpack-plugin'); //创建一个在内存中生成html的插件
let path = require('path');
module.exports = {
  plugins: [
    //插件的配置节点
    new htmlPlugin({
      //创建一个在内存中生成html的插件(根据磁盘中的文件)
      template: path.join(__dirname, './src/index.html'), //指定模板文件的路径
      filename: 'index.html' //生成内存的页面filename要与磁盘上一致
    })
  ],
  module: {
    //模块的处理方式
    //匹配规则(第三方文件)
    rules: [
      //css less less配置
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      //图片文件
      {
        test: /\.(jpg|png|bmp|gif|jpeg)$/,
        use: 'url-loader?limit=8700&name=[hash:8]-[name].[ext]' //转为8位hash值加文件名.ext后缀名
      },
      //字体文件
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader'
      },
      //配置vue
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      //配置babel适用ES6语法
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
