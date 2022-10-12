import axios from 'axios';
export function editCollectionRequest(url, data, updateCollectionsData) {
  axios
    .patch(url, data)
    .then((response) => response)
    .then((response) => updateCollectionsData())
    .catch((error) => {
      console.log(error);
    });
}
export function deleteCollectionRequest(url, updateCollectionsData) {
  axios
    .delete(url)
    .then((response) => response)
    .then((response) => updateCollectionsData())
    .catch((error) => {
      console.log(error);
    });
}
export function deleteCollectionInUser(url, targetId) {
  axios
    .patch(url, { id: targetId })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}
export function addPost(data, onUpdateData) {
  axios
    .post('http://localhost:5000/api/add-posts', data)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
export function editPost(url, data, onUpdateData) {
  axios
    .patch(url, data)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
