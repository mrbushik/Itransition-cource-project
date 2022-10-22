/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPages } from '../services/adminRequests';
import { getAdminCollections } from '../redux/actions/adminData';
import { changeCurrentPage } from '../redux/actions/currentPaginatePage';
import { useTranslation } from 'react-i18next';

import UserCollection from '../ui/userCollection';
import Paginate from '../common/paginate';
import NavBar from '../navigation/navBar';
import EditButtons from '../common/buttons/editButtons';
import EditModal from '../common/modal/collectionModal/editModal';
import { userCollection } from '../redux/actions/userCollection';

function AdminCollections() {
  const role = localStorage.getItem('role');
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.page);
  const adminCollections = useSelector(({ adminData }) => adminData.collections);
  const getCollectionsURL = `http://localhost:5000/api//all-collections?page=${currentPage}`;

  // const [collections, setCollections] = useState();
  const [countCollections, setTotalCollections] = useState();
  // const [, setCountPage] = useState(1);
  const [activeModal, setActiveModal] = useState('');

  const handleUpdateData = () => {
    dispatch(getAdminCollections(getCollectionsURL));
    getUserPages(getCollectionsURL, setTotalCollections);
  };

  // const handleChangePage = () => dispatch(changeCurrentPage(count));

  useEffect(() => {
    if (role !== 'ADMIN') {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    handleUpdateData();
    // getUserPages(getCollectionsURL, setTotalCollections);
  }, []);

  const getCollectionsPages = (count) => {
    dispatch(changeCurrentPage(count));
  };

  useEffect(() => {
    console.log(countCollections + 'count collections');
    console.log(currentPage + 'current page');
    if (Math.ceil(countCollections / 3) < currentPage) {
      console.log('work');
      dispatch(changeCurrentPage(1));
      handleUpdateData();
    }
  }, [countCollections, adminCollections]);

  useEffect(() => {
    // setCountPage(currentPage);
    handleUpdateData();
  }, [currentPage]);

  const toggleActiveModal = (value) => setActiveModal(+value);

  return (
    <>
      <NavBar />
      {adminCollections && adminCollections.length > 0 ? (
        <div>
          <div>
            <div className="d-flex justify-content-between flex-wrap">
              {role === 'ADMIN' && (
                <div>
                  <div>
                    {role && adminCollections.length !== 0 && (
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

            {activeModal === 0 && adminCollections && (
              <EditModal
                collections={adminCollections}
                modalType={t('edit')}
                onActive={toggleActiveModal}
                updateCollectionsData={handleUpdateData}
              />
            )}
            {activeModal === 1 && adminCollections && (
              <EditModal
                collections={adminCollections}
                onActive={toggleActiveModal}
                modalType={t('delete')}
                updateCollectionsData={handleUpdateData}
              />
            )}
            <div className="mt-4 d-flex justify-content-center flex-wrap">
              {adminCollections
                ? adminCollections.map((item, index) => (
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
          {countCollections > 3 && (
            <Paginate
              countCollections={countCollections}
              currentPage={currentPage}
              onPageChange={getCollectionsPages}
            />
          )}
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
