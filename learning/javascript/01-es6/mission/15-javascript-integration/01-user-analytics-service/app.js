async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) throw new Error(`User request failed: ${response.status}`);
  const users = await response.json();
  return users;
}

async function fetchPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!response.ok) throw new Error(`Post request failed: ${response.status}`);
  const posts = await response.json();
  return posts;
}

function validateData(users, posts) {
  if (!Array.isArray(users)) throw new Error("Invalid users");
  if (!Array.isArray(posts)) throw new Error("Invalid posts");
  if (users.length === 0) throw new Error("Users cannot be empty");
  if (posts.length === 0) throw new Error("Posts cannot be empty");
  return true;
}

function createUserAnalytics(users, posts) {
  return users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    return {
      id: user.id,
      name: user.name.trim().toUpperCase(),
      email: user.email.trim().toLowerCase(),
      city: user.address.city,
      postCount: userPosts.length,
    };
  });
}

function getTopWriters(users, minimumPostCount) {
  return users.filter((user) => user.postCount >= minimumPostCount);
}

function createAnalyticsSummary(users) {
  const userCount = users.length;
  const totalPostCount = users.reduce((acc, cur) => acc + cur.postCount, 0);
  const averagePostCount = userCount === 0 ? 0 : totalPostCount / userCount;
  const cities = [...new Set(users.map((user) => user.city))];
  return {
    userCount,
    totalPostCount,
    averagePostCount,
    cities,
  };
}

async function runAnalytics(minimumPostCount) {
  try {
    const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);

    validateData(users, posts);

    const analytics = createUserAnalytics(users, posts);

    const topWriters = getTopWriters(analytics, minimumPostCount);

    const summary = createAnalyticsSummary(topWriters);

    console.log(topWriters);
    console.log(summary);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("User analytics processing completed");
  }
}

runAnalytics(10);
