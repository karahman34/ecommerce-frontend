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

export function getErrorCode(err) {
  return err?.response?.status;
}

export function setField(key, input, setForm, setErrors) {
  setForm((prevFields) => ({
    ...prevFields,
    [key]: input,
  }));

  setErrors((prevErrors) => {
    if (prevErrors[key] !== null) {
      return {
        ...prevErrors,
        [key]: null,
      };
    }

    return prevErrors;
  });
}

export function setValidationErrors(err, setErrors) {
  const errors = getValidationErrorsObject(err);
  const errorKeys = Object.keys(errors);

  setErrors((prevErrors) => {
    const newErrors = {};

    for (const key in prevErrors) {
      if (Object.hasOwnProperty.call(prevErrors, key)) {
        newErrors[key] = errorKeys.includes(key) ? errors[key] : null;
      }
    }

    return newErrors;
  });
}
