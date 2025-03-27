module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
}; 