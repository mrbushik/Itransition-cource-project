import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logout } from '../utils/logout';

import SwitchLanguage from '../common/buttons/switchLanguage';
import ThemeSwither from '../common/buttons/themeSwither';
import Searcher from '../ui/searcher';
import transtateKeys from '../translate/transtateKeys';
import MobileNavBar from './mobileNavBar';

function NavBar() {
  const { t } = useTranslation();

  const userName = localStorage.getItem('user');
  const userRole = localStorage.getItem('role');

  const [menu, setMenu] = useState(false);

  const toggleMenu = () => setMenu(!menu);

  return (
    <div className="bg-light grey-element">
      <nav className={'navbar navbar-expand-lg bg-light dark-mode'}>
        <div className="container-fluid  p-2 ">
          <Link to="/" className="text-decoration-none ">
            {t(transtateKeys.MAIN_PAGE)}
          </Link>
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
      {menu && <MobileNavBar userName={userName} logout={logout} userRole={userRole} />}
      <div className="d-flex align-items-center justify-content-between  nav-toggle__buttons ">
        <div className="mx-3 d-flex align-items-center px-3 grey-element">
          <SwitchLanguage />
        </div>
        <div className="grey-element">
          <Searcher />
        </div>
        <div className="mx-3 ">
          <ThemeSwither />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
