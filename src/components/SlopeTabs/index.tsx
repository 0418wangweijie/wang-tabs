import React, {useMemo} from 'react';

import {TabsProps} from '@/env';

import styles from './index.module.scss';

const SlopeTabs: React.FC<TabsProps> = ({tabList, activeTab, onTabChange,style,rootStyle}) => {

    const activeTabIndex = useMemo(() =>
            tabList?.findIndex((tab) => tab.name === activeTab)
        , [tabList, activeTab]);

    return (
        <div className={styles.slopeTabsRoot} style={rootStyle}>
            <div className={styles.tabListCnt} style={style}>
            <div className={styles.tabList}>
                {tabList.map((tab, index) => (
                    <div
                        key={index}
                        className={styles.tabItem}
                        onClick={() => onTabChange(tab.name)}
                    >
                        {tab?.render ? tab.render() :<div>{tab.label}</div>}
                    </div>
                ))}
                <div
                    className={styles.tabSelected}
                    style={{
                        transform: `translateX(${activeTabIndex * 100}%)`,
                        width:`${100/tabList.length}%`
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

export default SlopeTabs;

