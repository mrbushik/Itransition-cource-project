import React, { useState, useEffect } from 'react';

import NavBar from '../navigation/navBar';
import UserCollection from '../ui/userCollection';
import EditModal from '../../Components/common/modal/collectionModal/editModal';
import EditButtons from '../common/editButtons';

import { getUserCollection, getUserPages } from '../services/getInfoRequests';
import Paginate from '../common/paginate';

function MainPage() {
  const userRole = localStorage.getItem('role');
  const [collections, setCollections] = useState();
  const [countCollections, setTotalCollections] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState('');
  const URL = `http://localhost:5000/api//all-collections?page=${currentPage}`;

  useEffect(() => {
    getUserCollection(URL, setCollections);
    getUserPages(URL, setTotalCollections);
  }, []);

  useEffect(() => {
    getUserCollection(URL, setCollections);
  }, [currentPage]);

  const toggleActiveModal = (value) => setActiveModal(value);

  const getCollectionsPages = (count) => setCurrentPage(count);

  return (
    <>
      <NavBar />
      {userRole === 'ADMIN' && (
        <div>
          <EditButtons onToggle={toggleActiveModal} btnList={['Edit', 'Delete']} />

          {/* передать ID коллекции в пропс */}
          {activeModal === 'Edit' && collections && (
            <EditModal collections={collections} modalType={'Edit'} onActive={toggleActiveModal} />
          )}
          {activeModal === 'Delete' && collections && (
            <EditModal
              collections={collections}
              onActive={toggleActiveModal}
              modalType={'Delete'}
            />
          )}
        </div>
      )}
      <div className="mx-auto mt-4" style={{ width: '250px' }}>
        {collections
          ? collections.map((item, index) => (
              <UserCollection
                description={item.description}
                key={index}
                id={item._id}
                type={item.type}
                authorName={item.ownerName}
                icon={item.icon}
                name={item.name}
                collectionDescription={item.collectionDescription}
                {...item}
              />
            ))
          : ''}
      </div>
      <Paginate
        countCollections={countCollections}
        currentPage={currentPage}
        onPageChange={getCollectionsPages}
      />
    </>
  );
}

export default MainPage;
