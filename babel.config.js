const { remove } = require("nprogress");

//在图形ui build界面中输出里：$ vue-cli-service build --mode production --target app --dashboard
const prodPlugins = [] //定义一个数组
//判断当前的编译模式 如果等于production,移除console
if(process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}


module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ...prodPlugins,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
