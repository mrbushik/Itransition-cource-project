import React, { useEffect, useState } from 'react';
import axios from 'axios';

import UserCollection from '../ui/userCollection';
import Modal from '../common/modal/collectionModal/modal';
import EditModal from '../../Components/common/modal/collectionModal/editModal';
import EditButtons from '../common/editButtons';
import NavBar from '../navigation/navBar';

import { getUserCollection } from '../services/getInfoRequests';
function UserPage() {
  const URL = 'http://localhost:5000/api//all-collections?page=1?limit=100';
  const [collections, setCollections] = useState();
  const [activeModal, setActiveModal] = useState('');
  useEffect(() => {
    getUserCollection(URL, setCollections);
  }, []);
  const toggleActiveModal = (value) => setActiveModal(value);
  const updateCollections = () => getUserCollection(URL, setCollections);

  return (
    <>
      <NavBar />
      <EditButtons onToggle={toggleActiveModal} btnList={['Create', 'Edit', 'Delete']} />
      <div className="d-flex">
        {/* передать ID коллекции в пропс */}
        {activeModal === 'Create' && (
          <Modal onActive={toggleActiveModal} updateCollections={updateCollections} />
        )}
        {activeModal === 'Edit' && collections && (
          <EditModal collections={collections} modalType={'Edit'} onActive={toggleActiveModal} />
        )}
        {activeModal === 'Delete' && collections && (
          <EditModal collections={collections} onActive={toggleActiveModal} modalType={'Delete'} />
        )}
        <div>
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
      </div>
    </>
  );
}

export default UserPage;
