/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { autoLogin, loginRequest, registrationRequest } from '../services/loginRequest';
import { getRefreshToken } from '../utils/token';

import ThemeSwither from '../common/buttons/themeSwither';
import SwitchLanguage from '../common/buttons/switchLanguage';
import LoginForm from '../ui/loginForm';
import RegisterForm from '../ui/registerForm';
import translateKeys from '../translate/translateKeys';

function Login() {
  const { t } = useTranslation();
  const { type } = useParams();
  const history = useHistory();

  const singUpURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/sign-up`;
  const loginURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/login`;
  const autoLoginURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/check-user`;

  const [formType, setFormType] = useState(type === 'register' ? type : 'login');
  const [successfulSigup, setSuccessfulSigup] = useState(false);
  const [errors, setErrors] = useState();
  const [auth, setAuth] = useState();

  const togleFormType = () => {
    setFormType((pervState) => (pervState === 'register' ? 'login' : 'register'));
  };

  const handleSubmit = (e, data) => {
    e.preventDefault();
    sendingTargetForm(data);
  };

  const sendingTargetForm = (data) => {
    formType === 'login' ? loginRequest(loginURL, data, setErrors, setAuth) : registration(data);
  };

  const registration = (data) => {
    registrationRequest(singUpURL, data, setErrors, setAuth);
  };

  const writeUserData = () => {
    localStorage.setItem('user', auth.user.username);
    localStorage.setItem('accessToken', auth.accessToken);
    localStorage.setItem('role', auth.user.roles[0]);
    localStorage.setItem('userId', auth.user._id);
    localStorage.setItem('refreshToken', auth.refreshToken);
  };

  useEffect(() => {
    if (localStorage.getItem('accessToken')) history.push('/');
    autoLogin(autoLoginURL, getRefreshToken(), setAuth);
  }, []);

  useEffect(() => {
    onSingIn();
    onSendRequest();
  }, [auth]);

  const onSingIn = () => {
    if (auth && !auth.user.isActivated) {
      localStorage.setItem('autoLogin', auth.refreshToken);
      setSuccessfulSigup(true);
      togleFormType();
    }
  };

  const onSendRequest = () => {
    if (auth && auth.user.isActivated) {
      writeUserData();
      history.push('/');
    }
  };

  return (
    <>
      <div className="m-3 d-flex justify-content-between">
        <div>
          <div className="  d-flex align-items-center ">
            <SwitchLanguage />
          </div>
          <div className="">
            <ThemeSwither />
          </div>
        </div>
        <div className="my-3">
          <Link to="/">
            <div className="btn btn-secondary">{t(translateKeys.TO_MAIN_PAGE)}</div>
          </Link>
        </div>
      </div>
      <div className=" m-5  ">
        <div className="row ">
          <div className="col-md-6 offset-md-3 shadow p-4  dark-mode">
            {formType === 'register' ? (
              <h3 className="mb-4">{t(translateKeys.SING_UP)}</h3>
            ) : (
              <h3 className="mb-4">{t(translateKeys.SING_IN)}</h3>
            )}
            <form className="grey-element">
              <div className="mb-3">
                {formType === 'login' ? (
                  <LoginForm
                    toggleFormType={togleFormType}
                    onSubmit={handleSubmit}
                    successfulSingUp={successfulSigup}
                    authData={auth}
                    loginError={errors}
                  />
                ) : (
                  <RegisterForm
                    toggleFormType={togleFormType}
                    onSubmit={handleSubmit}
                    registerError={errors}
                  />
                )}
              </div>
              {errors && <span className="text-danger mt-2 mb-2">{errors.message}</span>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
