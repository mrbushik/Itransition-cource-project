/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fullTextSearch } from '../services/getInfoRequests';

import UserCollection from './userCollection';
import translateKeys from '../translate/translateKeys';

function Searcher() {
  const { t } = useTranslation();

  const searchURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/search`;

  const [collections, setCollections] = useState('');
  const [searchInfo, setSearchInfo] = useState('');

  const handleChange = ({ target }) => {
    setSearchInfo(target.value);
  };

  useEffect(() => {
    if (!searchInfo) setCollections();
    const request = setTimeout(() => {
      if (searchInfo) fullTextSearch(searchURL, searchInfo, setCollections);
    }, 1000);
    return () => {
      clearTimeout(request);
    };
  }, [searchInfo]);

  useEffect(() => {
    window.addEventListener('click', () => setCollections());
    return () => window.removeEventListener('click', () => setCollections);
  }, [collections]);

  const cleanCollections = () => setCollections();

  const cleanInputValue = () => setSearchInfo('');

  return (
    <div className="position-relative grey-element">
      <div>
        <input
          className="search-input border-primary px-3 py-1"
          value={searchInfo}
          onChange={handleChange}
          placeholder={t(translateKeys.SEARCH_COLLECTIONS)}
        />
        <span className="cursor-pointer fs-4 grey-element ms-4 " onClick={cleanInputValue}>
          x
        </span>
      </div>
      {Array.isArray(collections) && (
        <div
          className="position-absolute bg-light ps-4 search-results pt-4"
          onClick={cleanCollections}>
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
      )}
    </div>
  );
}

export default Searcher;
