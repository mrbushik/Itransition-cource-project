import axios from 'axios';

const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: 'Bearer ' + token },
};

export const allUsers = (theme) => ({
  type: 'ALL_USERS',
  payload: theme,
});

export const adminCollections = (theme) => ({
  type: 'ADMIN_COLLECTIONS',
  payload: theme,
});

export const getAllUsers = (url) => (dispatch) => {
  axios
    .get(url, config)
    .then((data) => dispatch(allUsers(data.data.users)))
    .catch((error) => {
      console.log(error);
    });
};

export const getAdminCollections = (url) => (dispatch) => {
  axios
    .get(url)
    .then((data) => dispatch(adminCollections(data.data.collections)))
    .catch((error) => {
      console.log(error);
    });
};
