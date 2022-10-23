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

export const getAdminCollections = (url) => async (dispatch) => {
  await axios
    .get(url)
    .then((data) => dispatch(adminCollections(data.data)))
    .catch((error) => {
      // console.log(error)
    });
  // fetch(url, { method: 'GET' })
  //   .then((response) => response.json())
  //   .then((result) =>
  //     result.length === 0
  //       ? dispatch(adminCollections(''))
  //       : dispatch(adminCollections(result.collections)),
  //   )
  //   .catch((error) => console.log(error));
};
