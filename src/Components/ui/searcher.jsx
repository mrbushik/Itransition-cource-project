import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fullTextSearch } from '../services/getInfoRequests';

import TextField from '../common/form/textField';

function Searcher() {
  const { t } = useTranslation();

  const searchURL = 'https://jsonplaceholder.typicode.com/posts';
  const [searchInfo, setSearchInfo] = useState({ searchText: '' });
  const handleChange = (target) => {
    setSearchInfo((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  // don't ready component
  useEffect(() => {
    const request = setTimeout(() => {
      fullTextSearch(searchURL, searchInfo.searchText);
    }, 500);
    return () => {
      clearTimeout(request);
    };
  }, [searchInfo]);

  return (
    <div>
      <h3>{t('search through collections')}</h3>
      <TextField name="searchText" value={searchInfo.searchText} onChange={handleChange} />
    </div>
  );
}

export default Searcher;
