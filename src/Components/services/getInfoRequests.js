import axios from 'axios';
export function getUserCollection(url, setCollections, setPageNumber) {
  axios
    .get(url)
    .then((response) => response)
    .then((data) => setCollections(data.data.collections))
    .catch((error) => {
      console.log(error);
    });
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
