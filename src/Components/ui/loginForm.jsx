/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validator } from '../utils/validator';
import PropTypes from 'prop-types';

import TextField from '../common/form/textField';
import { activateRequest } from '../services/loginRequest';
import ActivateMail from './activateMail';

function LoginForm({ toggleFormType, onSubmit, successfulSigup, authData, loginError }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});
  const [activateEmail, setActivateEmail] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (loginError === 'User is not activated') {
      setActivateEmail(true);
      console.log('yes');
    }
  }, [loginError]);

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
    email: {
      isRequired: {
        message: t('field required'),
      },
      isEmail: {
        message: t('email error'),
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    const submitData = {
      email: data.email.trim(),
      password: data.password,
    };
    onSubmit(e, submitData);
  };

  useEffect(() => {
    validate();
  }, [data]);

  const resendMail = (email) => {
    activateRequest(authData.email, setErrors);
  };

  const isValid = Object.keys(errors).length === 0;
  return (
    <>
      <TextField
        label={t('email')}
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <i className="bi bi-apple"></i>
      <TextField
        label={t('password')}
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      {successfulSigup && !activateEmail && (
        <div className="m-3">
          <p>{t('success register')}</p>
          <div className="btn btn-secondary" onClick={() => resendMail(authData.email)}>
            {t('resend')}
          </div>
        </div>
      )}
      <ActivateMail resendMail={resendMail} />
      <button
        className="btn btn-primary w-100 mx-auto mb-2"
        type="submit"
        disabled={!isValid}
        onClick={(e) => handleSubmit(e)}>
        {t('submit')}
      </button>
      <a role="button" onClick={toggleFormType}>
        {t('sing up')}
      </a>
    </>
  );
}
LoginForm.propTypes = {
  toggleFormType: PropTypes.func.isRequired,
};

export default LoginForm;
