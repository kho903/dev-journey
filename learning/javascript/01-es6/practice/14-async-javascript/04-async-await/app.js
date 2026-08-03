// 1. Basic Async Function
async function getMessage() {
  return "Hello Async";
}

const result = getMessage();

console.log(result instanceof Promise);

result.then((message) => console.log(message));
/*
true
Hello Async
*/

// 2. Await a Promise
function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "JIHUN",
        role: "backend",
      });
    }, 500);
  });
}

async function printUser() {
  const user = await getUser();

  console.log(user);
  console.log(`${user.name} is a ${user.role}`);
}

printUser();
// { id: 1, name: 'JIHUN', role: 'backend' }
// JIHUN is a backend

// 3. Async Error Handling
function findUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) {
        resolve({
          id: 1,
          name: "JIHUN",
        });
      } else {
        reject(new Error("User not found"));
      }
    }, 700);
  });
}

async function printFoundUser(id) {
  try {
    const user = await findUser(id);
    console.log(user);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("User search completed");
  }
}

printFoundUser(1);
printFoundUser(2);
/*
{ id: 1, name: 'JIHUN' }
User search completed
Error
User not found
User search completed
*/

// 4. Sequential and Parallel Execution
function delay(message, milliseconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(message);
    }, milliseconds);
  });
}

async function runSequentially() {
  const first = await delay("First Task", 500);
  console.log(first);

  const second = await delay("Second Task", 500);
  console.log(second);

  console.log("Sequential execution completed");
}

runSequentially();

async function runInParallel() {
  const userPromise = delay("User Data", 800);
  const postPromise = delay("Post Data", 500);
  const commentPromise = delay("Comment Data", 300);

  const results = await Promise.all([userPromise, postPromise, commentPromise]);

  console.log(results);
  console.log("Parallel execution completed");
}

runInParallel();
