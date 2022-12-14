/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { validator } from '../utils/validator';
import { activateRequest } from '../services/loginRequest';

import TextField from '../common/form/textField';
import ActivateMail from './activateMail';
import HideBtn from '../common/buttons/hideBtn';
import translateKeys from '../translate/translateKeys';

function LoginForm({ toggleFormType, onSubmit, successfulSingUp, authData, loginError }) {
  const { t } = useTranslation();
  const activateURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/email`;

  const ACTIVATED_ERROR = 'User is not activated';

  const [errors, setErrors] = useState({});
  const [activateEmail, setActivateEmail] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const activationToggle = (params) => setActivateEmail(params);

  useEffect(() => {
    if (loginError && loginError.message === ACTIVATED_ERROR) activationToggle(true);
  }, [loginError]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    password: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
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
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
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
    activateRequest(activateURL, email, setErrors);
  };

  const isValid = !Object.keys(errors).length;

  return (
    <>
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
      {successfulSingUp && !activateEmail && (
        <div className="m-3">
          <p>{t(translateKeys.SUCCESS_REGISTER)}</p>
          <div className="btn btn-secondary" onClick={() => resendMail(authData.user.email)}>
            {t(translateKeys.RESEND)}
          </div>
        </div>
      )}
      {loginError && loginError.message === ACTIVATED_ERROR && (
        <div className="p-2 border border-danger mb-3">
          <HideBtn onDelete={activationToggle} />
          {activateEmail && <ActivateMail resendMail={resendMail} />}
        </div>
      )}
      <button
        className="btn btn-primary w-100 mx-auto mb-2"
        type="submit"
        disabled={!isValid}
        onClick={(e) => handleSubmit(e)}>
        {t(translateKeys.SUBMIT)}
      </button>
      <a role="button" onClick={toggleFormType}>
        {t(translateKeys.SING_UP)}
      </a>
    </>
  );
}

LoginForm.propTypes = {
  loginError: PropTypes.object,
  onSubmit: PropTypes.func,
  successfulSingUp: PropTypes.bool,
  toggleFormType: PropTypes.func.isRequired,
};

export default LoginForm;
