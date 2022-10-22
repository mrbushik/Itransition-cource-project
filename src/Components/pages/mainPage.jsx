/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { getLagestCollections, getNewPosts } from '../services/getInfoRequests';
import { useDispatch, useSelector } from 'react-redux';
import { getLagestCollections, getLastPostCollections } from '../redux/actions/userCollection';

import NavBar from '../navigation/navBar';
import UserCollection from '../ui/userCollection';
import TagsSearch from '../ui/tagsSearch';
import Searcher from '../ui/searcher';
function MainPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const newPostsURL = 'http://localhost:5000/api/new-posts';
  const lagestCollectionURL = 'http://localhost:5000/api/get-lagest-collectins';

  const lagestCollection = useSelector(({ userCollection }) => userCollection.lagestCollection);
  const newPostsCollection = useSelector(({ userCollection }) => userCollection.lastPostCollection);

  useEffect(() => {
    dispatch(getLagestCollections(lagestCollectionURL));
    dispatch(getLastPostCollections(newPostsURL));
  }, []);
  return (
    <>
      <NavBar />
      {lagestCollection && lagestCollection.length > 0 ? (
        <div>
          <Searcher />
          <TagsSearch />
          {newPostsCollection && newPostsCollection.collections.length > 0 ? (
            <div>
              <h4 className="ms-3 mt-3">{t('last posts')}</h4>
              <div className="mt-4 d-flex justify-content-center flex-wrap">
                {newPostsCollection.collections.map((item, index) => (
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
                    newPost={newPostsCollection.postsNames[index]}
                    {...item}
                  />
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
          {lagestCollection && lagestCollection.length > 0 ? (
            <div>
              <h4 className="ms-3 mt-3">{t('lagest collections')}</h4>
              <div className="mt-4 d-flex justify-content-center flex-wrap">
                {lagestCollection.map((item, index) => (
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
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div className="text-danger  mt-5 fs-5 text-center px-3">{t('without collections')}</div>
      )}
    </>
  );
}

export default MainPage;
