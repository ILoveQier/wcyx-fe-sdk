// 根据数量限制并发
async function concurrencySettled(arr = [], splitNum = 1) {
  const arrNum = Math.ceil(arr.length / splitNum); // Math.ceil()向上取整的方法，用来计算拆分后数组的长度
  let index = 0; // 定义初始索引
  let resIndex = 0; // 用来保存每次拆分的长度
  const results = [];
  while (index < arrNum) {
    results[index] = arr.slice(resIndex, splitNum + resIndex);
    resIndex += splitNum;
    index++;
  }
  let settledArr = [];
  for (let index = 0; index < results.length; index++) {
    const one = results[index];
    let res = await Promise.allSettled(one);
    settledArr = [...settledArr, ...res];
  }
  return settledArr;
}

export default { concurrencySettled };
