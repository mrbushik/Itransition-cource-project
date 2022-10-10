import React, { useState, useEffect } from 'react';
import Paginate from '../common/paginate';
import { useTranslation } from 'react-i18next';
import { getUserCollection, getUserPages } from '../services/getInfoRequests';

import NavBar from '../navigation/navBar';
import UserCollection from '../ui/userCollection';
import EditModal from '../../Components/common/modal/collectionModal/editModal';
import EditButtons from '../common/buttons/editButtons';

function MainPage() {
  const userRole = localStorage.getItem('role');
  const { t } = useTranslation();

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
          {userRole && (
            <EditButtons onToggle={toggleActiveModal} btnList={[t('edit'), t('delete')]} />
          )}

          {/* передать ID коллекции в пропс */}
          {(activeModal === 'Edit' || activeModal === 'Редактировать') && collections && (
            <EditModal
              collections={collections}
              modalType={t('edit')}
              onActive={toggleActiveModal}
            />
          )}
          {(activeModal === 'Delete' || activeModal === 'Удалить') && collections && (
            <EditModal
              collections={collections}
              onActive={toggleActiveModal}
              modalType={t('delete')}
            />
          )}
        </div>
      )}
      <div className={`mx-auto mt-4`} style={{ width: '250px' }}>
        {collections
          ? collections.map((item, index) => (
              <UserCollection
                link={'/'}
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
