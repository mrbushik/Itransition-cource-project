import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import SwitchLanguage from '../common/buttons/switchLanguage';
import ThemeSwither from '../common/buttons/themeSwither';
import Searcher from '../ui/searcher';
import translateKeys from '../translate/translateKeys';

function MobileNavBar({ userName, logout, userRole, refreshToken }) {
  const { t } = useTranslation();

  return (
    <div className="nav-phone__menu pb-3 grey-element bg-secondary bg-opacity-10 pt-3">
      <div className="text-center grey-element ">
        {userName && <span className="fs-4 mx-2">{userName}</span>}
        {userName && <span className="vr bg-dark separator "></span>}
        {userName ? (
          <Link
            to="/login"
            className={'navbar-brand ms-2 text-primary'}
            onClick={() => logout(refreshToken)}>
            {t(translateKeys.LOG_OUT)}
          </Link>
        ) : (
          <Link
            to="/login"
            className={'navbar-brand ms-2 white-element'}
            onClick={() => logout(refreshToken)}>
            {t(translateKeys.LOG_IN)}
          </Link>
        )}
      </div>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center ">
        <li className="nav-item">
          {userName && (
            <Link to="/collection" className="text-decoration-none ms-3 white-element">
              {t(translateKeys.MY_COLLECTON)}
            </Link>
          )}
        </li>
        <li>
          {userRole === 'ADMIN' && (
            <Link to="/admin-panel" className="text-decoration-none ms-3 white-element">
              {t(translateKeys.ADMIN_PANEL)}
            </Link>
          )}
        </li>
      </ul>
      <div className="mx-3 d-flex align-items-center px-3 white-element">
        <SwitchLanguage />
      </div>
      <div className="mx-3 px-3 white-element">
        <ThemeSwither />
      </div>
      <div className="grey-element ms-3 mt-3">
        <Searcher />
      </div>
    </div>
  );
}

export default MobileNavBar;
