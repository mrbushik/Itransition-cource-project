import axios from 'axios';
export function unblock(url, data, setRequestStatus) {
  axios
    .put(url, { roles: ['USER'] })
    .then((response) => response)
    .then((data) => setRequestStatus(data.data))
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
export function deleteUser(url, data) {
  axios
    .delete(url)
    .then((response) => response)
    // .then((data) => setRequestStatus(data.data))
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
export function block(url, data, setRequestStatus) {
  axios
    .put(url, { roles: ['BLOCK'] })
    .then((response) => response)
    .then((data) => setRequestStatus(data.data))
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
export function getAdmin(url, data, setRequestStatus) {
  axios
    .put(url, { roles: ['ADMIN'] })
    .then((response) => response)
    .then((data) => setRequestStatus(data.data))
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
export function pickUpAdmin(url, data, setRequestStatus) {
  axios
    .put(url, { roles: ['USER'] })
    .then((response) => response)
    .then((data) => setRequestStatus(data.data))
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
export function getUsers(setUsers) {
  axios
    .get('http://localhost:5000/api/all-users')
    .then((response) => response)
    .then((data) => setUsers(data.data.users));
}
