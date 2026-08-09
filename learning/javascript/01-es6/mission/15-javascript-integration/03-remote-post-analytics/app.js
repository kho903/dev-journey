// Mission 3. Remote Post Analytics Service
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

async function fetchComments() {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");

  if (!response.ok)
    throw new Error(`Comment request failed: ${response.status}`);

  const comments = await response.json();
  return comments;
}

function validateData(users, posts, comments) {
  if (!Array.isArray(users)) throw new Error("Invalid users");
  if (!Array.isArray(posts)) throw new Error("Invalid posts");
  if (!Array.isArray(comments)) throw new Error("Invalid comments");
  if (users.length === 0) throw new Error("Users cannot be empty");
  if (posts.length === 0) throw new Error("Posts cannot be empty");

  return true;
}

function createPostAnalytics(posts, users, comments) {
  return posts.map((post) => {
    const user = users.find((user) => post.userId === user.id);

    if (!user) {
      throw new Error(`User not found: ${post.userId}`);
    }

    const postComments = comments.filter(
      (comment) => comment.postId === post.id,
    );

    return {
      postId: post.id,
      title: post.title.trim(),
      authorId: user.id,
      authorName: user.name.trim().toUpperCase(),
      commentCount: postComments.length,
    };
  });
}

function getPopularPosts(posts, minimumCommentCount) {
  return posts.filter((post) => post.commentCount >= minimumCommentCount);
}

function createAuthorSummary(posts) {
  return posts.reduce((summary, post) => {
    const { authorName, commentCount } = post;

    if (!summary[authorName]) {
      summary[authorName] = {
        postCount: 0,
        commentCount: 0,
      };
    }

    summary[authorName].postCount++;
    summary[authorName].commentCount += commentCount;
    return summary;
  }, {});
}

function createPostSummary(posts) {
  const postCount = posts.length;
  const totalCommentCount = posts.reduce(
    (acc, cur) => acc + cur.commentCount,
    0,
  );
  const averageCommentCount =
    postCount === 0 ? 0 : totalCommentCount / postCount;
  const authorCount = new Set(posts.map((post) => post.authorId)).size;

  return {
    postCount,
    totalCommentCount,
    averageCommentCount,
    authorCount,
  };
}

async function runPostAnalytics(minimumCommentCount) {
  // try-catch-finally
  try {
    const usersPromise = fetchUsers();
    const postsPromise = fetchPosts();
    const commentsPromise = fetchComments();
    const [users, posts, comments] = await Promise.all([
      usersPromise,
      postsPromise,
      commentsPromise,
    ]);
    validateData(users, posts, comments);
    const postAnalytics = createPostAnalytics(posts, users, comments);
    const popularPosts = getPopularPosts(postAnalytics, minimumCommentCount);
    console.log(popularPosts);
    const authorSummary = createAuthorSummary(popularPosts);
    console.log(authorSummary);
    const summary = createPostSummary(popularPosts);
    console.log(summary);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Post analytics processing completed");
  }
}

runPostAnalytics(5);
