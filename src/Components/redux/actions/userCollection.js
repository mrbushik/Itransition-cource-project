import axios from 'axios';
const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: 'Bearer ' + token },
};
export const userCollection = (theme) => ({
  type: 'CHANGE_COLLECTION',
  payload: theme,
});

export const lagestCollection = (theme) => ({
  type: 'LAGEST_COLLECTION',
  payload: theme,
});

export const lastPostCollection = (theme) => ({
  type: 'LAST_POST_COLLECTION',
  payload: theme,
});

export const collectionsTags = (theme) => ({
  type: 'COLLECTIONS_TAGS',
  payload: theme,
});

export const colectionsByTags = (theme) => ({
  type: 'COLECTIONS_BY_TAGS',
  payload: theme,
});

export const getCollections = (url) => (dispatch) => {
  axios
    .get(url, config)
    .then((response) =>
      response.data.collections.length === 0
        ? dispatch(userCollection([]))
        : dispatch(userCollection(response.data.collections)),
    )
    .catch((error) => console.log(error));
};

export const getLagestCollections = (url) => (dispatch) => {
  axios
    .get(url)
    .then((data) => dispatch(lagestCollection(data.data)))
    .catch((error) => {
      console.log(error);
    });
};

export const getLastPostCollections = (url) => (dispatch) => {
  axios
    .get(url)
    .then((data) => dispatch(lastPostCollection(data.data)))
    .catch((error) => {
      console.log(error);
    });
};

export const getCollectionsTags = (url) => (dispatch) => {
  axios
    .get(url)
    .then((data) => dispatch(collectionsTags(data.data)))
    .catch((error) => {
      console.log(error);
    });
};

export const getCollectionsByTag = (url, tag) => (dispatch) => {
  axios
    .post(url, tag)
    .then((data) => {
      dispatch(colectionsByTags(data.data));
    })
    .catch((error) => {
      console.log(error);
    });
};
