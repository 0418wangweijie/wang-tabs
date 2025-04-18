import React, {useMemo} from 'react';

import {Tab, TabsProps} from '@/env';

import styles from './index.module.scss';

const pxToRem = (px: number, base = 28) => `${px / base}rem`;

const ElevatedSlopeTabs: React.FC<TabsProps> = ({tabList, activeTab, onTabChange, style, rootStyle}) => {

    const convertedStyle = useMemo(() => {
        if (!style) return {};
        return Object.entries(style).reduce((acc, [key, value]) => {
            if (typeof value === 'string' && value.endsWith('px')) {
                const pxValue = parseFloat(value);
                acc[key] = pxToRem(pxValue);
            } else {
                acc[key] = value;
            }
            return acc;
        }, {} as React.CSSProperties);
    }, [style]);

    const activeTabIndex = useMemo(() =>
            tabList?.findIndex((tab: { name: any; }) => tab.name === activeTab)
        , [tabList, activeTab]);

    return (
        <div className={styles.elevatedSlopeTabsRoot} style={rootStyle}>
            <div className={styles.tabListCnt} style={convertedStyle}>
                <div className={styles.tabList}>
                    {tabList.map((tab: Tab, index: number) => (
                        <div
                            key={index}
                            className={`${styles.tabItem} ${activeTabIndex === index ? styles.selectTabItem : ''}`}
                            onClick={() => onTabChange(tab.name)}
                        >
                            {tab?.render ? tab.render() : <div className={styles.tabLabel}>{tab.label}</div>}
                        </div>
                    ))}
                    <div
                        className={styles.tabSelected}
                        style={{
                            left: `calc(${(activeTabIndex * 100) / tabList.length}% - ${(120 / tabList.length - 100 / tabList.length) / 2}%)`, // 调整 left 计算方式
                            width: `${120 / tabList.length}%`, // 增加宽度比例
                        }}
                    >
                        <div className={styles.left}></div>
                        <div className={styles.right}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ElevatedSlopeTabs;

