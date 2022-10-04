import React, { useEffect, useState } from 'react';

import axios from 'axios';
import UserCollection from '../ui/userCollection';
import Modal from '../common/modal/collectionModal/modal';
import EditModal from '../../Components/common/modal/collectionModal/editModal';
import EditButtons from '../common/editButtons';
function UserPage() {
  const [collections, setCollections] = useState();
  const [activeModal, setActiveModal] = useState('');
  useEffect(() => {
    axios
      .get('http://localhost:5000/api//all-collections')
      .then((response) => response)
      .then((data) => setCollections(data.data.collections));
  }, []);
  const toggleActiveModal = (value) => setActiveModal(value);
  return (
    <>
      <EditButtons onToggle={toggleActiveModal} />

      <div className="d-flex">
        {/* передать ID коллекции в пропс */}
        {activeModal === 'create' && <Modal onActive={toggleActiveModal} />}
        {activeModal === 'edit' && collections && (
          <EditModal collections={collections} modalType={'Edit'} onActive={toggleActiveModal} />
        )}
        {activeModal === 'delete' && collections && (
          <EditModal collections={collections} onActive={toggleActiveModal} modalType={'Delete'} />
        )}
        {collections
          ? collections.map((item, index) => (
              <UserCollection
                description={item.description}
                key={index}
                id={item._id}
                type={item.type}
                authorName={item.authorName}
                icon={item.icon}
                name={item.name}
                collectionDescription={item.collectionDescription}
                {...item}
              />
            ))
          : ''}
      </div>
    </>
  );
}

export default UserPage;
