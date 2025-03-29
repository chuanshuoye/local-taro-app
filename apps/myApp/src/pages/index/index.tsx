import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import { ConfigProvider } from '@nutui/nutui-react-taro'
import zhCN from '@nutui/nutui-react-taro/dist/locales/zh-CN'
import './index.scss'

// 组件导入
import Header from '../../components/Header'
import LocationPicker from '../../components/LocationPicker'
import Banner from '../../components/Banner'
import ServiceGrid from '../../components/ServiceGrid'
import PromotionSection from '../../components/PromotionSection'
import TabBar from '../../components/TabBar'

function Index() {
  // 地理位置数据
  const location = {
    city: '上海城区松江区',
    onChange: () => {
      console.log('切换位置')
    }
  }

  // 服务项目第一行数据
  const servicesRow1 = [
    { id: 1, icon: '🚗', title: '标准洗车' },
    { id: 2, icon: '🔧', title: '车辆保养' },
    { id: 3, icon: '🎨', title: '漆面修复' },
    { id: 4, icon: '🍺', title: '酒后代驾' },
    { id: 5, icon: '🚕', title: '出行打车' }
  ]
  
  // 服务项目第二行数据
  const servicesRow2 = [
    { id: 6, icon: '✨', title: '精致洗车' },
    { id: 7, icon: '🌟', title: '车辆打蜡' },
    { id: 8, icon: '❄️', title: '空调清洗' },
    { id: 9, icon: '📝', title: '车检代办' },
    { id: 10, icon: '🅿️', title: '机场停车' }
  ]

  // 优惠活动数据
  const promotions = [
    {
      id: 1,
      title: '特惠保养套餐',
      subTitle: '美孚 | 壳牌 | 嘉实多 | 胜牌',
      price: '全合成218元起',
      bgColor: '#EBF1FF',
      imageUrl: ''
    },
    {
      id: 2, 
      title: '滴滴出行优惠天天领',
      subTitle: '最高100元优惠券包',
      tag: '限时限量放送',
      bgColor: '#FFF5E6',
      imageUrl: ''
    },
    {
      id: 3,
      title: '移动积分超值兑',
      subTitle: '积分当钱花',
      tag: '前往兑换',
      bgColor: '#FFF0F0',
      imageUrl: ''
    }
  ]
  
  return (
    <ConfigProvider locale={zhCN}>
      <View className='car-service-page'>
        <Header title='小鲨车服' />
        <LocationPicker location={location} />
        <Banner />
        
        <View className='service-container'>
          <ServiceGrid title='' services={servicesRow1} />
          <ServiceGrid title='' services={servicesRow2} />
        </View>
        
        <PromotionSection title='超值特惠' promotions={promotions} />
        
        {process.env.TARO_ENV === 'h5' && <TabBar />}
      </View>
    </ConfigProvider>
  )
}

export default Index
