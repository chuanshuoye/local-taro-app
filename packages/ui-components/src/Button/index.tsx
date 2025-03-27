import React from 'react';
import { View, Text } from '@tarojs/components';

export interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  text,
  onClick
}) => {
  const getTypeStyle = () => {
    switch (type) {
      case 'primary':
        return { backgroundColor: '#1890ff', color: '#fff' };
      case 'secondary':
        return { backgroundColor: '#f0f0f0', color: '#333' };
      case 'danger':
        return { backgroundColor: '#ff4d4f', color: '#fff' };
      default:
        return { backgroundColor: '#1890ff', color: '#fff' };
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { padding: '4px 8px', fontSize: '12px' };
      case 'medium':
        return { padding: '8px 16px', fontSize: '14px' };
      case 'large':
        return { padding: '12px 20px', fontSize: '16px' };
      default:
        return { padding: '8px 16px', fontSize: '14px' };
    }
  };

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    ...getTypeStyle(),
    ...getSizeStyle()
  };

  return (
    <View 
      style={buttonStyle} 
      onClick={onClick}
    >
      <Text>{text}</Text>
    </View>
  );
};

export default Button; 