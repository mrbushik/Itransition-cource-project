import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../redux/actions/language';
import useLocalStorage from '../translate/recordLanguage';
import i18n from '../translate/languageParams';
import SwitchLanguage from '../common/buttons/switchLanguage';
import ThemeSwither from '../common/buttons/themeSwither';
function NavBar({ theme }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userName = localStorage.getItem('user');
  const userRole = localStorage.getItem('role');
  const deleteUserData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  };

  return (
    <nav className={'navbar navbar-expand-lg bg-light dark-mode'}>
      <div className="container-fluid dark-mode">
        <Link to="/" className="text-decoration-none">
          {t('main page')}
        </Link>
        {userRole === 'ADMIN' ? (
          <Link to="/admin-panel" className="text-decoration-none ms-3">
            {t('admin panel')}
          </Link>
        ) : (
          ''
        )}
        <button className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {userName && (
                <Link to="/collection" className="text-decoration-none ms-3">
                  {t('my collection')}
                </Link>
              )}
            </li>
            <li>
              <SwitchLanguage />
            </li>
            <li>
              <ThemeSwither />
            </li>
          </ul>
          <div>
            {userName && <span className="fs-4 mx-2">{userName}</span>}
            <div className="vr bg-dark"></div>
            {userName ? (
              <Link to="/login" className={'navbar-brand ms-2 '} onClick={deleteUserData}>
                {t('log out')}
              </Link>
            ) : (
              <Link to="/login" className={'navbar-brand ms-2 '} onClick={deleteUserData}>
                {t('log in')}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
