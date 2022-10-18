/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loginRequest } from '../services/loginRequest';

import ThemeSwither from '../common/buttons/themeSwither';
import SwitchLanguage from '../common/buttons/switchLanguage';
import LoginForm from '../ui/loginForm';
import RegisterForm from '../ui/registerForm';
function Login() {
  const { t } = useTranslation();
  const { type } = useParams();
  const history = useHistory();

  const [formType, setFormType] = useState(type === 'register' ? type : 'login');

  const [errors, setErrors] = useState({});
  const [auth, setAuth] = useState({});

  const togleFormType = () => {
    setFormType((pervState) => (pervState === 'register' ? 'login' : 'register'));
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();
    sendingTargetForm(data);
  };

  const sendingTargetForm = (data) => {
    formType === 'login'
      ? loginRequest('http://localhost:5000/api/login', data, setErrors, setAuth)
      : loginRequest('http://localhost:5000/api/sing-up', data, setErrors, setAuth);
  };

  const writeUserData = () => {
    localStorage.setItem('user', auth.username);
    localStorage.setItem('token', auth.token);
    localStorage.setItem('role', auth.userRole);
    localStorage.setItem('userId', auth.userId);
    document.cookie = 'nikita';
    console.log(document.cookie);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      history.push('/collection');
    }
  }, []);

  useEffect(() => {
    if (auth.token) {
      writeUserData();
      history.push('/');
    }
  }, [auth]);

  return (
    <>
      <div className="m-3 d-flex justify-content-between">
        <div>
          <div className="  d-flex align-items-center ">
            {' '}
            <SwitchLanguage />
          </div>
          <div className="">
            <ThemeSwither />
          </div>
        </div>
        <div className="my-3">
          <Link to="/">
            <div className="btn btn-secondary">{t('to main page')}</div>
          </Link>
        </div>
      </div>
      <div className=" m-5  ">
        <div className="row ">
          <div className="col-md-6 offset-md-3 shadow p-4  dark-mode">
            {formType === 'register' ? (
              <h3 className="mb-4">{t('sing up')}</h3>
            ) : (
              <h3 className="mb-4">{t('sing in')}</h3>
            )}
            <form className="dark-mode">
              <div className="mb-3">
                {formType === 'login' ? (
                  <LoginForm toggleFormType={togleFormType} onSubmit={handleSubmit} />
                ) : (
                  <RegisterForm toggleFormType={togleFormType} onSubmit={handleSubmit} />
                )}
              </div>
              {errors.message ? (
                <span className="text-danger mt-2 mb-2">{errors.message}</span>
              ) : (
                <div className=""></div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
