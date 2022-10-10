/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validator } from '../utils/validator';

import TextField from '../common/form/textField';

function RegisterForm({ togleFormType, onSubmit }) {
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
      min: {
        message: t('password error'),
        value: 5,
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const comparisonPasswords = () => {
    const passwordsData = Object.values(data);
    if (passwordsData[1] !== passwordsData[2]) {
      setErrors((prevState) => ({ ...prevState, repeat: t("passwords don't match") }));
    } else if (passwordsData[1] === passwordsData[2]) {
      delete errors.repeat;
    }
  };

  useEffect(() => {
    validate();
    comparisonPasswords();
  }, [data]);

  const handleSubmit = (e) => {
    const submitData = {
      username: data.username.trim(),
      password: data.password,
    };
    onSubmit(e, submitData);
  };

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
      <TextField
        label={t('repeat password')}
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
        {t('submit')}
      </button>
      <a role="button" onClick={togleFormType}>
        {t('sing in')}
      </a>
    </>
  );
}

export default RegisterForm;
