import { logoutRequest } from '../services/loginRequest';
const logoutURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/logout`;
const refreshToken = document.cookie;

export function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  logoutRequest(logoutURL, refreshToken);
  document.cookie = '';
}
