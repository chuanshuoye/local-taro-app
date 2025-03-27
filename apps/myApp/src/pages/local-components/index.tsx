import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
// 导入本地组件 (通过软链接)
// 注意：需要先创建软链接才能正常导入
import { Button, Card } from '@local/ui-components'
import './index.scss'

const LocalComponentsPage: React.FC = () => {
  const [messageCount, setMessageCount] = useState(0)

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: '本地组件软链接示例'
    })
  }, [])

  const handleButtonClick = (type: string) => {
    Taro.showToast({
      title: `点击了${type}按钮`,
      icon: 'none'
    })
    setMessageCount(prev => prev + 1)
  }

  return (
    <View className='local-components-page'>
      <View className='header'>本地组件软链接示例</View>
      
      <View className='description'>
        本页面展示了如何通过软链接引用本地packages目录下的UI组件库。
        实际开发中可以将公共组件放到packages目录中，在不同的应用间共享。
      </View>
      
      <View className='section'>
        <View className='title'>Button 组件示例</View>
        <View className='button-section'>
          <Button 
            text='主要按钮' 
            type='primary' 
            size='medium' 
            onClick={() => handleButtonClick('主要')}
          />
          <Button 
            text='次要按钮' 
            type='secondary' 
            size='medium'
            onClick={() => handleButtonClick('次要')}
          />
          <Button 
            text='危险按钮' 
            type='danger' 
            size='medium'
            onClick={() => handleButtonClick('危险')}
          />
        </View>
        
        <View className='button-section'>
          <Button 
            text='小按钮' 
            type='primary' 
            size='small'
            onClick={() => handleButtonClick('小')}
          />
          <Button 
            text='中按钮' 
            type='primary' 
            size='medium'
            onClick={() => handleButtonClick('中')}
          />
          <Button 
            text='大按钮' 
            type='primary' 
            size='large'
            onClick={() => handleButtonClick('大')}
          />
        </View>
      </View>
      
      <View className='section'>
        <View className='title'>Card 组件示例</View>
        <View className='content'>
          <Card 
            title='标准卡片' 
            content='这是一个标准卡片的内容，展示了基本用法。' 
            footer='卡片底部信息'
          />
          
          <Card 
            title='定制边框颜色' 
            content='这个卡片使用了自定义的边框颜色。' 
            footer='2024-03-27'
            borderColor='#1890ff'
          />
          
          <Card 
            title='消息通知卡片' 
            content={`您有 ${messageCount} 条新消息，点击上方按钮可增加消息数量。`} 
            borderColor={messageCount > 0 ? '#ff4d4f' : '#ddd'}
          />
        </View>
      </View>
    </View>
  )
}

export default LocalComponentsPage 