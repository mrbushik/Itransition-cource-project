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
// export function deleteCollectionInUser(url, data) {
//   var myHeaders = new Headers();
//   myHeaders.append('Content-Type', 'application/json');

//   var raw = JSON.stringify({
//     id: '6345b8cbb0e9741740b520ef',
//   });

//   var requestOptions = {
//     method: 'PATCH',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow',
//   };

//   fetch('http://localhost:5000/api/delete-collection-user/63448002769f7728605bed89', requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.log('error', error));
// }
