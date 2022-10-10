import axios from 'axios';
export function unblock(url, setUsers) {
  axios
    .patch(url, { roles: ['USER'] })
    .then((response) => response)
    .then((data) => getUsers(setUsers))
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
export function deleteUser(url, setUsers) {
  axios
    .delete(url)
    .then((response) => response)
    .then((data) => getUsers(setUsers))
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
export function block(url, setUsers) {
  axios
    .patch(url, { roles: ['BLOCK'] })
    .then((response) => response)
    .then((data) => getUsers(setUsers))
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
export function getAdmin(url, setUsers) {
  axios
    .patch(url, { roles: ['ADMIN'] })
    .then((response) => response)
    .then((data) => getUsers(setUsers))
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
export function pickUpAdmin(url, setUsers) {
  axios
    .patch(url, { roles: ['USER'] })
    .then((response) => response)
    .then((data) => getUsers(setUsers))
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
