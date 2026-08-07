// Practice 1. User Validation & Normalization
const users = [
  {
    id: 1,
    name: "  jihun  ",
    email: "  JIHUN@EXAMPLE.COM ",
    age: 30,
    role: "backend",
  },
  {
    id: 2,
    name: "  minsu ",
    email: "MINSU@EXAMPLE.COM",
    age: 27,
  },
  {
    id: 3,
    name: "   ",
    email: "INVALID@EXAMPLE.COM",
    age: 25,
    role: "frontend",
  },
];
function validateUser(user) {
  // 작성
  if (
    !user ||
    typeof user !== "object" ||
    typeof user.name !== "string" ||
    user.name.trim() === "" ||
    typeof user.email !== "string" ||
    typeof user.age !== "number" ||
    user.age < 0
  ) {
    throw new Error(`Invalid user: ${user?.id ?? "unknown"}`);
  }
  return true;
}

function normalizeUser(user) {
  return {
    ...user,
    name: user.name.trim().toUpperCase(),
    email: user.email.trim().toLowerCase(),
    role: user.role ?? "user",
  };
}

function processUser(user) {
  // 작성
  validateUser(user);

  return normalizeUser(user);
}

function processUsers(users) {
  // 작성
  const result = [];

  // 직접 구현
  for (const user of users) {
    try {
      result.push(processUser(user));
    } catch (error) {
      console.log("Error: " + error.message);
    }
  }

  return result;
}
const processedUsers = processUsers(users);

console.log(processedUsers);
