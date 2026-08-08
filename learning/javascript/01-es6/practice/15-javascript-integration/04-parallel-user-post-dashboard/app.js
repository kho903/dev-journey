// Practice 4. Parallel User & Post Dashboard
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

function createUserDashboards(users, posts) {
  return users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);
    return {
      id: user.id,
      name: user.name.trim().toUpperCase(),
      email: user.email.trim().toLowerCase(),
      postCount: userPosts.length,
    };
  });
}

function getActiveWriters(users, minimumPostCount) {
  return users.filter((user) => user.postCount >= minimumPostCount);
}

function createDashboardSummary(users) {
  const userCount = users.length;
  const totalPostCount = users.reduce((acc, cur) => acc + cur.postCount, 0);
  const averagePostCount = userCount === 0 ? 0 : totalPostCount / userCount;
  return {
    userCount: userCount,
    totalPostCount: totalPostCount,
    averagePostCount: averagePostCount,
  };
}

async function loadDashboard(minimumPostCount) {
  try {
    const usersPromise = fetchUsers();
    const postsPromise = fetchPosts();
    const [users, posts] = await Promise.all([usersPromise, postsPromise]);
    const userDashboards = createUserDashboards(users, posts);
    const activeWriters = getActiveWriters(userDashboards, minimumPostCount);
    const summary = createDashboardSummary(activeWriters);

    console.log(activeWriters);
    console.log(summary);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Dashboard processing completed");
  }
}
loadDashboard(10);
