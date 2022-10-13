import axios from 'axios';
// import { result } from 'lodash';
export function getUserCollection(url, setCollections) {
  fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((result) => result.collections)
    .then((result) => (result.length === 0 ? setCollections('') : setCollections(result.reverse())))
    .catch((error) => console.log(error));
}
export function getUserPages(url, setCountPages) {
  axios
    .get(url)
    .then((response) => response)
    .then((data) => setCountPages(data.data.total))
    .catch((error) => {
      console.log(error);
    });
}
export function getPosts(setCollectionData, params) {
  axios
    .get(`http://localhost:5000/api/collection/${params.Id}`)
    .then((response) => response)
    .then((data) => setCollectionData(data.data))
    .catch((error) => console.log(error));
}
export function getNewPosts(url, setNewPosts) {
  axios
    .get(url)
    .then((response) => response)
    .then((data) => setNewPosts(data.data))
    .catch((error) => console.log(error));
}
export function getLagestCollections(url, setCollection) {
  axios
    .get(url)
    .then((response) => response)
    .then((data) => setCollection(data.data))
    .catch((error) => {
      console.log(error);
    });
}
