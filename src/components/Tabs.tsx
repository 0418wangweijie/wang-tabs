import React, {JSX, useMemo} from 'react';
import styles from './Tabs.module.scss';

interface Tab {
    name: string;
    label: string;
    render: JSX.Element;
}

interface TabsProps {
    tabList: Tab[];
    activeTab: string;
    onTabChange: (tabName: string) => void;
}

const Tabs: React.FC<TabsProps> = ({tabList, activeTab, onTabChange}) => {

    const activeTabIndex = useMemo(() =>
            tabList?.findIndex((tab) => tab.name === activeTab)
        , [tabList, activeTab]);

    return (
        <div className={styles.tabListCnt}>
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
                        '--tab-width': `${100 / tabList.length}%}`
                    }}
                >
                    <div className={styles.left}></div>
                    <div className={styles.right}></div>
                </div>
            </div>
        </div>
    );
};

export default Tabs;

