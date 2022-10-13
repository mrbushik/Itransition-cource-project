/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Paginate from '../common/paginate';
import { useTranslation } from 'react-i18next';
import { getUserCollection, getUserPages } from '../services/getInfoRequests';

import NavBar from '../navigation/navBar';
import UserCollection from '../ui/userCollection';
import EditModal from '../../Components/common/modal/collectionModal/editModal';
import EditButtons from '../common/buttons/editButtons';

import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentPage } from '../redux/actions/currentPaginatePage';

function MainPage() {
  const userRole = localStorage.getItem('role');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.page);
  const URL = `http://localhost:5000/api//all-collections?page=${currentPage}`;

  const [countPage, setCountPage] = useState(1);
  const [collections, setCollections] = useState();
  const [countCollections, setTotalCollections] = useState();
  const [activeModal, setActiveModal] = useState('');

  useEffect(() => {
    getUserCollection(URL, setCollections);
    getUserPages(URL, setTotalCollections);
  }, []);

  const toggleActiveModal = (value) => setActiveModal(value);

  const getCollectionsPages = (count) => {
    dispatch(changeCurrentPage(count));
  };

  useEffect(() => {
    setCountPage(currentPage);
    getUserCollection(URL, setCollections);
  }, [currentPage]);

  const handleUpdateData = () => getUserCollection(URL, setCollections);

  return (
    <>
      <NavBar />
      {userRole === 'ADMIN' && (
        <div>
          {userRole && (
            <EditButtons onToggle={toggleActiveModal} btnList={[t('edit'), t('delete')]} />
          )}
          {activeModal === t('edit') && collections && (
            <EditModal
              collections={collections}
              modalType={t('edit')}
              onActive={toggleActiveModal}
              updateCollectionsData={handleUpdateData}
            />
          )}
          {activeModal === t('delete') && collections && (
            <EditModal
              collections={collections}
              onActive={toggleActiveModal}
              modalType={t('delete')}
              updateCollectionsData={handleUpdateData}
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
