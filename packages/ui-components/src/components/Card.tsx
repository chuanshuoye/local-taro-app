import React from 'react';
import { View, Text } from '@tarojs/components';

export interface CardProps {
  /**
   * 卡片标题
   */
  title?: string;
  /**
   * 卡片描述
   */
  description?: string;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * 卡片内容
   */
  children?: React.ReactNode;
}

/**
 * 简单的卡片组件
 * @param props 
 * @returns 
 */
export const Card: React.FC<CardProps> = ({
  title,
  description,
  className = '',
  style = {},
  children
}) => {
  return (
    <View className={`custom-card ${className}`} style={style}>
      {title && <View className="custom-card-title">{title}</View>}
      {description && <View className="custom-card-description">{description}</View>}
      <View className="custom-card-content">
        {children}
      </View>
    </View>
  );
};

export default Card;