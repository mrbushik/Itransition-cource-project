import axios from 'axios';
export function getUserCollection(url, setCollections) {
  fetch(url, { method: 'GET' })
    .then((response) => response.json())
    .then((result) => result.collections)
    .then((result) => (result.length === 0 ? '' : setCollections(result.reverse())))
    .catch((error) => console.log('error', error));
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
