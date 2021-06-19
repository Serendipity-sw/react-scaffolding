export default {
  debounce: function (fn, delay) {
    let timer = null;
    return function () {
      let self = this
      timer && clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(self);
      }, delay);
    }
  },
  throttle: function (fn, mustDelay) {
    let start = 0;
    return function () {
      let now = new Date().getTime(),
        self = this
      if (now > start + mustDelay) {
        fn.apply(self)
        start = now;
      }
    }
  }
}