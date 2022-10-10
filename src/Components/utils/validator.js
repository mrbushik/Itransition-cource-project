export function validator(data, config) {
  const errors = {};
  function validate(validateMethod, data, config) {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === '';
        }
        break;
      }
      case 'min': {
        statusValidate = data.length < config.value;
        break;
      }
      // case 'comparison': {
      //   console.log(data);
      //   statusValidate = data.password !== data.repeat && data.repeat !== '';
      //   break;
      // }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }
  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(validateMethod, data[fieldName], config[fieldName][validateMethod]);
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
