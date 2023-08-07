/**
 *
 * @param {*} str 要处理的字符串
 */
async function copyString(str = "") {
  return await navigator.clipboard.writeText(str);
}

export { copyString };
