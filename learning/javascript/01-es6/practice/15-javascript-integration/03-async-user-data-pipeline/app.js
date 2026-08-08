// Practice 3. Async User Data Pipeline
async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) throw new Error(`User request failed: ${response.status}`);

  const users = await response.json();
  return users;
}

function validateUsers(users) {
  if (!Array.isArray(users)) {
    throw new Error("Users must be an array");
  }
  if (users.length === 0) {
    throw new Error("Users cannot be empty");
  }
  return true;
}

function createUserProfiles(users) {
  return users.map((user) => ({
    id: user.id,
    name: user.name.trim().toUpperCase(),
    email: user.email.trim().toLowerCase(),
    city: user.address.city,
  }));
}

function filterUsersByCity(users, city) {
  // 작성
  return users.filter((user) => user.city.toLowerCase() === city.toLowerCase());
}

function createUserSummary(users) {
  return {
    userCount: users.length,
    userNames: users.map((user) => user.name),
  };
}

async function loadUserData(city) {
  // try-catch-finally 사용
  try {
    const users = await fetchUsers();
    validateUsers(users);
    const profiles = createUserProfiles(users);
    const filteredUsers = filterUsersByCity(profiles, city);
    const summary = createUserSummary(filteredUsers);
    console.log(filteredUsers);
    console.log(summary);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("User data processing completed");
  }
}

loadUserData("gwenborough");
