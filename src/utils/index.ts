// 自定义深度比较函数
export const isEqual = (obj1: any, obj2: any) => {
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (!obj2.hasOwnProperty(key) || !isEqual(obj1[key], obj2[key]))
      return false;
  }
  return true;
};
