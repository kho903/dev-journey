// Mission 3. Parallel Dashboard Loader
function getUserData() {
  // Promise 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "JIHUN",
        role: "backend",
      });
    }, 800);
  });
}

function getPostData() {
  // Promise 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = [
        {
          id: 1,
          title: "JavaScript",
        },
        {
          id: 2,
          title: "Promise",
        },
        {
          id: 3,
          title: "Async/Await",
        },
      ];
      resolve(res);
    }, 500);
  });
}

function getNotificationData(shouldFail) {
  // Promise 반환
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldFail
        ? reject(new Error("Failed to load notifications"))
        : resolve({ unreadCount: 5 });
    }, 300);
  });
}

async function loadDashboard(shouldFail) {
  // try-catch-finally 사용
  try {
    const userPromise = getUserData();
    const postPromise = getPostData();
    const notificationPromise = getNotificationData(shouldFail);
    const [user, posts, notification] = await Promise.all([
      userPromise,
      postPromise,
      notificationPromise,
    ]);
    console.log({
      userName: user.name,
      role: user.role,
      postCount: posts.length,
      unreadNotificationCount: notification.unreadCount,
    });
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  } finally {
    console.log("Dashboard loading completed");
  }
}
async function main() {
  await loadDashboard(false);
  await loadDashboard(true);
}

main();
