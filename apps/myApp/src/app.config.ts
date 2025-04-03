export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/zustand-demo/index',
    'pages/local-components/index',
    'pages/mock/index',
    'pages/login/index',
    'pages/my-service/index',
    'pages/profile/index',
    'pages/car-wash-verification/index'
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
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home.png'
      },
      {
        pagePath: 'pages/my-service/index',
        text: '服务',
        iconPath: 'assets/icons/service.png',
        selectedIconPath: 'assets/icons/service.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/icons/profile.png',
        selectedIconPath: 'assets/icons/profile.png'
      }
    ]
  }
})
