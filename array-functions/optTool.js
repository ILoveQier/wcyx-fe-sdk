/**
 * 传入数值，返回从0到该数值的数组
 * @param {*} num
 * return [0,1,2]
 */
function numToArray(num, fromzero = 0) {
  let index = fromzero;
  let arr = [];
  while (index != num) {
    arr.push(index);
    index++;
  }

  return arr;
}

export { numToArray };
