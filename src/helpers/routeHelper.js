export function setDocumentTitle(title = null) {
  const appTitle = process.env.REACT_APP_TITLE

  document.title = !title ? appTitle : `${title} - ${appTitle}`
}