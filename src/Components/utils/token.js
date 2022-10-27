export function getToken() {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: 'Bearer ' + token },
  };
  return config;
}
export function getRefreshToken() {
  const token = localStorage.getItem('refreshToken');
  const config = { refreshToken: token };

  return config;
}
