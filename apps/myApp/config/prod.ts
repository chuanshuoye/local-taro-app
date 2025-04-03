import type { UserConfigExport } from "@tarojs/cli";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default {
  mini: {
    webpackChain(chain) {
      chain.module
          .rule('typescript')
          .test(/\.(ts|tsx)$/)
          .use('babel-loader')
          .loader('babel-loader')
          .options({ presets: ['@babel/preset-typescript', '@babel/preset-react'] });
    }
  },
  h5: {
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    webpackChain(chain) {
      chain.module
          .rule('typescript')
          .test(/\.(ts|tsx)$/)
          .use('babel-loader')
          .loader('babel-loader')
          .options({ presets: ['@babel/preset-typescript', '@babel/preset-react'] });
          
      // 优化分包配置
      chain.optimization.splitChunks({
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        minChunks: 1,
        cacheGroups: {
          // 提取 node_modules 中的公共模块
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            enforce: true
          },
          // 提取通用工具函数
          utils: {
            test: /[\\/]utils[\\/]/,
            name: 'common-utils',
            minChunks: 1,
            priority: 5,
            reuseExistingChunk: true
          },
          // 提取公共组件库
          components: {
            test: /[\\/]packages[\\/]ui-components[\\/]/,
            name: 'common-components',
            minChunks: 1,
            priority: 5,
            reuseExistingChunk: true
          },
          // 提取其他公共代码
          common: {
            name: 'common',
            minChunks: 2,
            priority: 0,
            reuseExistingChunk: true
          }
        }
      });
      
      /**
       * 使用 webpack-bundle-analyzer 插件对打包体积进行分析
       * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
       */
      chain.plugin('analyzer')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'report.html'
        }]);
    }
  }
} satisfies UserConfigExport<'webpack5'>
