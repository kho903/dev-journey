// 1. GET Request
async function getUser(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

  const user = await response.json();
  return user;
}

async function printUser(id) {
  try {
    const user = await getUser(id);

    console.log("ID:", user.id);
    console.log("Name:", user.name);
    console.log("Email:", user.email);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("User request completed");
  }
}

// 3. POST Request
async function createPost(post) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    // method
    method: "POST",
    // headers
    headers: {
      "Content-Type": "application/json",
    },
    // body
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  // JSON 변환 후 반환
  const createdPost = await response.json();
  return createdPost;
}

const newPost = {
  title: "Learning Fetch API",
  body: "Practice GET and POST requests",
  userId: 1,
};

async function printCreatedPost() {
  try {
    const createdPost = await createPost(newPost);

    console.log(createdPost);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Post request completed");
  }
}

async function main() {
  await printUser(1);
  // 2. GET Request Error Handling
  await printUser(9999);
  await printCreatedPost();
}
main();
