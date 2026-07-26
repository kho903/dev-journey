let count = 0;

function increase() {
  count += 1;
}

function decrease() {
  count -= 1;
}

function reset() {
  count = 0;
}

export { count, increase, decrease, reset };
