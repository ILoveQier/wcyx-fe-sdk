/**
 * 取得两个数组的交集
 */
function intersectionTool(arr1 = [], arr2 = []) {
  return arr1.filter((v) => arr2.includes(v));
}
/**
 * 取得两个数组的并集
 */
function unionTool(arr1 = [], arr2 = []) {
  return arr1.concat(arr2.filter((v) => !arr1.includes(v)));
}
/**
 * 取得两个数组的差集
 */
function diffTool(a = [], b = []) {
  return a.concat(b).filter((v) => !a.includes(v) || !b.includes(v)); 
}

export { intersectionTool, unionTool, diffTool };
