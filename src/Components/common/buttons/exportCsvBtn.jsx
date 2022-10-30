/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CSVLink } from 'react-csv';
import translateKeys from '../../translate/translateKeys';

function ExportCsvBtn({ data }) {
  const { t } = useTranslation();

  const DEFAULT_POST_FIELD_LENGTH = 2;
  const DEFAULT_TABLE_TITLE = { label: 'id', key: 'id' };

  const [headers, setHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data) {
      getHeaders();
    }
  }, [data]);

  useEffect(() => {
    getTableInfo();
  }, [headers, data]);

  const getHeaders = () => {
    if (!headers.length) {
      const postsTemplates = data.postsTemplate.map((item, index) => ({
        label: item.description,
        key: item.description,
      }));
      setHeaders([DEFAULT_TABLE_TITLE, ...postsTemplates]);
    }
  };

  const getTableInfo = () => {
    if (headers.length) {
      const postsData = data.posts.map((item, index) => getPostInfo(item));
      setTableData(postsData);
    }
  };

  const getPostInfo = (post) => {
    const postAddingFields = post.fields;
    const postNames = headers.map((item) => item.key);

    const targetPostData = {};
    getDefaultPostValues(targetPostData, postNames, post);
    getOtherPostValues(postNames, targetPostData, postAddingFields);

    return targetPostData;
  };

  const getDefaultPostValues = (targetPostData, postNames, post) => {
    targetPostData[postNames[0]] = post._id;
    targetPostData[postNames[1]] = post.tags.join();
  };

  const getOtherPostValues = (postNames, targetPostData, postAddingFields) => {
    postNames.splice(0, DEFAULT_POST_FIELD_LENGTH);
    for (let i = 0; i < postNames.length; i++) {
      targetPostData[postNames[i]] = postAddingFields[i];
    }
  };

  return (
    <div className="mt-3">
      <CSVLink data={tableData} headers={headers} filename="parents.csv">
        <button className="btn btn-primary mb-2">{t(translateKeys.EXPORT_CSV)}</button>
      </CSVLink>
    </div>
  );
}

export default ExportCsvBtn;
