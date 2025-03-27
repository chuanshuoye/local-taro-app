import React from 'react';
import { View, Text } from '@tarojs/components';

export interface CardProps {
  title: string;
  content: string;
  footer?: string;
  borderColor?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  content,
  footer,
  borderColor = '#ddd'
}) => {
  const cardStyle = {
    border: `1px solid ${borderColor}`,
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  };

  const titleStyle = {
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
    fontWeight: 'bold',
    fontSize: '16px'
  };

  const contentStyle = {
    padding: '16px',
    fontSize: '14px',
    lineHeight: '1.5'
  };

  const footerStyle = {
    padding: '12px 16px',
    borderTop: '1px solid #eee',
    color: '#999',
    fontSize: '12px'
  };

  return (
    <View style={cardStyle}>
      <View style={titleStyle}>
        <Text>{title}</Text>
      </View>
      <View style={contentStyle}>
        <Text>{content}</Text>
      </View>
      {footer && (
        <View style={footerStyle}>
          <Text>{footer}</Text>
        </View>
      )}
    </View>
  );
};

export default Card; 