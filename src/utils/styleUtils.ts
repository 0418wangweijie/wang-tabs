/**
 * 将样式单位转换为 rem
 * @param styleObj 样式对象
 * @returns 转换后的样式对象
 */
export const convertStyleUnitsToRem = (styleObj: Record<string, any>): Record<string, any> => {
  if (!styleObj) return {};
  
  const newStyle = { ...styleObj };
  const rootValue = parseInt(import.meta.env?.PX_TO_REM_ROOT_VALUE || '16', 10);
  
  Object.entries(newStyle).forEach(([key, value]) => {
    if (typeof value !== 'string') return;
    
    const match = value.match(/^(\d+(?:\.\d+)?)([a-z%]*)$/i);
    if (!match) return;
    
    const numValue = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    
    if (unit === 'px' || unit === '') {
      newStyle[key] = `${numValue / rootValue}rem`;
    }
  });
  
  return newStyle;
};

/**
 * 从值中提取数值
 * @param value 包含单位的值
 * @returns 提取的数值
 */
export const extractNumericValue = (value: string | number): number => {
  if (typeof value === 'number') return value;
  
  const match = value.match(/^(\d+(?:\.\d+)?)([a-z%]*)$/i);
  if (!match) return 0;
  
  const numValue = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  const rootValue = parseInt(import.meta.env?.PX_TO_REM_ROOT_VALUE || '16', 10);
  
  return unit === 'rem' ? numValue * rootValue : numValue;
};

/**
 * 生成路径函数
 * @param height 高度值
 * @returns 包含前后路径的对象
 */
export const generateClipPaths = (height: number): { before: string, after: string } => {
  return {
    before: `path('M 0,${height} C ${height / 2},${height} ${height/2},0 ${height},0 L ${height}, ${height} Z')`,
    after: `path('M 0,0 C ${height/2},0 ${height/2},${height} ${height},${height} L 0, ${height} Z')`
  };
};