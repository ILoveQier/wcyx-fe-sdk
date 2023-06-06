/**
 * 用于根据规则,提取数组中最大或者最小的对象
 * rules:规则判断
 * {
 * opt: 可以运行的操作数  '<':找到最小的  '>':找到最大的
 * property: 深度找到的数据 'obj.price.a'
 * }
 */
export function findOneByRules(arrs, rules) {
  const { opt, property } = rules;
  let pos = property.split(".");
  let newOne = arrs[0];
  function getProperty(obj, pos) {
    let one = obj;
    pos.map((po) => {
      one = one[po];
    });
    return one;
  }
  arrs.map((item) => {
    if (eval(`${getProperty(item, pos)}${opt}${getProperty(newOne, pos)}`)) {
      newOne = item;
    }
  });
  return newOne;
}

/**
 * 根据props 提取需要的属性,组装成新对象
 * obj:{a:1,b:2,c:3} props:['a','c'] => {a:1,c:3}
 * isExtract:判断是提取还是反向提取
 */
export function extractObjProperty(obj, props, isExtract = true) {
  let newObj = {};
  if (isExtract) {
    props.map((p) => {
      newObj[p] = obj[p];
    });
  } else {
    Object.keys(obj).map((k) => {
      !props.includes(k) && (newObj[k] = obj[k]);
    });
  }
  return newObj;
}

export default {
  findOneByRules,
  extractObjProperty,
};
