import { logoutRequest } from '../services/loginRequest';
const logoutURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/logout`;

export function logout(refreshToken) {
  logoutRequest(logoutURL, refreshToken);
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('autoLogin');
}
