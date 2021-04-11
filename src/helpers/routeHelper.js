export function setDocumentTitle(title = null) {
  const appTitle = process.env.REACT_APP_TITLE;

  document.title = !title ? appTitle : `${title} - ${appTitle}`;
}

export function mergeChildRoutes(parentPrefix, childRoutes) {
  return childRoutes.reduce((routes, childRoute) => {
    routes.push({
      ...childRoute,
      path: `${parentPrefix}${childRoute.path}`,
    });

    return routes;
  }, []);
}
