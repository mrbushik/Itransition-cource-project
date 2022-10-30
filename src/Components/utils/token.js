export function getToken() {
  const token = localStorage.getItem('accessToken');
  const config = {
    headers: { Authorization: 'Bearer ' + token },
  };
  return config;
}
export function getRefreshToken() {
  const token = localStorage.getItem('autoLogin');
  const config = { refreshToken: token };

  return config;
}
