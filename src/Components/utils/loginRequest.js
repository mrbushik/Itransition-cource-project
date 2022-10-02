import axios from 'axios';
export function loginRequest(url, data, setRequestStatus) {
  axios
    .post(url, data)
    .then((response) => response)
    .then((data) => setRequestStatus(data.data))
    .catch((error) => {
      setRequestStatus(error.response.data);
    });
}
