import axios from 'axios';

export function unblock(url, setUsers, token) {
  axios
    .patch(url, { roles: ['USER'] }, token)
    .then((response) => setUsers())
    .catch((error) => {
      console.log(error);
    });
}

export function deleteUser(url, setUsers, token) {
  axios
    .delete(url, token)
    .then((response) => setUsers())
    .catch((error) => {
      console.log(error);
    });
}

export function block(url, setUsers, token) {
  axios
    .patch(url, { roles: ['BLOCK'] }, token)
    .then((response) => setUsers())
    .catch((error) => {
      console.log(error);
    });
}

export function getAdmin(url, setUsers, token) {
  axios
    .patch(url, { roles: ['ADMIN'] }, token)
    .then((response) => setUsers())
    .catch((error) => {
      console.log(error);
    });
}

export function pickUpAdmin(url, setUsers, token) {
  axios
    .patch(url, { roles: ['USER'] }, token)
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
