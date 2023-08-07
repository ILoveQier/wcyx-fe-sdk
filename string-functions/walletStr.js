/**
 *
 * @param {*} str 要处理的字符串
 * @param {*} startNum 保留前几位
 * @param {*} endNum 保留后几位
 * @param {*} ellipseNum 小数点展示数量
 */
function handleEllipseStr(str = "", startNum = 3, endNum = 3, ellipseNum = 3) {
  let start = str.substr(0, startNum);
  let end = str.substr(str.length - endNum);

  return `${start}${Array(ellipseNum + 1)
    .fill(".")
    .join("")}${end}`;
}


export { handleEllipseStr };
