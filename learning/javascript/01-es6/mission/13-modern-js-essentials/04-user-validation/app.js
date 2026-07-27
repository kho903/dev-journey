function createUser(name, password, profile) {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error("Name is required");
  }
  if (typeof password !== "string" || password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const email = profile?.contact?.email ?? "No email";
  return { name, password, email };
}

try {
  const jihun = createUser("JIHUN", "password123", {
    contact: {
      email: "jihun@example.com",
    },
  });
  console.log(jihun);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
} finally {
  console.log("User creation attempt completed");
}
/*
{ name: 'JIHUN', password: 'password123', email: 'jihun@example.com' }
User creation attempt completed
*/

try {
  const kim = createUser("KIM", "password123", null);
  console.log(kim);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
} finally {
  console.log("User creation attempt completed");
}
/*
{ name: 'KIM', password: 'password123', email: 'No email' }
User creation attempt completed
*/

try {
  const lee = createUser("LEE", "1234", null);
  console.log(lee);
} catch (error) {
  console.log(error.name);
  console.log(error.message);
} finally {
  console.log("User creation attempt completed");
}
/*
Error
Password must be at least 8 characters
User creation attempt completed
*/
