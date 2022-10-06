/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

import EditButtons from '../common/editButtons';
import EditItemsModal from '../common/modal/ItemsModal/editItemsModal';
import CreateItemsModal from '../common/modal/ItemsModal/createItemsModal';
import NavBar from '../navigation/navBar';
import PostItem from '../ui/postItem';

function CollectionPosts() {
  const params = useParams();
  let postsTemplate;
  const [collectionData, setCollectionData] = useState();
  const [activeModal, setActiveModal] = useState('');
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/collection/${params.Id}`)
      .then((response) => response)
      .then((data) => setCollectionData(data.data))
      .catch((error) => console.log(error));
  }, []);

  if (collectionData) {
    postsTemplate = Object.values(collectionData.postsTemplate);
  }

  const toggleActiveModal = (value) => setActiveModal(value);

  return (
    <>
      <NavBar />
      <Link to="/collection">
        <button className="btn btn-secondary ms-3 mt-3">Back</button>
      </Link>
      <EditButtons onToggle={toggleActiveModal} btnList={['Create', 'Edit', 'Delete']} />
      {activeModal === 'Create' && collectionData && (
        // предусмотреть что дополнительных полей нет
        <CreateItemsModal
          fieldsCount={collectionData.postsTemplate.length - 2}
          addingFields={collectionData.postsTemplate.slice(2, collectionData.length)}
          collectionId={params}
          onClose={toggleActiveModal}
        />
      )}
      {activeModal === 'Edit' && collectionData && (
        <EditItemsModal
          posts={collectionData.posts}
          postsTemplates={collectionData.postsTemplate.slice(
            1,
            collectionData.postsTemplate.length,
          )}
          onClose={toggleActiveModal}
          fieldsCount={collectionData.postsTemplate.length - 1}
          modalType={'Edit'}
        />
      )}
      {activeModal === 'Delete' && collectionData && (
        <EditItemsModal
          posts={collectionData.posts}
          postsTemplates={collectionData.postsTemplate.slice(
            1,
            collectionData.postsTemplate.length,
          )}
          onClose={toggleActiveModal}
          fieldsCount={collectionData.postsTemplate.length - 1}
          modalType={'Delete'}
        />
      )}
      {collectionData && (
        <>
          <h2 className="text-center mt-3">{collectionData.name}</h2>
          <table className="table mt-4">
            <thead>
              <tr>
                <th scope="col">id</th>
                {collectionData &&
                  postsTemplate.map((item, index) => <th key={index}>{item.description}</th>)}
              </tr>
            </thead>
            <tbody>
              {collectionData &&
                collectionData.posts.map((itemPosts, index) => (
                  <PostItem
                    key={index}
                    id={itemPosts._id}
                    tags={itemPosts.tags}
                    otherFields={itemPosts.fields}
                  />
                ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

export default CollectionPosts;
