/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Paginate from '../common/paginate';
import { useTranslation } from 'react-i18next';
import {
  getLagestCollections,
  getNewPosts,
  getUserCollection,
  getUserPages,
} from '../services/getInfoRequests';

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
  // const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.page);
  // const getCollectionsURL = `http://localhost:5000/api//all-collections?page=${currentPage}`;
  const getNewPostsURL = 'http://localhost:5000/api/new-posts';
  const lagestCollectionURL = 'http://localhost:5000/api/get-lagest-collectins';
  const [countPage, setCountPage] = useState(1);
  const [collections, setCollections] = useState();
  // const [countCollections, setTotalCollections] = useState();
  const [activeModal, setActiveModal] = useState('');
  const [newPosts, setNewPosts] = useState('');

  useEffect(() => {
    // getUserCollection(getCollectionsURL, setCollections);
    // getUserPages(getCollectionsURL, setTotalCollections);
    getLagestCollections(lagestCollectionURL, setCollections);
    getNewPosts(getNewPostsURL, setNewPosts);
  }, []);

  const toggleActiveModal = (value) => setActiveModal(value);

  // const getCollectionsPages = (count) => {
  //   dispatch(changeCurrentPage(count));
  // };

  // useEffect(() => {
  //   setCountPage(currentPage);
  //   getUserCollection(getCollectionsURL, setCollections);
  // }, [currentPage]);

  // const handleUpdateData = () => getUserCollection(getCollectionsURL, setCollections);

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
              // updateCollectionsData={handleUpdateData}
            />
          )}
          {activeModal === t('delete') && collections && (
            <EditModal
              collections={collections}
              onActive={toggleActiveModal}
              modalType={t('delete')}
              // updateCollectionsData={handleUpdateData}
            />
          )}
        </div>
      )}
      <h4>{t('last posts')}</h4>
      <div
        className={` mt-4 d-flex justify-content-center flex-wrap`}
        //  style={{ width: '250px' }}
      >
        {/* translate */}
        {newPosts
          ? newPosts.collections.map((item, index) => (
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
                newPost={newPosts.postsNames[index]}
                {...item}
              />
            ))
          : ''}
      </div>
      <h4>{t('lagest collections')}</h4>

      <div className={`mt-4 d-flex justify-content-center flex-wrap`}>
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
      {/* <Paginate
        countCollections={countCollections}
        currentPage={currentPage}
        onPageChange={getCollectionsPages}
      /> */}
    </>
  );
}

export default MainPage;
