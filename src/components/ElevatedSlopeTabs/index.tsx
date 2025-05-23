import { useEffect, useState, useMemo, useRef } from "react";

import { TabsProps } from "@/env";
import {
  convertStyleUnitsToRem,
  extractNumericValue,
  generateClipPaths,
} from "@/utils/styleUtils";
import { isEqual } from "@/utils";

import styles from "./index.module.scss";

const TABLE_START_INDEX: number = 1;
const DEFAULT_LEFT_RADIUS: string = "0.5rem";
const DEFAULT_RIGHT_RADIUS: string = "0.5rem";

const ElevatedSlopeTabs: React.FC<TabsProps> = ({
  tabList = [],
  activeTab,
  onTabChange,
  rootStyle = {},
  children,
}) => {
  const tabCount = tabList.length;

  // 使用 useMemo 缓存转换后的初始样式
  const initialStyle = useMemo(
    () => convertStyleUnitsToRem({ ...rootStyle }),
    [] // 只在组件挂载时计算一次
  );

  const [style, setStyle] = useState(initialStyle);

  // 处理 path 函数和 CSS 变量
  // 使用 useRef 存储上一次的路径函数
  const prevPathsRef = useRef({
    before: "",
    after: "",
  });
  // 使用 useRef 存储上一次的 rootStyle
  const prevRootStyleRef = useRef(rootStyle);

  useEffect(() => {
    // 比较当前 rootStyle 和上一次的引用
    const isRootStyleChanged = !isEqual(rootStyle, prevRootStyleRef.current);

    if (!isRootStyleChanged) return;

    // 更新引用
    prevRootStyleRef.current = rootStyle;

    const convertedStyle = convertStyleUnitsToRem({ ...rootStyle });

    // 如果没有高度设置，直接使用转换后的样式
    if (!convertedStyle["--tabs-height"]) {
      setStyle(convertedStyle);
      return;
    }

    // 使用 ref 存储的值进行比较
    if (
      convertedStyle["--tab-clip-path-before"] &&
      convertedStyle["--tab-clip-path-after"] &&
      convertedStyle["--tab-clip-path-before"] ===
        prevPathsRef.current.before &&
      convertedStyle["--tab-clip-path-after"] === prevPathsRef.current.after
    ) {
      setStyle(convertedStyle);
      return;
    }

    // 计算路径函数
    const tabsHeight = convertedStyle["--tabs-height"];
    const numericValue = extractNumericValue(tabsHeight);

    if (numericValue > 0) {
      const paths = generateClipPaths(numericValue);

      // 更新 ref
      prevPathsRef.current = {
        before: paths.before,
        after: paths.after,
      };

      setStyle({
        ...convertedStyle,
        "--tab-clip-path-before": paths.before,
        "--tab-clip-path-after": paths.after,
      });
    } else {
      setStyle(convertedStyle);
    }
  }, [rootStyle]); // 只依赖 rootStyle

  // 计算当前激活的标签索引
  const activeTabIndex = useMemo(() => {
    if (!activeTab || !tabList?.length) return TABLE_START_INDEX;
    const index = tabList.findIndex((tab) => tab.name === activeTab);
    return index === -1 ? TABLE_START_INDEX : index + TABLE_START_INDEX;
  }, [tabList, activeTab]);

  // 获取标签样式的辅助函数
  const getTabStyle = (index: number): Record<string, any> => {
    const isFirst = index === TABLE_START_INDEX;
    const isLast = index === tabCount;
    const isActive = activeTabIndex === index;

    if (!isActive) return {};

    return {
      "--active-before-display": isFirst ? "none" : undefined,
      "--active-left-radius": isFirst
        ? DEFAULT_LEFT_RADIUS
        : style["--active-left-radius"] || undefined,
      "--active-after-display": isLast ? "none" : undefined,
      "--active-right-radius": isLast
        ? DEFAULT_RIGHT_RADIUS
        : style["--active-right-radius"] || undefined,
    };
  };

  // 获取内容区域样式的辅助函数
  const getContentStyle = useMemo(() => {
    if (activeTabIndex === TABLE_START_INDEX) {
      return {
        borderTopRightRadius: style["--content-radius"] || DEFAULT_RIGHT_RADIUS,
        borderTopLeftRadius: 0,
      };
    }
    if (activeTabIndex === tabCount) {
      return {
        borderTopLeftRadius: style["--content-radius"] || DEFAULT_LEFT_RADIUS,
        borderTopRightRadius: 0,
      };
    }
    return {};
  }, [activeTabIndex, tabCount, style]);

  return (
    <div
      className={styles.elevatedSlopeTabsRoot}
      style={{ ...style, ["--tab-count" as string]: tabCount }}
    >
      <div className={styles.elevatedSlopeTabs}>
        <div className={styles.tabs}>
          {tabList.map((item, index) => (
            <div
              key={item.name || index + TABLE_START_INDEX}
              onClick={() => onTabChange(item.name)}
              className={`${styles.tab} ${
                activeTabIndex === index + TABLE_START_INDEX
                  ? styles.active
                  : ""
              }`}
              style={getTabStyle(index + TABLE_START_INDEX)}
            >
              {item?.render ? (
                item.render()
              ) : (
                <div className={styles.tabLabel}>{item.label}</div>
              )}
            </div>
          ))}
        </div>
        {children ? (
          children
        ) : (
          <div className={styles.contentWrap} style={getContentStyle}>
            {tabList[activeTabIndex - TABLE_START_INDEX]?.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default ElevatedSlopeTabs;
