import type { UserConfigExport } from "@tarojs/cli";
export default {
   logger: {
    quiet: false,
    stats: true
  },
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
    webpackChain(chain) {
      chain.module
          .rule('typescript')
          .test(/\.(ts|tsx)$/)
          .use('babel-loader')
          .loader('babel-loader')
          .options({ presets: ['@babel/preset-typescript', '@babel/preset-react'] });
    }
  }
} satisfies UserConfigExport<'webpack5'>
