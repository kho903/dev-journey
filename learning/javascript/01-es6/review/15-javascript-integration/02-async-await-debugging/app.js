// Review 2. Promise / Async-Await Debugging

function fetchUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Jihun",
      });
    }, 300);
  });
}

function fetchPosts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, userId: 1, title: "Post A" },
        { id: 2, userId: 1, title: "Post B" },
      ]);
    }, 500);
  });
}

function fetchTodos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, completed: true },
        { id: 2, completed: false },
      ]);
    }, 400);
  });
}

async function createDashboard() {
  try {
    const [user, posts, todos] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchTodos(),
    ]);

    const completedTodos = todos.filter((todo) => todo.completed === true);

    return {
      userName: user.name,
      postCount: posts.length,
      completedTodoCount: completedTodos.length,
    };
  } catch (error) {
    throw error;
  } finally {
    console.log("Dashboard processing completed");
  }
}

async function main() {
  const dashboard = await createDashboard();

  console.log(dashboard);
}

main();
