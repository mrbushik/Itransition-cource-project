import axios from 'axios';
const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: 'Bearer ' + token },
};

function refreshToken() {
  const cookieData = document.cookie;
  console.log(cookieData);
  axios
    .post('http://localhost:5000/api/refresh', {
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzRlZGNjZDIzN2Q2NDMyODA1YjA5NDkiLCJ1c2VybmFtZSI6Ik5pa2l0YSBCdXNodWV2IiwiZW1haWwiOiJtcmJ1c2hpazFAZ21haWwuY29tIiwiY29sbGVjdGlvbnMiOlsiNjM0ZjA1Y2ZlMmU5MjMzNWU0MWRhMmU3Il0sInJvbGVzIjpbIkFETUlOIl0sImlzQWN0aXZhdGVkIjp0cnVlLCJpYXQiOjE2NjYyMDk5NDAsImV4cCI6MTY2ODgwMTk0MH0.bklrjRAq2nceKSCG8aWIW5Z078SqX5ggkxqeJduCbbg',
    })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}

export function editCollectionRequest(url, data, updateCollectionsData) {
  refreshToken();
  axios
    .patch(url, data, config)
    .then((response) => response)
    .then((response) => updateCollectionsData())
    .catch((error) => {
      console.log(error);
    });
}
export function addPost(data, onUpdateData) {
  axios
    .post('http://localhost:5000/api/add-posts', data, config)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
export function editPostRequest(url, data, onUpdateData) {
  axios
    .patch(url, data, config)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}
export function modalDelete(url, onUpdateData) {
  axios
    .delete(url, config)
    .then((response) => response)
    .then((response) => onUpdateData())
    .catch((error) => {
      console.log(error);
    });
}

export function modalDeleteInOwner(url, targetId) {
  axios
    .patch(url, { id: targetId }, config)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}

export function deleteAllPosts(url) {
  axios
    .delete(url, config)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
}

export async function uploadFile(e, setPhotoUrl) {
  const data = new FormData();
  data.append('file', e.target.files[0]);
  data.append('upload_preset', 'bushik123');
  const res = await fetch('	https://api.cloudinary.com/v1_1/drfjcq9hg/image/upload', {
    method: 'POST',
    body: data,
  });

  const file = await res.json();
  setPhotoUrl({ name: 'photoUrl', value: file.secure_url });
}
