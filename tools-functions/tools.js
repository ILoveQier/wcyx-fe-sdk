/**
 * 防抖函数,包装需要防抖的函数方法,返回的函数自带防抖功能
 * @param {*} fn 要包装的函数
 * @param {*} wait 防抖时间
 * @param {*} immediate 是否立即执行
 * @returns
 */
function debounceWrap(fn, wait, immediate = false) {
  let timeout;

  return function (...args) {
    let context = this;

    if (timeout) clearTimeout(timeout); // timeout 不为null
    if (immediate) {
      let callNow = !timeout; // 第一次会立即执行，以后只有事件执行后才会再次触发
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callNow) {
        fn.apply(context, args);
      }
    } else {
      timeout = setTimeout(function () {
        fn.apply(context, args);
      }, wait);
    }
  };
}

/**
 * 节流包装函数,无论多快的触发函数,都会按照固定时间执行
 * @param {*} fun
 * @param {*} fixedTime
 * @returns
 */
function throttleWrap(fun, fixedTime) {
  let last, deferTimer;
  return function (...args) {
    let that = this;
    let now = +new Date();
    if (last && now < last + fixedTime) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fun.apply(that, args);
      }, fixedTime);
    } else {
      last = now;
      fun.apply(that, args);
    }
  };
}

export default { debounceWrap, throttleWrap };
