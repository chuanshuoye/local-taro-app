import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { Button, ConfigProvider, TextArea, Dialog } from '@nutui/nutui-react-taro'
import enUS from '@nutui/nutui-react-taro/dist/locales/en-US'
import zhCN from '@nutui/nutui-react-taro/dist/locales/zh-CN'
import Taro from '@tarojs/taro'
import Button1 from '../../components/Button'
import './index.scss'

function Index() {
  const [locale, setLocale] = useState(zhCN)
  const localeKey = locale === zhCN ? 'zhCN' : 'enUS'
  const [visible, setVisible] = useState(false)
  const [translated] = useState({
    zhCN: {
      welcome: '欢迎使用 NutUI React 开发 Taro 多端项目。',
      button: '使用英文',
      open: '点击打开',
      zustandDemo: '查看 Zustand 示例',
      localComponents: '查看本地组件示例'
    },
    enUS: {
      welcome: 'Welcome to use NutUI React to develop Taro multi-terminal projects.',
      button: 'Use Chinese',
      open: 'Click Me',
      zustandDemo: 'View Zustand Demo',
      localComponents: 'View Local Components'
    },
  })
  
  const handleSwitchLocale = () => {
    setLocale(locale === zhCN ? enUS : zhCN)
  }
  
  const navigateToZustandDemo = () => {
    Taro.navigateTo({
      url: '/pages/zustand-demo/index'
    })
  }
  
  const navigateToLocalComponents = () => {
    Taro.navigateTo({
      url: '/pages/local-components/index'
    })
  }
  
  return (
    <ConfigProvider locale={locale}>
      <View className='nutui-react-demo'>
        <View>{translated[localeKey].welcome}</View>
        <Button1 text='点击我' onClick={() => console.log('按钮被点击了')} />
        <View>
          <Button type='primary' onClick={handleSwitchLocale}>
            {translated[localeKey].button}
          </Button>
          <Button type='success' onClick={() => setVisible(true)}>
            {translated[localeKey].open}
          </Button>
          <Button type='info' style={{ marginTop: '10px' }} onClick={navigateToZustandDemo}>
            {translated[localeKey].zustandDemo}
          </Button>
          <Button type='warning' style={{ marginTop: '10px' }} onClick={navigateToLocalComponents}>
            {translated[localeKey].localComponents}
          </Button>
          <Dialog
            visible={visible}
            onConfirm={() => setVisible(false)}
            onCancel={() => setVisible(false)}>
            {translated[localeKey].welcome}
          </Dialog>
          <TextArea disabled showCount maxLength={20} />
        </View>
      </View>
    </ConfigProvider>
  )
}

export default Index
