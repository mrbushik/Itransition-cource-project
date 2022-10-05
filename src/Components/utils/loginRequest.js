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
