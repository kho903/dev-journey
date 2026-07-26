import { count, increase, decrease, reset } from "./counter.mjs";

console.log("initial count :", count);

increase();
console.log("after increase :", count);

increase();
console.log("after increase :", count);

decrease();
console.log("after decrease :", count);

reset();
console.log("after reset :", count);

// Import한 binding에는 직접 재할당 불가
/*
initial count : 0
after increase : 1
after increase : 2
after decrease : 1
after reset : 0
*/
