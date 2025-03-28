import React from 'react'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

interface Promotion {
  id: number
  title: string
  subTitle: string
  price?: string
  tag?: string
  bgColor: string
  imageUrl: string
}

interface PromotionSectionProps {
  title: string
  promotions: Promotion[]
}

const PromotionSection: React.FC<PromotionSectionProps> = ({ title, promotions }) => {
  return (
    <View className='promotion-section'>
      <View className='promotion-section-header'>
        <Text className='promotion-section-title'>{title}</Text>
        <Text className='promotion-section-more'>查看更多 ›</Text>
      </View>
      
      <View className='promotion-list'>
        {promotions.map(item => (
          <View 
            className='promotion-card' 
            key={item.id}
            style={{ backgroundColor: item.bgColor }}
          >
            <View className='promotion-card-content'>
              <Text className='promotion-card-title'>{item.title}</Text>
              <Text className='promotion-card-subtitle'>{item.subTitle}</Text>
              {item.price && (
                <Text className='promotion-card-price'>{item.price}</Text>
              )}
              {item.tag && (
                <View className='promotion-card-tag'>
                  <Text>{item.tag}</Text>
                </View>
              )}
            </View>
            {item.imageUrl && (
              <View className='promotion-card-image'>
                <Image src={item.imageUrl} mode='aspectFit' />
              </View>
            )}
          </View>
        ))}
      </View>
    </View>
  )
}

export default PromotionSection 