import React from 'react';
import { View, Text, Image } from '@tarojs/components';

export interface CardProps {
  /**
   * 卡片标题
   */
  title: string;
  /**
   * 卡片描述
   */
  description?: string;
  /**
   * 图片URL
   */
  imageUrl?: string;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 点击事件
   */
  onClick?: () => void;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 自定义卡片组件
 * @param props
 * @returns 
 */
export const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  className = '',
  onClick,
  children
}) => {
  return (
    <View 
      className={`custom-card ${className}`}
      onClick={onClick}
    >
      {imageUrl && (
        <View className="custom-card__image-container">
          <Image 
            className="custom-card__image" 
            src={imageUrl}
            mode="aspectFill"
          />
        </View>
      )}
      <View className="custom-card__content">
        <Text className="custom-card__title">{title}</Text>
        {description && (
          <Text className="custom-card__description">{description}</Text>
        )}
        {children && (
          <View className="custom-card__body">
            {children}
          </View>
        )}
      </View>
    </View>
  );
};

export default Card; 