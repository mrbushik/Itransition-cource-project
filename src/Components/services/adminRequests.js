import axios from 'axios';
const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: 'Bearer ' + token },
};
export function unblock(url, setUsers) {
  // var myHeaders = new Headers();
  // myHeaders.append(`Authorization", "Bearer ${token}`);
  // myHeaders.append('Content-Type', 'application/json');

  // var raw = JSON.stringify({
  //   "id": "634edccd237d6432805b0949",
  //   "roles": [
  //     "USER"
  //   ]
  // });

  // var requestOptions = {
  //   method: 'PATCH',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };

  // fetch("http://localhost:5000/api/change-status/634fe643f802470d0856be4c", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
  axios
    .patch(url, { roles: ['USER'] }, config)
    .then((response) => response)
    .then((response) => getUsers(setUsers))
    .catch((error) => {
      //   setRequestStatus(error.response.response);
    });
}
export function deleteUser(url, setUsers) {
  axios
    .delete(url, config)
    .then((response) => response)
    .then((response) => getUsers(setUsers))
    .catch((error) => {
      //   setRequestStatus(error.response.response);
    });
}
export function block(url, setUsers) {
  axios
    .patch(url, { roles: ['BLOCK'] }, config)
    .then((response) => response)
    .then((response) => getUsers(setUsers))
    .catch((error) => {
      //   setRequestStatus(error.response.response);
    });
}
export function getAdmin(url, setUsers) {
  axios
    .patch(url, { roles: ['ADMIN'] }, config)
    .then((response) => response)
    .then((response) => getUsers(setUsers))
    .catch((error) => {
      //   setRequestStatus(error.response.response);
    });
}
export function pickUpAdmin(url, setUsers) {
  axios
    .patch(url, { roles: ['USER'] }, config)
    .then((response) => response)
    .then((response) => getUsers(setUsers))
    .catch((error) => {
      //   setRequestStatus(error.response.data);
    });
}
export function getUsers(setUsers) {
  axios
    .get('http://localhost:5000/api/all-users', config)
    .then((response) => response)
    .then((data) => setUsers(data.data.users));
}
