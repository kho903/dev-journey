// Mission 4. User Activity Dashboard
async function fetchUser(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );

  if (!response.ok) throw new Error(`User request failed: ${response.status}`);

  const user = await response.json();

  if (!user.id) {
    throw new Error(`User not found: ${userId}`);
  }

  return user;
}

async function fetchPosts(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  );

  if (!response.ok) throw new Error(`Post request failed: ${response.status}`);

  const posts = await response.json();
  return posts;
}

async function fetchTodos(userId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos?userId=${userId}`,
  );

  if (!response.ok) throw new Error(`Todo request failed: ${response.status}`);

  const todos = await response.json();
  return todos;
}

function createUserProfile(user) {
  return {
    id: user.id,
    name: user.name.trim().toUpperCase(),
    email: user.email.trim().toLowerCase(),
    city: user.address.city,
  };
}

function createPostSummary(posts) {
  const postCount = posts.length;
  const totalTitleLength = posts.reduce(
    (acc, cur) => acc + cur.title.length,
    0,
  );
  const averageTitleLength = postCount === 0 ? 0 : totalTitleLength / postCount;
  const longestTitle = posts.reduce((acc, cur) => {
    if (acc.length < cur.title.length) {
      return cur.title;
    }
    return acc;
  }, "");
  return {
    postCount,
    averageTitleLength,
    longestTitle,
  };
}
function createTodoSummary(todos) {
  const todoCount = todos.length;
  const completedCount = todos.filter((todo) => {
    return todo.completed === true;
  }).length;
  const pendingCount = todoCount - completedCount;
  const completionRate =
    todoCount === 0 ? 0 : (completedCount / todoCount) * 100;

  return {
    todoCount,
    completedCount,
    pendingCount,
    completionRate,
  };
}

function createDashboard(profile, postSummary, todoSummary) {
  return {
    user: {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      city: profile.city,
    },
    posts: {
      postCount: postSummary.postCount,
      averageTitleLength: postSummary.averageTitleLength,
      longestTitle: postSummary.longestTitle,
    },
    todos: {
      todoCount: todoSummary.todoCount,
      completedCount: todoSummary.completedCount,
      pendingCount: todoSummary.pendingCount,
      completionRate: todoSummary.completionRate,
    },
  };
}
async function loadUserDashboard(userId) {
  try {
    // 1. 사용자 먼저 조회
    const user = await fetchUser(userId);

    // 2. posts / todos 요청 동시에 시작
    const postsPromise = fetchPosts(userId);
    const todosPromise = fetchTodos(userId);

    // 3. 두 요청이 모두 끝날 때까지 대기
    const [posts, todos] = await Promise.all([postsPromise, todosPromise]);

    // 4. 각각 데이터 가공
    const profile = createUserProfile(user);
    const postSummary = createPostSummary(posts);
    const todoSummary = createTodoSummary(todos);

    // 5. dashboard 생성
    const dashboard = createDashboard(profile, postSummary, todoSummary);
    console.log(dashboard);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("User dashboard processing completed");
  }
}
loadUserDashboard(1);
