// Mission 4. Remote User Profile
async function fetchUser(id) {
  // 작성
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );

  if (!response.ok) {
    throw new Error(`User request failed: ${response.status}`);
  }
  const user = await response.json();
  return user;
}

async function fetchUserPosts(userId) {
  // 작성
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  );

  if (!response.ok) {
    throw new Error(`Post request failed: ${response.status}`);
  }
  const posts = await response.json();
  return posts;
}

async function createPost(post) {
  // 작성
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) throw new Error(`Post creation failed: ${response.status}`);

  const createdPost = await response.json();
  return createdPost;
}

async function loadUserProfile(id) {
  // try-catch-finally 사용
  try {
    const userPromise = fetchUser(id);
    const postsPromise = fetchUserPosts(id);

    const [user, posts] = await Promise.all([userPromise, postsPromise]);
    const profile = {
      id: user.id,
      name: user.name,
      email: user.email,
      postCount: posts.length,
    };
    console.log(profile);

    const newPost = {
      title: "Learning Async JavaScript",
      body: "Practice Fetch API with async and await",
      userId: user.id,
    };
    const createdPost = await createPost(newPost);
    console.log(createdPost);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Remote profile request completed");
  }
}
async function main() {
  await loadUserProfile(1);
  await loadUserProfile(9999);
}

main();
