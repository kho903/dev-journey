function validateUserId(userId) {
  const userIdRegex = /^[a-zA-Z][a-zA-Z0-9_]{4,11}$/;

  return userIdRegex.test(userId);
}

function validatePassword(password) {
  return password.length >= 8;
}

export { validateUserId, validatePassword };
