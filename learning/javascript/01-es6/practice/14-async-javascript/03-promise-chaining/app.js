// 1. Value Chaining
Promise.resolve(10)
  .then((result) => {
    return result * 2;
  })
  .then((result) => {
    return result + 5;
  })
  .then((result) => {
    return result ** 2;
  })
  .then((result) => {
    console.log("Final result :", result);
  });

// 2. Asynchronous Promise Chaining
function delayMessage(message, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, delay);
  });
}

delayMessage("Step 1", 500)
  .then((message) => {
    console.log(message);
    return delayMessage("Step 2", 500);
  })
  .then((message) => {
    console.log(message);
    return delayMessage("Step 3", 500);
  })
  .then((message) => {
    console.log(message);
  })
  .finally(() => {
    console.log("Promise chain completed");
  });

// 3. Error Propagation
Promise.resolve(10)
  .then((number) => {
    return number * 2;
  })
  .then((number) => {
    console.log(number);
    throw new Error("Calculation failed");
  })
  .then(() => {
    console.log("This code should not run");
  })
  .catch((error) => {
    console.log(error.name);
    console.log(error.message);
  })
  .finally(() => {
    console.log("Error handling completed");
  });

/*
20
Final result : 625
Error
Calculation failed
Error handling completed
Step 1
Step 2
Step 3
Promise chain completed
*/
