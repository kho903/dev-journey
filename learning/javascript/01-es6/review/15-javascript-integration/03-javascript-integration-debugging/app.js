// Review 3. JavaScript Integration Debugging
function fetchUsers() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "Jihun",
          active: true,
        },
        {
          id: 2,
          name: "Minji",
          active: false,
        },
        {
          id: 3,
          name: "Yuna",
          active: true,
        },
      ]);
    }, 300);
  });
}

function fetchPosts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, userId: 1, title: "Post A" },
        { id: 2, userId: 1, title: "Post B" },
        { id: 3, userId: 3, title: "Post C" },
      ]);
    }, 500);
  });
}

function getActiveUsers(users) {
  return users.filter((user) => user.active === true);
}

function createUserSummaries(users, posts) {
  return users.map((user) => {
    const userPosts = posts.filter((post) => post.userId === user.id);

    return {
      id: user.id,
      name: user.name.toUpperCase(),
      postCount: userPosts.length,
    };
  });
}

function createSummary(users) {
  const totalPostCount = users.reduce((acc, user) => {
    return acc + user.postCount;
  }, 0);

  return {
    userCount: users.length,
    totalPostCount,
    averagePostCount: users.length === 0 ? 0 : totalPostCount / users.length,
  };
}

async function loadDashboard() {
  try {
    const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);
    const activeUsers = getActiveUsers(users);
    const userSummaries = createUserSummaries(activeUsers, posts);
    const summary = createSummary(userSummaries);

    return {
      users: userSummaries,
      summary,
    };
  } catch (error) {
    throw error;
  } finally {
    console.log("Dashboard processing completed");
  }
}

async function main() {
  const dashboard = await loadDashboard();

  console.log(dashboard);
}

main();
