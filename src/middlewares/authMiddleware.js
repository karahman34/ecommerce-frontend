function authMiddleware({ state, history, next }) {
  if (!state.auth.loggedIn) {
    return history.push("/login");
  }

  return next();
}

export default authMiddleware;
