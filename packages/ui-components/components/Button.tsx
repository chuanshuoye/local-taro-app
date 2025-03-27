import React from 'react';
import { Button as NutButton } from '@nutui/nutui-react-taro';
// 直接定义ButtonProps而不是从@nutui导入类型
// import { ButtonProps as NutButtonProps } from '@nutui/nutui-react-taro/dist/types/packages/button/button.taro';

// 定义我们自己的ButtonProps接口
export interface ButtonProps {
  /**
   * 按钮类型
   */
  type?: 'default' | 'primary' | 'info' | 'warning' | 'danger' | 'success';
  /**
   * 按钮大小
   */
  size?: 'large' | 'normal' | 'small' | 'mini';
  /**
   * 是否为块级元素
   */
  block?: boolean;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义按钮风格
   */
  customStyle?: React.CSSProperties;
  /**
   * 点击事件
   */
  onClick?: (e: React.MouseEvent) => void;
  /**
   * 子元素
   */
  children?: React.ReactNode;
}

/**
 * 自定义按钮组件
 * @param props
 * @returns 
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const { 
    children, 
    className = '', 
    customStyle = {}, 
    ...restProps 
  } = props;

  return (
    <NutButton 
      className={`custom-button ${className}`}
      style={customStyle}
      {...restProps}
    >
      {children}
    </NutButton>
  );
};

export default Button; 