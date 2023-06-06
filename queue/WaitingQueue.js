export class WaitingQueue {
  // 传递等待时间 默认一秒
  constructor(waitingTime = 1) {
    this.isBusy = false;
    this.isFirst = true;
    this.waitingTime = waitingTime;
    this.box = [];
  }
  // 初始化
  init() {
    this.isBusy = false;
    this.isFirst = true;
    this.box = [];
  }
  get size() {
    return this.box.length;
  }

  get isEmpty() {
    return !this.box.length;
  }

  // 清空队列
  clear() {
    this.init();
  }

  lazyRun(func, time = 0) {
    setTimeout(func.bind(this), time);
  }
  // 进入队列方法，
  entry(func) {
    // 无论如何，队列方法先放入数组中
    this.box.unshift(func);
    // 判断是否第一次执行，如果是，自执行启动
    if (this.isFirst) {
      this.isFirst = false;
      this.next();
      return;
    }
  }
  // 执行下一个队列方法
  next() {
    // 每次执行下一个队列时，先检查能否执行
    if (!this.check()) {
      return;
    }
    // 取出队列中的方法
    let func = this.box.pop();
    // done 函数，外部调用,time：强制等待时间，cb：调用后通知
    func(
      (time) =>
        new Promise((resolve) => {
          // 不忙
          this.isBusy = false;
          // 等待时间 可能传0不等待，或者默认
          let waitTime = (time ?? this.waitingTime) * 1000;
          // 延迟执行
          this.lazyRun(() => {
            // 下一步延迟执行,确保resolve先执行
            this.lazyRun(this.next);
            resolve();
          }, waitTime);
        })
    );
  }
  // 检查能否执行下一个队列的方法
  check() {
    // 如果队列都空了，不执行
    if (this.isEmpty) {
      this.isFirst = true;
      this.isBusy = false;
      return false;
    }
    // 如果队列正在执行，不执行
    if (this.isBusy) {
      return false;
    }
    // 其他的都继续执行
    this.isBusy = true;
    return true;
  }
}
