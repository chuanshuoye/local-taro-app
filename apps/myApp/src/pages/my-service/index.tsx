import React, { useState } from 'react'
import { View, Text, Input } from '@tarojs/components'
import { Button, Cell, Tabs } from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import './index.scss'

const MyService = () => {
  const [activeTab, setActiveTab] = useState<string>('0')
  const [exchangeCode, setExchangeCode] = useState<string>('')
  
  // 假数据
  const serviceList = [
    {
      id: 1,
      title: '标题文字',
      subtitle: '副标题',
      status: 'pending' // 待使用
    },
    {
      id: 2,
      title: '标题文字',
      subtitle: '副标题',
      status: 'pending' // 待使用
    },
    {
      id: 3,
      title: '标题文字',
      subtitle: '副标题',
      status: 'used' // 已使用
    },
    {
      id: 4,
      title: '标题文字',
      subtitle: '副标题',
      status: 'expired' // 已过期
    }
  ]

  const handleExchange = () => {
    if (!exchangeCode) {
      Taro.showToast({
        title: '请输入兑换码',
        icon: 'none'
      })
      return
    }
    
    // 这里添加兑换逻辑
    console.log('兑换码:', exchangeCode)
    Taro.showToast({
      title: '兑换成功',
      icon: 'success'
    })
    setExchangeCode('')
  }

  const filterServicesByStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      '0': 'pending',
      '1': 'used',
      '2': 'expired'
    }
    return serviceList.filter(item => item.status === statusMap[activeTab])
  }

  const handleItemClick = (id: number) => {
    console.log('点击了服务项:', id)
    // 这里可以添加跳转到详情页的逻辑
  }

  return (
    <View className='my-service-page'>
      <View className='user-info'>
        <View className='avatar'></View>
        <View className='info'>
          <Text className='phone'>188****5678</Text>
          <Text className='days'>已陪伴XX天</Text>
        </View>
      </View>

      <View className='service-title'>我的服务</View>

      <View className='exchange-code-section'>
        <Input
          className='code-input'
          placeholder='请输入兑换码'
          value={exchangeCode}
          onInput={(e) => setExchangeCode(e.detail.value)}
        />
        <Button 
          type='primary' 
          className='exchange-btn' 
          onClick={handleExchange}
        >
          立即兑换
        </Button>
      </View>

      <View className='service-tabs'>
        <Tabs 
          value={activeTab}
          onChange={(value) => setActiveTab(value.toString())}
        >
          <Tabs.TabPane title='待使用' value='0' />
          <Tabs.TabPane title='已使用' value='1' />
          <Tabs.TabPane title='已过期' value='2' />
        </Tabs>
      </View>

      <View className='service-list'>
        {filterServicesByStatus(activeTab).map(item => (
          <Cell
            key={item.id}
            title={
              <View className='service-item-content'>
                <View className='service-item-image'></View>
                <View className='service-item-info'>
                  <Text className='service-item-title'>{item.title}</Text>
                  <Text className='service-item-subtitle'>{item.subtitle}</Text>
                </View>
              </View>
            }
            onClick={() => handleItemClick(item.id)}
            className='service-item'
          />
        ))}
      </View>
    </View>
  )
}

export default MyService 