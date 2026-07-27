// 1. Successful Promise
function createSuccessPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Data loaded successfully");
    }, 1000);
  });
}

createSuccessPromise()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log("Success promise completed");
  });

// 2. Failed Promise
function createFailurePromise() {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Failed to load data"));
    }, 1500);
  });
}

createFailurePromise()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error.name);
    console.log(error.message);
  })
  .finally(() => {
    console.log("Failure promise completed");
  });

// 3. Conditional Promise

function processUser(isValid) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isValid) {
        resolve({ id: 1, name: "JIHUN" });
        return;
      }
      reject(new Error("Invalid user"));
    }, 500);
  });
}

processUser(true)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error.message);
  });

processUser(false)
  .then((user) => {
    console.log(user);
  })
  .catch((error) => {
    console.log(error.message);
  });

/*
{ id: 1, name: 'JIHUN' }
Invalid user
Data loaded successfully
Success promise completed
Error
Failed to load data
Failure promise completed
*/
