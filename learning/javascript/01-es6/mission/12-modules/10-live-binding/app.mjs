import { count, increase, decrease, reset } from "./counter.mjs";

console.log("initial count :", count);

increase();
console.log("after increase :", count);

increase();
console.log("after second increase :", count);

decrease();
console.log("after decrease :", count);

reset();
console.log("after reset :", count);
/*
initial count : 0
after increase : 1
after second increase : 2
after decrease : 1
after reset : 0
*/

/*
    Explain why the imported `count` changes
    - Imported values are connected to the original module through Live Binding
    - `count` is not copied only once when it is imported
    - When a function in `counter.mjs` changes `count`, the updated value is reflected in `app.mjs`
*/

/*
    Explain why `count` cannot be reassigned directly in `app.mjs`
    - An imported binding is read-only in the importing module
    - Only the module that declared `count` can reassign it
    - `app.mjs` can read the updated value but cannot assign a new value directly
*/
