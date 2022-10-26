import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout } from '../utils/logout';

import SwitchLanguage from '../common/buttons/switchLanguage';
import ThemeSwither from '../common/buttons/themeSwither';
import Searcher from '../ui/searcher';
import transtateKeys from '../translate/transtateKeys';

function NavBar() {
  const { t } = useTranslation();

  const userName = localStorage.getItem('user');
  const userRole = localStorage.getItem('role');

  const [menu, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!menu);

  return (
    <div className="bg-light">
      <nav className={'navbar navbar-expand-lg bg-light dark-mode'}>
        <div className="container-fluid  p-2 dark-mode">
          <div>
            <Link to="/" className="text-decoration-none">
              {t(transtateKeys.MAIN_PAGE)}
            </Link>
          </div>
          <button className="navbar-toggler white-element" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {userName && (
                  <Link to="/collection" className="text-decoration-none ms-3">
                    {t(transtateKeys.MY_COLLECTON)}
                  </Link>
                )}
              </li>
              <li>
                {userRole === 'ADMIN' && (
                  <Link to="/admin-panel" className="text-decoration-none ms-3">
                    {t(transtateKeys.ADMIN_PANEL)}
                  </Link>
                )}
              </li>
            </ul>
            <div>
              <div>
                {' '}
                {userName && <span className="fs-4 mx-2">{userName}</span>}
                {userName && <div className="vr bg-dark white-element"></div>}
                {userName ? (
                  <Link to="/login" className={'navbar-brand ms-2 '} onClick={logout}>
                    {t(transtateKeys.LOG_OUT)}
                  </Link>
                ) : (
                  <Link to="/login" className={'navbar-brand ms-2 '} onClick={logout}>
                    {t(transtateKeys.LOG_IN)}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      {menu && (
        <div className="nav-phone__menu pb-3 white-element bg-secondary bg-opacity-10 pt-3">
          <div className="text-center white-element ">
            {userName && <span className="fs-4 mx-2">{userName}</span>}
            {userName && <div className="vr bg-dark dark-mode"></div>}
            {userName ? (
              <Link to="/login" className={'navbar-brand ms-2 white-element'} onClick={logout}>
                {t(transtateKeys.LOG_OUT)}
              </Link>
            ) : (
              <Link to="/login" className={'navbar-brand ms-2 white-element'} onClick={logout}>
                {t(transtateKeys.LOG_IN)}
              </Link>
            )}
          </div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-center ">
            <li className="nav-item">
              {userName && (
                <Link to="/collection" className="text-decoration-none ms-3 white-element">
                  {t(transtateKeys.MY_COLLECTON)}
                </Link>
              )}
            </li>
            <li>
              {userRole === 'ADMIN' && (
                <Link to="/admin-panel" className="text-decoration-none ms-3 white-element">
                  {t(transtateKeys.ADMIN_PANEL)}
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
        </div>
      )}
      <div className="d-flex align-items-center justify-content-between dark-mode nav-toggle__buttons">
        <div className="mx-3 d-flex align-items-center px-3 dark-mode">
          <SwitchLanguage />
        </div>
        {/* <Searcher /> */}
        <div className="mx-3 ">
          <ThemeSwither />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
