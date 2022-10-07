/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { validator } from '../utils/validator';
import { loginRequest } from '../services/loginRequest';

import TextField from '../../Components/common/form/textField';
// добавить кнопки языка и темной темы
function Login() {
  const { t } = useTranslation();
  const { type } = useParams();
  const [formType, setFormType] = useState(type === 'register' ? type : 'login');
  const togleFormType = () => {
    setFormType((pervState) => (pervState === 'register' ? 'login' : 'register'));
  };

  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useState({});
  const history = useHistory();

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

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    formType === 'login'
      ? loginRequest('http://localhost:5000/api/login', data, setErrors, setAuth)
      : loginRequest('http://localhost:5000/api/registration', data, setErrors);
  };

  const writeUserData = () => {
    localStorage.setItem('user', auth.username);
    localStorage.setItem('token', auth.token);
    localStorage.setItem('role', auth.userRole);
    localStorage.setItem('userId', auth.userId);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/collection');
    }
  }, []);

  useEffect(() => {
    if (auth.token) {
      writeUserData();
      history.push('/collection');
    }
  }, [auth]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {formType === 'register' ? (
              <h3 className="mb-4">{t('sing up')}</h3>
            ) : (
              <h3 className="mb-4">{t('sing in')}</h3>
            )}
            <form onSubmit={handleSubmit}>
              {data && (
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
                </>
              )}
              <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
                {t('submit')}
              </button>
              {errors.message ? (
                <span className="text-danger mt-2 mb-2">{errors.message}</span>
              ) : (
                <div className=""></div>
              )}
            </form>
            <p>{t('have account')}</p>{' '}
            {formType === 'register' && (
              <a role="button" onClick={togleFormType}>
                {t('sign in')}
              </a>
            )}
            {formType === 'login' && (
              <a role="button" onClick={togleFormType}>
                {t('sing up')}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
