function createCounter() {
  let count = 0;

  return {
    increase() {
      return ++count;
    },

    decrease() {
      return --count;
    },

    reset() {
      count = 0;
      return count;
    },

    getCount() {
      return count;
    },
  };
}

const counter = createCounter();

console.log(counter.getCount());
// 0

console.log(counter.increase());
// 1

console.log(counter.increase());
// 2

console.log(counter.decrease());
// 1

console.log(counter.reset());
// 0

console.log(counter.count);
// undefined
