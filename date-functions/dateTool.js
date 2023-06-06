/**
 *
 * @param {*} fmt 需要转换的时间格式
 * @param {*} time 时间戳
 * @param {*} addition 额外属性，可设置：+1 day；+5 hour；-3 min；+7 sec；后缀有[day,hour,min,sec],前缀可以（+或-）任意数字
 * @returns 转换过后的时间字符串
 */
function dateTimeFunc(
  fmt = "yyyy-MM-dd hh:mm:ss",
  time = Date.now(),
  addition
) {
  if (fmt == null) {
    fmt = "yyyy-MM-dd hh:mm:ss";
  }
  if (time == null) {
    time = Date.now();
  }
  // 如果有额外属性，先把结果加到time上
  if (addition) {
    const unitObj = {
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      min: 60 * 1000,
      sec: 1 * 1000,
    };
    // 0.按照空格分隔
    let arr = addition.split(" ");
    // 1.取出空格之前的'+1'
    let num = arr[0];
    // 2.决定后边的单位'day'
    let unit = arr[1];
    // 3.time附加上最终结果
    time = time + num * unitObj[unit];
  }
  // 1. 时间戳转换成日期
  let date = new Date(time);
  // 2.创建日期转换对象
  let o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    t: date.getTime(), //时间戳
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
  };
  // 3. 根据fmt转换成所需要的格式
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (let k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}
// console.log(dateTimeFunc(null, null, "+8 hour"));

// 当前时间戳 转成hh:mm:ss
function dateHMS(timeStamp, format = "hh:mm:ss") {
  let date = new Date(timeStamp);

  let hours = date.getHours();
  let mins = date.getMinutes();
  let seconds = date.getSeconds();
  function fixZero(v) {
    if (v < 10) {
      return "0" + v;
    }
    return v;
  }
  return format.replace(/hh|mm|ss/g, function (x) {
    if (x == "hh") {
      return fixZero(hours);
    }
    if (x == "mm") {
      return fixZero(mins);
    }
    if (x == "ss") {
      return fixZero(seconds);
    }
    return x;
  });
}

export { dateTimeFunc, dateHMS };
