import React, { useState } from 'react';
import { SearchBar as NutSearchBar } from '@nutui/nutui-react-taro';

export interface SearchBarProps {
  /**
   * 占位提示文字
   */
  placeholder?: string;
  /**
   * 默认值
   */
  defaultValue?: string;
  /**
   * 最大长度
   */
  maxLength?: number;
  /**
   * 输入框内容变化时触发
   */
  onChange?: (value: string) => void;
  /**
   * 点击搜索按钮时触发
   */
  onSearch?: (value: string) => void;
  /**
   * 自定义类名
   */
  className?: string;
}

/**
 * 自定义搜索栏组件
 * @param props
 * @returns 
 */
export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = '请输入搜索关键词',
  defaultValue = '',
  maxLength = 100,
  onChange,
  onSearch,
  className = ''
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (val: string) => {
    setValue(val);
    onChange?.(val);
  };

  const handleSearch = () => {
    onSearch?.(value);
  };

  return (
    <NutSearchBar
      className={`custom-search-bar ${className}`}
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={handleChange}
      onSearch={handleSearch}
    />
  );
};

export default SearchBar; 