import { useEffect, useState, useMemo } from 'react';

import { TabsProps } from '@/env';

import styles from './index.module.scss';

const TABLE_START_INDEX: number = 1;
const DEFAULT_LEFT_RADIUS: string = '8px';
const DEFAULT_RIGHT_RADIUS: string = '8px';

const TrapezoidTab: React.FC<TabsProps> = ({ 
  tabList = [], 
  activeTab, 
  onTabChange, 
  rootStyle = {} 
}) => {
  const tabCount = tabList.length;
  const [style, setStyle] = useState({ ...rootStyle });

  // 处理 path 函数和 CSS 变量
  useEffect(() => {
    // 避免每次重新创建对象
    if ((!rootStyle['--tab-clip-path-before'] || !rootStyle['--tab-clip-path-after']) && rootStyle['--tabs-height']) {
      const tabsHeight = rootStyle['--tabs-height'];
      let numericValue = 0;
      
      // 提取数值和单位
      if (typeof tabsHeight === 'number') {
        numericValue = tabsHeight;
      } else if (typeof tabsHeight === 'string') {
        const match = tabsHeight.match(/^(\d+(?:\.\d+)?)([a-z%]*)$/i);
        if (match) {
          const unit = match[2].toLowerCase();
          // 处理不同单位
          numericValue = unit === 'rem' ? parseFloat(match[1]) * 16 : parseFloat(match[1]);
        }
      }
      
      // 创建新的样式对象，避免直接修改 rootStyle
      const newStyle = { ...rootStyle };
      
      // 设置 path 函数
      newStyle['--tab-clip-path-before'] = `path('M 0,${numericValue} C ${numericValue / 2},${numericValue} ${numericValue/2},0 ${numericValue},0 L ${numericValue}, ${numericValue} Z')`;
      newStyle['--tab-clip-path-after'] = `path('M 0,0 C ${numericValue/2},0 ${numericValue/2},${numericValue} ${numericValue},${numericValue} L 0, ${numericValue} Z')`;
      
      setStyle(newStyle);
    } else {
      setStyle({ ...rootStyle });
    }
  }, [rootStyle]); // 添加 rootStyle 作为依赖项

  // 计算当前激活的标签索引
  const activeTabIndex = useMemo(() => {
    if (!activeTab || !tabList?.length) return TABLE_START_INDEX;
    const index = tabList.findIndex(tab => tab.name === activeTab);
    return index === -1 ? TABLE_START_INDEX : index + TABLE_START_INDEX;
  }, [tabList, activeTab]);

  // 获取标签样式的辅助函数
  const getTabStyle = (index: number) => {
    const isFirst = index === TABLE_START_INDEX;
    const isLast = index === tabCount;
    const isActive = activeTabIndex === index;

    if (!isActive) return {};

    return {
      ['--active-before-display' as string]: isFirst ? 'none' : undefined,
      ['--active-left-radius' as string]: isFirst ? DEFAULT_LEFT_RADIUS : style['--active-left-radius'] || undefined,
      ['--active-after-display' as string]: isLast ? 'none' : undefined, 
      ['--active-right-radius' as string]: isLast ? DEFAULT_RIGHT_RADIUS : style['--active-right-radius'] || undefined,
    };
  };

  // 获取内容区域样式的辅助函数
  const getContentStyle = () => {
    if (activeTabIndex === TABLE_START_INDEX) {
      return { borderTopRightRadius: style['--content-radius'] || DEFAULT_RIGHT_RADIUS };
    } else if (activeTabIndex === tabCount) {
      return { borderTopLeftRadius: style['--content-radius'] || DEFAULT_LEFT_RADIUS };
    }
    return {};
  };

  return (
    <div 
      className={styles.elevatedSlopeTabsRoot}
      style={{ ...style, ['--tab-count' as string]: tabCount }}
    >
      <div className={styles.elevatedSlopeTabs}>
        <div className={styles.tabs}>
          {tabList.map((item, index) => (
            <div
              key={item.name || index + TABLE_START_INDEX}
              onClick={() => onTabChange(item.name)}
              className={`${styles.tab} ${activeTabIndex === index + TABLE_START_INDEX ? styles.active : ''}`}
              style={getTabStyle(index + TABLE_START_INDEX)}
            >
                {item?.render? item.render() : <div className={styles.tabLabel}>{item.label}</div>}
            </div>
          ))}
        </div>
        <div 
          className={styles.contentWrap} 
          style={getContentStyle()}
        />
      </div>
    </div>
  );
};

export default TrapezoidTab;