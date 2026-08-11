// Review 1. Array Method Debugging
const users = [
  {
    id: 1,
    name: "Jihun",
    age: 30,
    active: true,
  },
  {
    id: 2,
    name: "Minji",
    age: 25,
    active: false,
  },
  {
    id: 3,
    name: "Yuna",
    age: 28,
    active: true,
  },
];

const posts = [
  { id: 1, userId: 1 },
  { id: 2, userId: 1 },
  { id: 3, userId: 3 },
];

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

function calculateAverageAge(users) {
  const totalAge = users.reduce((acc, user) => acc + user.age, 0);

  return users.length === 0 ? 0 : totalAge / users.length;
}

const activeUsers = getActiveUsers(users);
const summaries = createUserSummaries(activeUsers, posts);
const averageAge = calculateAverageAge(activeUsers);

console.log(summaries);
console.log(averageAge);
