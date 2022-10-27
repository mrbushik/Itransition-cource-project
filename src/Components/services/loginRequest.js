import axios from 'axios';
export function loginRequest(url, data, setRequestStatus, setUserInfo) {
  axios
    .post(url, data)
    .then((data) => setUserInfo(data.data))
    .catch((error) => {
      setRequestStatus(error.response.data);
    });
}
export function registrationRequest(url, data, setRequestStatus, setUserInfo) {
  axios
    .post(url, data)
    .then((data) => setUserInfo(data.data))
    .catch((error) => {
      setRequestStatus(error.response.data);
    });
}

export function autoLogin(url, token, setUserInfo) {
  axios
    .post(url, token)
    .then((data) => (data.data ? setUserInfo(data.data) : ''))
    .catch((error) => {
      console.log(error);
    });
}

export function activateRequest(url, data, setRequestStatus) {
  axios
    .post(url, { email: data })
    .then((data) => data.data)
    .catch((error) => {
      setRequestStatus(error);
    });
}

export function logoutRequest(url, token) {
  axios.post(url, { refreshToken: token }).catch((error) => {
    console.log(error);
  });
}
