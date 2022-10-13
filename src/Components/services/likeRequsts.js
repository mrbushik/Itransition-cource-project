import axios from 'axios';
export async function putLikeRequest(url, data, checkLike, setErrors) {
  await axios
    .patch(url, { id: data })
    .then((response) => checkLike())
    .catch((error) => {
      console.log(setErrors(error.response.data));
    });
}
export async function checkLikeRequest(url, data, setLike) {
  await axios
    .post(url, { id: data })
    .then((response) => response)
    // .then((response) => console.log(response.data))

    .then((response) => setLike(response.data))
    .catch((error) => {
      console.log(error);
    });
}
