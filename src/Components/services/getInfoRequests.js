import axios from 'axios';
export function getPosts(url, setCollectionData) {
  axios
    .get(url)
    .then((data) => setCollectionData(data.data))
    .catch((error) => console.log(error));
}

export async function getTagCollectonsTotal(url, data, setCollectionsLength) {
  await axios
    .post(url, data)
    .then((data) => {
      setCollectionsLength(data.data.total);
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function getCollectionComments(url, setCollections) {
  await axios
    .get(url)
    .then((data) => {
      setCollections(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
}
export async function fullTextSearch(url, data, setCollections) {
  await axios
    .post(url, { searchText: data })
    .then((data) => {
      setCollections(data.data);
    })
    .catch((error) => {
      console.log(error);
    });
  //   setCollections();
  //   console.log(data);
  //   var myHeaders = new Headers();
  //   myHeaders.append('Content-Type', 'application/json');

  //   var raw = JSON.stringify({
  //     searchText: data,
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow',
  //   };

  //   fetch('http://localhost:5000/api/search', requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => setCollections(result))
  //     .catch((error) => console.log('error', error));
}
