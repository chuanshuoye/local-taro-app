import React from 'react';
import { Button as NutButton } from '@nutui/nutui-react-taro';
import { ButtonProps as NutButtonProps } from '@nutui/nutui-react-taro/dist/types/packages/button/button.taro';

export interface ButtonProps extends NutButtonProps {
  /**
   * 自定义类名
   */
  className?: string;
  /**
   * 自定义按钮风格
   */
  customStyle?: React.CSSProperties;
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