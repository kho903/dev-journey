// Mission 2. User Data Pipeline
function getUser(id) {
  // Promise 반환
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1)
        resolve({
          id: 1,
          name: "JIHUN",
          role: "backend",
        });
      else reject(new Error("User not found"));
    }, 500);
  });
}

function getUserPosts(user) {
  // Promise 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user,
        posts: [
          {
            id: 1,
            title: "Learning JavaScript",
          },
          {
            id: 2,
            title: "Learning Promise",
          },
          {
            id: 3,
            title: "Learning Async/Await",
          },
        ],
      });
    }, 700);
  });
}
function createUserSummary(data) {
  // 객체 반환
  return {
    id: data.user.id,
    name: data.user.name,
    role: data.user.role,
    postCount: data.posts.length,
  };
}
function runUserPipeline(id) {
  return getUser(id)
    .then((user) => {
      console.log(`User loaded: ${user.name}`);
      return getUserPosts(user);
    })
    .then((data) => {
      console.log(`Posts loaded: ${data.posts.length}`);
      return createUserSummary(data);
    })
    .then((summary) => {
      console.log(summary);
      return summary;
    })
    .catch((error) => {
      console.log(error.name);
      console.log(error.message);
    })
    .finally(() => console.log("User pipeline completed"));
}
runUserPipeline(1).then(() => {
  return runUserPipeline(999);
});
