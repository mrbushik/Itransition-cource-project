import axios from 'axios';
const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: 'Bearer ' + token },
};

export function unblock(url, setUsers) {
  axios
    .patch(url, { roles: ['USER'] }, config)
    .then((response) => setUsers())
    .catch((error) => {
      console.log(error);
    });
}

export function deleteUser(url, setUsers) {
  axios
    .delete(url, config)
    .then((response) => setUsers())
    .catch((error) => {
      console.log(error);
    });
}

export function block(url, setUsers) {
  axios
    .patch(url, { roles: ['BLOCK'] }, config)
    .then((response) => setUsers())
    .catch((error) => {
      console.log(error);
    });
}

export function getAdmin(url, setUsers) {
  axios
    .patch(url, { roles: ['ADMIN'] }, config)
    .then((response) => setUsers())
    .catch((error) => {
      console.log(error);
    });
}

export function pickUpAdmin(url, setUsers) {
  axios
    .patch(url, { roles: ['USER'] }, config)
    .then((response) => setUsers())
    .catch((error) => {
      console.log(error);
    });
}

export function getUserPages(url, setCountPages) {
  axios
    .get(url)
    .then((data) => setCountPages(data.data.total))
    .catch((error) => {
      console.log(error);
    });
}
