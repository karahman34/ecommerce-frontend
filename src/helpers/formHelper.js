export function getValidationErrors(err) {
  return err.response.data.data;
}

export function getValidationErrorsObject(err) {
  const errors = getValidationErrors(err);
  const errorsObj = {};

  for (const key in errors) {
    if (Object.hasOwnProperty.call(errors, key)) {
      const error = errors[key][0];
      errorsObj[key] = error;
    }
  }

  return errorsObj;
}
