import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fullTextSearch } from '../services/getInfoRequests';

import TextField from '../common/form/textField';
import UserCollection from './userCollection';
import { useHistory } from 'react-router-dom';

function Searcher() {
  const { t } = useTranslation();
  const history = useHistory();

  const searchURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/search`;

  const [collections, setCollections] = useState('');
  const [searchInfo, setSearchInfo] = useState('');

  const handleChange = ({ target }) => {
    setSearchInfo((prevState) => target.value);
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
    // setCollections();
    // console.log(e.target.value);
    history.push(`/${collections[0]._id}`);
  };

  return (
    <div className="position-relative">
      <h3>{t('search through collections')}</h3>
      <input value={searchInfo.searchText} onChange={handleChange} />
      {/* <TextField name="searchText" value={searchInfo.searchText} onChange={handleChange} /> */}
      <div className="position-absolute bg-light ps-4" onClick={(e) => cleanValues(e)}>
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
