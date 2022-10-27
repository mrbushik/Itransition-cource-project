/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getLagestCollections, getLastPostCollections } from '../redux/actions/userCollection';

import UserCollection from '../ui/userCollection';
import TagsSearch from '../ui/tagsSearch';
import transtateKeys from '../translate/transtateKeys';

function MainPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const newPostsURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/new-posts`;
  const lagestCollectionURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/get-lagest-collectins`;

  const lagestCollection = useSelector(({ userCollection }) => userCollection.lagestCollection);
  const newPostsCollection = useSelector(({ userCollection }) => userCollection.lastPostCollection);

  useEffect(() => {
    dispatch(getLagestCollections(lagestCollectionURL));
    dispatch(getLastPostCollections(newPostsURL));
  }, []);

  return (
    <>
      {lagestCollection && lagestCollection.length && (
        <div>
          <TagsSearch />
          {newPostsCollection && newPostsCollection.collections.length && (
            <div>
              <h4 className="ms-3 mt-3">{t(transtateKeys.LAST_POSTS)}</h4>
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
          )}
          {lagestCollection && lagestCollection.length && (
            <div>
              <h4 className="ms-3 mt-3">{t(transtateKeys.LAGEST_COLLECTIONS)}</h4>
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
          )}
        </div>
      )}
      {lagestCollection && !lagestCollection.length && (
        <div className="text-danger  mt-5 fs-5 text-center px-3">
          {t(transtateKeys.WITHOUT_COLLECTIONS)}
        </div>
      )}
    </>
  );
}

export default MainPage;
