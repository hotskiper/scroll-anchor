import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

export default {
  input: 'src/index.js', // 打包入口
  output: { // 打包出口
    file: 'dist/scrollanchor-rollup.js', // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
    format: 'umd', // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
    name: 'ScrollAnchor'
  },
  plugins: [ // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块
    babel({ 
      // plugins: ['@babel/plugin-transform-runtime'],
      babelHelpers: 'bundled' 
    }),
    terser()
  ]
};