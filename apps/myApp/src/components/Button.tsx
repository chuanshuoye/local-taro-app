import React from 'react';
import { View, Text } from '@tarojs/components';

export interface ButtonProps {
  text: string;
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  type = 'primary',
  size = 'medium',
  onClick,
  disabled = false
}) => {
  // 根据类型设置不同的背景色
  const getBackgroundColor = () => {
    switch (type) {
      case 'primary':
        return '#1890ff';
      case 'secondary':
        return '#ffffff';
      case 'danger':
        return '#ff4d4f';
      default:
        return '#1890ff';
    }
  };

  // 根据类型设置不同的文字颜色
  const getTextColor = () => {
    return type === 'secondary' ? '#1890ff' : '#ffffff';
  };

  // 根据尺寸设置不同的内边距和字体大小
  const getPadding = () => {
    switch (size) {
      case 'small':
        return '4px 8px';
      case 'medium':
        return '8px 16px';
      case 'large':
        return '12px 24px';
      default:
        return '8px 16px';
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return '12px';
      case 'medium':
        return '14px';
      case 'large':
        return '16px';
      default:
        return '14px';
    }
  };

  const buttonStyle = {
    backgroundColor: getBackgroundColor(),
    color: getTextColor(),
    padding: getPadding(),
    fontSize: getFontSize(),
    borderRadius: '4px',
    border: type === 'secondary' ? '1px solid #1890ff' : 'none',
    display: 'inline-block',
    textAlign: 'center' as const,
    cursor: 'pointer',
    opacity: disabled ? 0.5 : 1,
    margin: '5px'
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <View style={buttonStyle} onClick={handleClick}>
      <Text>{text}</Text>
    </View>
  );
};

export default Button;
