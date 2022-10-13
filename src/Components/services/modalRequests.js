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
export function addPost(data, onUpdateData) {
  axios
    .post('http://localhost:5000/api/add-posts', data)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
export function editPostRequest(url, data, onUpdateData) {
  axios
    .patch(url, data)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
export function modalDelete(url, onUpdateData) {
  axios
    .delete(url)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
export function modalDeleteInOwner(url, targetId) {
  axios
    .patch(url, { id: targetId })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}
