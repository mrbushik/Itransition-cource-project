/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { loginRequest, registrationRequest } from '../services/loginRequest';

import ThemeSwither from '../common/buttons/themeSwither';
import SwitchLanguage from '../common/buttons/switchLanguage';
import LoginForm from '../ui/loginForm';
import RegisterForm from '../ui/registerForm';
function Login() {
  const { t } = useTranslation();
  const { type } = useParams();
  const history = useHistory();

  const [formType, setFormType] = useState(type === 'register' ? type : 'login');
  const [successfulSigup, setSuccessfulSigup] = useState(false);
  const [errors, setErrors] = useState();
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
      : registration(data);
  };

  const registration = (data) => {
    registrationRequest(data, setErrors, setAuth);
  };

  const writeUserData = () => {
    localStorage.setItem('user', auth.user.username);
    localStorage.setItem('token', auth.accessToken);
    localStorage.setItem('role', auth.user.roles[0]);
    localStorage.setItem('userId', auth.user._id);
    document.cookie = auth.refreshToken;
  };

  useEffect(() => {
    if (localStorage.getItem('token')) history.push('/collection');
  }, []);

  useEffect(() => {
    if (auth.isActivated === false) {
      setSuccessfulSigup(true);
      togleFormType();
    }
  }, [auth]);

  useEffect(() => {
    if (auth.accessToken) {
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
                  <LoginForm
                    toggleFormType={togleFormType}
                    onSubmit={handleSubmit}
                    successfulSigup={successfulSigup}
                    authData={auth}
                    loginError={errors}
                  />
                ) : (
                  <RegisterForm toggleFormType={togleFormType} onSubmit={handleSubmit} />
                )}
              </div>
              {errors && <span className="text-danger mt-2 mb-2">{errors}</span>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
