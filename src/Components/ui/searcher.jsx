/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fullTextSearch } from '../services/getInfoRequests';

import UserCollection from './userCollection';
import transtateKeys from '../translate/transtateKeys';

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

  const cleanValues = (e) => {
    setCollections();
  };

  return (
    <div className="position-relative grey-element">
      <input
        className="search-input border-primary px-3 py-1"
        value={searchInfo.searchText}
        onChange={handleChange}
        placeholder={t(transtateKeys.SEARCH_COLLECTIONS)}
      />

      <div
        className="position-absolute bg-light ps-4 search-results"
        onClick={(e) => cleanValues(e)}>
        {collections?.map((item, index) => (
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
  );
}

export default Searcher;
