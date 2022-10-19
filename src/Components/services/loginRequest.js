import axios from 'axios';
export function loginRequest(url, data, setRequestStatus, setUserInfo) {
  axios
    .post(url, data)
    .then((response) => response)
    .then((data) => setUserInfo(data.data))
    .catch((error) => {
      setRequestStatus(error.response.data);
    });
}
export function registrationRequest(data, setRequestStatus, setUserInfo) {
  axios
    .post('http://localhost:5000/api/sign-up', data)
    .then((data) => setUserInfo(data.data))
    .catch((error) => {
      setRequestStatus(error.response.data);
    });
}

export function activateRequest(data, setRequestStatus) {
  axios
    .post('http://localhost:5000/api/email', { email: data })
    .then((data) => data.data)
    .catch((error) => {
      setRequestStatus(error);
    });
}

export function logoutRequest(url) {
  axios
    .post(url)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}
