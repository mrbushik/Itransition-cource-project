/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLagestCollections, getNewPosts } from '../services/getInfoRequests';

import NavBar from '../navigation/navBar';
import UserCollection from '../ui/userCollection';
import TagsSearch from '../ui/tagsSearch';
function MainPage() {
  const { t } = useTranslation();

  const getNewPostsURL = 'http://localhost:5000/api/new-posts';
  const lagestCollectionURL = 'http://localhost:5000/api/get-lagest-collectins';

  const [collections, setCollections] = useState();
  const [newPosts, setNewPosts] = useState('');

  useEffect(() => {
    getLagestCollections(lagestCollectionURL, setCollections);
    getNewPosts(getNewPostsURL, setNewPosts);
  }, []);
  return (
    <>
      <NavBar />
      {collections && collections.length > 0 ? (
        <div>
          <TagsSearch />
          {newPosts && newPosts.collections.length > 0 ? (
            <div>
              <h4 className="ms-3 mt-3">{t('last posts')}</h4>
              <div className="mt-4 d-flex justify-content-center flex-wrap">
                {newPosts.collections.map((item, index) => (
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
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
          {collections && collections.length > 0 ? (
            <div>
              <h4 className="ms-3 mt-3">{t('lagest collections')}</h4>
              <div className="mt-4 d-flex justify-content-center flex-wrap">
                {collections.map((item, index) => (
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
