import React, { createContext, useContext, ReactNode } from 'react';

interface StyleProviderProps {
  children: ReactNode;
  transformers?: Array<(css: string) => string>;
  rootValue?: number;
}

const StyleContext = createContext<StyleProviderProps>({
  rootValue: 16,
  transformers: [],
});

export const useStyle = () => useContext(StyleContext);

export const StyleProvider: React.FC<StyleProviderProps> = ({ 
  children, 
  transformers = [], 
  rootValue = 16 
}) => {
  return (
    <StyleContext.Provider value={{ transformers, rootValue }}>
      {children}
    </StyleContext.Provider>
  );
};

// 创建一个类似 Ant Design 的 px2remTransformer
export const px2remTransformer = (options: { rootValue: number }) => {
  return (css: string) => {
    // 这里可以实现 px 到 rem 的转换逻辑
    // 简单示例，实际上需要更复杂的实现
    return css;
  };
};