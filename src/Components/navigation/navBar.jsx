import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../redux/actions/language';
import useLocalStorage from '../translate/recordLanguage';
import i18n from '../translate/languageParams';
function NavBar() {
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
  const [language, setLanguage] = useLocalStorage('language', 'en');
  const handleLenguageChange = () => {
    if (language === 'en') {
      i18n.changeLanguage('ru');
      setLanguage('ru');
      dispatch(changeLanguage('ru'));
    } else if (language === 'ru') {
      i18n.changeLanguage('en');
      setLanguage('en');
      dispatch(changeLanguage('en'));
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/" className="text-decoration-none">
          {t('main page')}

          {/* Main page */}
        </Link>
        {userRole === 'ADMIN' ? (
          <Link to="/admin-panel" className="text-decoration-none ms-3">
            {/* Admin panel */}
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
                  {/* My collection */}
                  {t('my collection')}
                </Link>
              )}
            </li>
            <li>
              <button onClick={handleLenguageChange}>
                {t('change to')} {language === 'ru' ? t('english') : t('russian')}
              </button>
            </li>
          </ul>
          <div>
            {userName && <span className="fs-4 mx-2">{userName}</span>}
            <div className="vr bg-dark"></div>
            {userName ? (
              <Link to="/login" className="navbar-brand ms-2" onClick={deleteUserData}>
                {/* LOG OUT */}
                {t('log out')}
              </Link>
            ) : (
              <Link to="/login" className="navbar-brand ms-2" onClick={deleteUserData}>
                {/* LOG IN */}
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
