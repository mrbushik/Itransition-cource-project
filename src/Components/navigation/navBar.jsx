import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  const userName = localStorage.getItem('user');
  const userRole = localStorage.getItem('role');
  const deleteUserData = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/" className="text-decoration-none">
          Main page
        </Link>
        {userRole === 'ADMIN' ? (
          <Link to="/admin-panel" className="text-decoration-none ms-3">
            Admin panel
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
                  My collection
                </Link>
              )}
            </li>
          </ul>
          <div>
            {userName && <span className="fs-4 mx-2">{userName}</span>}
            <div className="vr bg-dark"></div>
            {userName ? (
              <Link to="/login" className="navbar-brand ms-2" onClick={deleteUserData}>
                LOG OUT
              </Link>
            ) : (
              <Link to="/login" className="navbar-brand ms-2" onClick={deleteUserData}>
                LOG IN
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
