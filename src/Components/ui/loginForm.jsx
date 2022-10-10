/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { validator } from '../utils/validator';

import TextField from '../common/form/textField';

function LoginForm({ togleFormType, onSubmit }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    username: '',
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
        message: t('field required'),
      },
    },
    password: {
      isRequired: {
        message: t('field required'),
      },
    },
    // ошибка пароли не совпадают
  };
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  useEffect(() => {
    validate();
  }, [data]);
  const isValid = Object.keys(errors).length === 0;

  return (
    <>
      <TextField
        label={t('username')}
        name="username"
        value={data.username}
        onChange={handleChange}
        error={errors.username}
      />
      <TextField
        label={t('password')}
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button
        className="btn btn-primary w-100 mx-auto mb-2"
        type="submit"
        disabled={!isValid}
        onClick={(e) => onSubmit(e, data)}>
        {t('submit')}
      </button>
      <a role="button" onClick={togleFormType}>
        {t('sing up')}
      </a>
    </>
  );
}

export default LoginForm;
