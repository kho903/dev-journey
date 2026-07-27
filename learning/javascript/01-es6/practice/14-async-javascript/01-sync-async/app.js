// 1. Synchronous Execution
console.log("Synchronous Start");
console.log("Calculating");
console.log("Synchronous End");

// 2. Asynchronous Execution
console.log("Asynchronous Start");
setTimeout(() => {
  console.log("Timer completed");
}, 1000);
console.log("Asynchronous End");
// 3. Zero Millisecond Timer
console.log("Zero Timer Start");
setTimeout(() => {
  console.log("Zero Timer completed");
}, 0);
console.log("Zero Timer End");

// 4. Callback Function
function processTask(taskName, callback) {
  console.log("Processing:", taskName);
  callback();
}

processTask("User Data", () => {
  console.log("Task completed");
});

/*
Synchronous Start
Calculating
Synchronous End
Asynchronous Start
Asynchronous End
Zero Timer Start
Zero Timer End
Processing: User Data
Task completed
Zero Timer completed
Timer completed
*/
