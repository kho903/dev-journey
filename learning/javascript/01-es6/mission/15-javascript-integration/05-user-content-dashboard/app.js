// Mission 5. User Content Dashboard
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

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`,
  );

  if (!response.ok)
    throw new Error(`Comment request failed: ${response.status}`);

  const comments = await response.json();
  return comments;
}

function createUserProfile(user) {
  return {
    id: user.id,
    name: user.name.trim().toUpperCase(),
    email: user.email.trim().toLowerCase(),
    city: user.address.city,
    company: user.company.name,
  };
}

async function loadPostDetails(posts) {
  const commentPromises = posts.map((post) => {
    return fetchComments(post.id);
  });
  const commentsList = await Promise.all(commentPromises);
  return posts.map((post, index) => {
    const comments = commentsList[index];

    return {
      postId: post.id,
      title: post.title.trim(),
      bodyLength: post.body.length,
      commentCount: comments.length,
    };
  });
}

function createPostSummary(postDetails) {
  const postCount = postDetails.length;
  const totalCommentCount = postDetails.reduce(
    (acc, cur) => acc + cur.commentCount,
    0,
  );
  const averageCommentCount =
    postCount === 0 ? 0 : totalCommentCount / postCount;
  const mostCommentedPost =
    postCount === 0
      ? null
      : postDetails.reduce((acc, cur) => {
          if (cur.commentCount > acc.commentCount) return cur;
          return acc;
        });

  return {
    postCount,
    totalCommentCount,
    averageCommentCount,
    mostCommentedPost:
      mostCommentedPost === null
        ? null
        : {
            postId: mostCommentedPost.postId,
            title: mostCommentedPost.title,
            commentCount: mostCommentedPost.commentCount,
          },
  };
}

function createTodoSummary(todos) {
  const todoCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed === true).length;
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

function createDashboard(profile, postDetails, postSummary, todoSummary) {
  return {
    user: profile,
    posts: postDetails,
    postSummary,
    todos: todoSummary,
  };
}
async function loadUserContentDashboard(userId) {
  try {
    const user = await fetchUser(userId);

    const postsPromise = fetchPosts(userId);
    const todosPromise = fetchTodos(userId);

    const [posts, todos] = await Promise.all([postsPromise, todosPromise]);
    const postDetails = await loadPostDetails(posts);

    const profile = createUserProfile(user);
    const postSummary = createPostSummary(postDetails);
    const todoSummary = createTodoSummary(todos);
    const dashboard = createDashboard(
      profile,
      postDetails,
      postSummary,
      todoSummary,
    );

    console.log(dashboard);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("User content dashboard processing completed");
  }
}

loadUserContentDashboard(1);
