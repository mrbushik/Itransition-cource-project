/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserCollection, getUserPages } from '../services/getInfoRequests';
import { changeCurrentPage } from '../redux/actions/currentPaginatePage';
import { useTranslation } from 'react-i18next';

import UserCollection from '../ui/userCollection';
import Paginate from '../common/paginate';
import NavBar from '../navigation/navBar';
import EditButtons from '../common/buttons/editButtons';
import EditModal from '../common/modal/collectionModal/editModal';

function AdminCollections() {
  const role = localStorage.getItem('role');
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.page);
  const getCollectionsURL = `http://localhost:5000/api//all-collections?page=${currentPage}`;

  const [collections, setCollections] = useState();
  const [countCollections, setTotalCollections] = useState();
  const [, setCountPage] = useState(1);
  const [activeModal, setActiveModal] = useState('');

  useEffect(() => {
    if (role !== 'ADMIN') {
      history.push('/');
    }
  }, []);
  useEffect(() => {
    getUserCollection(getCollectionsURL, setCollections);
    getUserPages(getCollectionsURL, setTotalCollections);
  }, []);

  const getCollectionsPages = (count) => {
    dispatch(changeCurrentPage(count));
  };

  useEffect(() => {
    setCountPage(currentPage);
    getUserCollection(getCollectionsURL, setCollections);
  }, [currentPage]);

  const toggleActiveModal = (value) => setActiveModal(+value);

  const handleUpdateData = () => getUserCollection(getCollectionsURL, setCollections);
  return (
    <>
      <NavBar />
      {collections && collections.length > 0 ? (
        <div>
          <div>
            <div className="d-flex justify-content-between flex-wrap">
              {role === 'ADMIN' && (
                <div>
                  <div>
                    {role && collections.length !== 0 && (
                      <EditButtons
                        onToggle={toggleActiveModal}
                        btnList={[t('edit'), t('delete')]}
                      />
                    )}
                  </div>
                </div>
              )}
              <div className="m-4">
                <Link to="admin-panel">
                  <div className="btn btn-secondary">{t('to admin panel')}</div>
                </Link>
              </div>
            </div>

            {activeModal === 0 && collections && (
              <EditModal
                collections={collections}
                modalType={t('edit')}
                onActive={toggleActiveModal}
                updateCollectionsData={handleUpdateData}
              />
            )}
            {activeModal === 1 && collections && (
              <EditModal
                collections={collections}
                onActive={toggleActiveModal}
                modalType={t('delete')}
                updateCollectionsData={handleUpdateData}
              />
            )}
            <div className="mt-4 d-flex justify-content-center flex-wrap">
              {collections
                ? collections.map((item, index) => (
                    <UserCollection
                      link={'/admin-collections/'}
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
          </div>
          <Paginate
            countCollections={countCollections}
            currentPage={currentPage}
            onPageChange={getCollectionsPages}
          />
        </div>
      ) : (
        <div>
          <div className="m-4">
            <Link to="admin-panel">
              <div className="btn btn-secondary">{t('to admin panel')}</div>
            </Link>
          </div>
          <p className="text-danger text-center fs-4">{t('none collections')}</p>
        </div>
      )}
    </>
  );
}

export default AdminCollections;
