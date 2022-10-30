/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validator } from '../utils/validator';
import PropTypes from 'prop-types';

import TextField from '../common/form/textField';
import translateKeys from '../translate/translateKeys';

function RegisterForm({ toggleFormType, onSubmit }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    repeat: '',
  });

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    username: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
      },
      max: {
        message: t(translateKeys.FIELD_MAX_LENGTH),
        value: 30,
      },
    },
    email: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
      },
      isEmail: {
        message: t(translateKeys.EMAIL_ERROR),
      },
    },
    password: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
      },
      min: {
        message: t(translateKeys.PASSWORD_ERROR),
        value: 5,
      },
      max: {
        message: t(translateKeys.FIELD_MAX_LENGTH),
        value: 30,
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
  };

  const comparisonPasswords = () => {
    const passwordsData = Object.values(data);
    if (passwordsData[2] !== passwordsData[3]) {
      setErrors((prevState) => ({ ...prevState, repeat: t(translateKeys.PASSWORDS_DONT_MATCH) }));
    }
  };

  useEffect(() => {
    validate();
    comparisonPasswords();
  }, [data]);

  const handleSubmit = (e) => {
    const submitData = {
      username: data.username.trim(),
      email: data.email.trim(),
      password: data.password,
    };
    onSubmit(e, submitData);
  };

  const isValid = !Object.keys(errors).length;

  return (
    <>
      <TextField
        label={t(translateKeys.USERNAME)}
        name="username"
        value={data.username}
        onChange={handleChange}
        error={errors.username}
      />
      <TextField
        label={t(translateKeys.EMAIL)}
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label={t(translateKeys.PASSWORD)}
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <TextField
        label={t(translateKeys.REPEATE_PASSWORD)}
        type="password"
        name="repeat"
        value={data.repeat}
        onChange={handleChange}
        error={errors.repeat}
      />
      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid}
        onClick={(e) => handleSubmit(e)}>
        {t(translateKeys.SUBMIT)}
      </button>
      <a role="button" onClick={toggleFormType}>
        {t(translateKeys.SING_IN)}
      </a>
    </>
  );
}

RegisterForm.propTypes = {
  toggleFormType: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default RegisterForm;
