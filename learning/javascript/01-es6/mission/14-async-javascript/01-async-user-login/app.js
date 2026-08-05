// Mission 1. Async User Login
function authenticateUser(username, password) {
  // Promise 반환
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        typeof username !== "string" ||
        username.trim() === "" ||
        password !== "password123"
      ) {
        return reject(new Error("Invalid credentials"));
      }
      resolve({
        id: 1,
        name: username.trim().toUpperCase(),
        role: "backend",
      });
    }, 700);
  });
}

async function runLogin(username, password) {
  // try-catch-finally 사용
  try {
    const user = await authenticateUser(username, password);
    console.log(user);
    console.log(`${user.name} logged in as ${user.role}`);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Login attempt completed");
  }
}
async function main() {
  await runLogin("jihun", "password123");
  await runLogin("jihun", "wrong-password");
}

main();
