function guestMiddleware({ state, history, next }) {
  if (state.auth.loggedIn) {
    return history.push("/");
  }

  return next();
}

export default guestMiddleware;
