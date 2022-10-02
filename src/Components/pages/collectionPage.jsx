/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

function CollectionPage() {
  const params = useParams();
  const history = useHistory();
  let postsTemplate;
  const [collectionData, setCollectionData] = React.useState();
  React.useEffect(() => {
    axios
      .get(`http://localhost:5000/api/collection/${params.Id}`)
      .then((response) => response)
      .then((data) => setCollectionData(data.data))
      .catch((error) => console.log(error));
  }, []);
  const goBack = () => history.goBack();
  if (collectionData) {
    postsTemplate = Object.values(collectionData.postsTemplate);
  }
  return (
    <>
      <button className="btn btn-secondary ms-3 mt-3" onClick={goBack}>
        Back
      </button>
      {collectionData && (
        <>
          <h2 className="text-center mt-3">{collectionData.name}</h2>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col" onClick={goBack}>
                  id
                </th>
                {collectionData &&
                  postsTemplate.map((item, index) => <th key={index}>{item.description}</th>)}
              </tr>
            </thead>
            <tbody>
              {collectionData &&
                collectionData.posts.map((itemPosts, index) => (
                  <tr key={itemPosts._id}>
                    <td>{index}</td>
                    <td>{itemPosts.tags}</td>
                    {Object.values(itemPosts.fields).map((item, index) => (
                      <td key={index}>{item}</td>
                    ))}
                    <th></th>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default CollectionPage;
