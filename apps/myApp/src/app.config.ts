export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/zustand-demo/index',
    'pages/local-components/index',
    'pages/mock/index',
    'pages/login/index',
    'pages/my-service/index',
    'pages/profile/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1296db',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: '',
        selectedIconPath: ''
      },
      {
        pagePath: 'pages/zustand-demo/index',
        text: '状态管理',
        iconPath: '',
        selectedIconPath: ''
      },
      {
        pagePath: 'pages/local-components/index',
        text: '组件',
        iconPath: '',
        selectedIconPath: ''
      },
      {
        pagePath: 'pages/mock/index',
        text: '数据',
        iconPath: '',
        selectedIconPath: ''
      },
      {
        pagePath: 'pages/profile/index',
        text: '个人中心',
        iconPath: '',
        selectedIconPath: ''
      }
    ]
  }
})
