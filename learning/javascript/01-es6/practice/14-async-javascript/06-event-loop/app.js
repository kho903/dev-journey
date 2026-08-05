// 1. Basic Event Loop Order
console.log("Start");

setTimeout(() => {
  console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");
/*
Start
End
Promise
Timeout
*/
// 2. Multiple Microtasks and Tasks
console.log("Script Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 2");
});

console.log("Script End");

// 3. Async/Await Execution Order
async function runAsyncTask() {
  console.log("Async Start");

  await Promise.resolve();

  console.log("Async End");
}
console.log("Main Start");
runAsyncTask();

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise Callback");
});

console.log("Main End");

/*
Main Start
Async Start
Main End
Async End
Promise Callback
Timer
*/

// Additional
Promise.resolve().then(() => {
  console.log("Microtask 1");

  Promise.resolve().then(() => {
    console.log("Microtask 2");
  });
});

setTimeout(() => {
  console.log("Task");
}, 0);
