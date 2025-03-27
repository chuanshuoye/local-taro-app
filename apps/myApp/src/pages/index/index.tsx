import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { Button, ConfigProvider, Tabs } from '@nutui/nutui-react-taro'
import enUS from '@nutui/nutui-react-taro/dist/locales/en-US'
import zhCN from '@nutui/nutui-react-taro/dist/locales/zh-CN'
import TodoList from '../../components/TodoList'
import { formatDate } from '@local-taro-app/utils'
import './index.scss'

function Index() {
  const [locale, setLocale] = useState(zhCN)
  const localeKey = locale === zhCN ? 'zhCN' : 'enUS'
  const [translated] = useState({
    zhCN: {
      welcome: '欢迎使用 NutUI React 开发 Taro 多端项目。',
      button: '使用英文',
      today: '今天是',
    },
    enUS: {
      welcome: 'Welcome to use NutUI React to develop Taro multi-terminal projects.',
      button: 'Use Chinese',
      today: 'Today is',
    },
  })
  const handleSwitchLocale = () => {
    setLocale(locale === zhCN ? enUS : zhCN)
  }

  return (
    <ConfigProvider locale={locale}>
      <View className='nutui-react-demo'>
        <View className='welcome-header'>
          <View>{translated[localeKey].welcome}</View>
          <View>{translated[localeKey].today} {formatDate(new Date())}</View>
          <Button type='primary' onClick={handleSwitchLocale} className='locale-btn'>
            {translated[localeKey].button}
          </Button>
        </View>

        <Tabs defaultValue='0' className='main-tabs'>
          <Tabs.TabPane title="待办事项" value="0">
            <TodoList />
          </Tabs.TabPane>
          <Tabs.TabPane title="关于" value="1">
            <View className='about-content'>
              <View className='about-item'>
                <View className='label'>项目名称:</View>
                <View className='value'>Taro多端应用</View>
              </View>
              <View className='about-item'>
                <View className='label'>技术栈:</View>
                <View className='value'>Taro、NutUI、Zustand、Monorepo</View>
              </View>
              <View className='about-item'>
                <View className='label'>版本:</View>
                <View className='value'>1.0.0</View>
              </View>
            </View>
          </Tabs.TabPane>
        </Tabs>
      </View>
    </ConfigProvider>
  )
}

export default Index
