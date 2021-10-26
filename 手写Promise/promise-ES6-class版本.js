class Promise {
  constructor(executor) {
    //添加属性
    this.PromiseState = "pending";
    this.PromiseResult = null;
    const self = this;
    //保存then回调函数
    this.callback = [];

    function resolve(data) {
      if (self.PromiseState !== "pending") return;
      //设置对象的状态
      self.PromiseState = "fulfilled"; //resolved
      //设置对象结果值
      self.PromiseResult = data;
      //成功回调
      setTimeout(() => {
        self.callback.forEach((item) => {
          item.onResolved(data);
        });
      });
    }
    function reject(data) {
      if (self.PromiseState !== "pending") return;
      //设置对象的状态
      self.PromiseState = "rejected";
      //设置对象结果值
      self.PromiseResult = data;
      //失败回调
      setTimeout(() => {
        self.callback.forEach((item) => {
          item.onRejected(data);
        });
      });
    }

    //执行器函数是同步的
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  //添加 then 方法
  then(onResolved, onRejected) {
    const self = this;
    //判断回调函数参数是否存在
    if (typeof onRejected !== "function") {
      onRejected = (reason) => {
        throw reason;
      };
    }
    if (typeof onResolved !== "function") {
      onResolved = (value) => value;
    }

    return new Promise((resolve, reject) => {
      //封装函数
      function callback(type) {
        try {
          //获取回调函数的执行结果
          let result = type(self.PromiseResult);
          //判断
          if (result instanceof Promise) {
            result.then(
              (v) => resolve(v),
              (r) => reject(r)
            );
          } else {
            //结果的对象状态为成功
            resolve(result);
          }
        } catch (error) {
          reject(error);
        }
      }
      if (this.PromiseState === "fulfilled") {
        setTimeout(() => {
          callback(onResolved);
        });
      }
      if (this.PromiseState === "rejected") {
        setTimeout(() => {
          callback(onRejected);
        });
      }
      //异步时,判断pending状态,保存回调函数
      if (this.PromiseState === "pending") {
        this.callback.push({
          onResolved: function () {
            callback(onResolved);
          },
          onRejected: function () {
            callback(onRejected);
          },
        });
      }
    });
  }

  //添加 catch 方法
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }

  //添加 resolve 方法
  static resolve(value) {
    return new Promise((resolve, reject) => {
      if (value instanceof Promise) {
        value.then(
          (v) => resolve(v),
          (r) => reject(r)
        );
      } else {
        resolve(value);
      }
    });
  }

  //添加 reject 方法
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  //添加 all 方法
  static all(promises) {
    return new Promise((resolve, reject) => {
      let arr = [];
      let count = 0;
      //遍历
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            count++;
            arr[i] = v;
            if (count === promises.length) {
              resolve(arr);
            }
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }

  //添加 race 方法
  static race(promises) {
    return new Promise((resolve, reject) => {
      //遍历
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (v) => {
            resolve(arr);
          },
          (r) => {
            reject(r);
          }
        );
      }
    });
  }
}
