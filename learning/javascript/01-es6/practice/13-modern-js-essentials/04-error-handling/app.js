function createUser(name, password) {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Name is required");
  }
  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  return { name, password };
}

try {
  const jihun = createUser("JIHUN", "password123");
  console.log(jihun);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
} finally {
  console.log("User creation attempt completed");
}

try {
  const kim = createUser("KIM", "1234");
  console.log(kim);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
} finally {
  console.log("User creation attempt completed");
}
