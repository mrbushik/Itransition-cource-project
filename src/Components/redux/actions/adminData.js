import axios from 'axios';

export const allUsers = (theme) => ({
  type: 'ALL_USERS',
  payload: theme,
});

export const adminCollections = (theme) => ({
  type: 'ADMIN_COLLECTIONS',
  payload: theme,
});

export const adminErrors = (theme) => ({
  type: 'ADMIN_ERRORS',
  payload: theme,
});

export const getAllUsers = (url, token) => (dispatch) => {
  axios
    .get(url, token)
    .then((data) => dispatch(allUsers(data.data.users)))
    .catch((error) => {
      dispatch(adminErrors(error));
    });
};

export const getAdminCollections = (url) => async (dispatch) => {
  await axios
    .get(url)
    .then((data) => dispatch(adminCollections(data.data)))
    .catch((error) => {});
};
