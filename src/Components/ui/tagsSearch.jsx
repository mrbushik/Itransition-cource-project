/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollectonsByTag, getTagCollectonsTotal, getTags } from '../services/getInfoRequests';

import { selectedTagSearch } from '../redux/actions/selectedTag';
import { changeCurrentTagsPage } from '../redux/actions/currentPaginatePage';
import Paginate from '../common/paginate';
import UserCollection from './userCollection';
import { t } from 'i18next';

function TagsSearch() {
  const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.tagPage);
  const searchTag = useSelector(({ selectedTagSearch }) => selectedTagSearch.selectedTagSearch);
  const dispatch = useDispatch();

  const tagsURL = 'http://localhost:5000/api/all-tags';
  const tagColectionsURL = `http://localhost:5000/api/get-collection-by-tag`;

  const [collections, setCollections] = useState();
  const [collectionsLength, setCollectionsLength] = useState();
  const [tags, setTags] = useState();

  useEffect(() => {
    getTags(tagsURL, setTags);
  }, []);

  const handleGetCollections = (e) => {
    const data = { tag: searchTag, page: currentPage };
    getTagCollectonsTotal(tagColectionsURL, data, setCollectionsLength);
    getCollectonsByTag(tagColectionsURL, data, setCollections);
  };

  useEffect(() => {
    handleGetCollections();
  }, [searchTag, currentPage]);

  const handleTagClick = (e) => {
    dispatch(changeCurrentTagsPage(1));
    dispatch(selectedTagSearch(e.target.outerText));
  };

  const changePage = (count) => dispatch(changeCurrentTagsPage(count));

  return (
    <>
      {tags && tags.length > 0 && (
        <div>
          <h4 className="text-center mt-4 mb-2">{t('tags cloud')}</h4>
          <div className="d-flex justify-content-center flex-wrap">
            {tags &&
              tags.map((tag, index) => (
                <span
                  className="ms-1 "
                  style={{ cursor: 'pointer' }}
                  key={index}
                  onClick={(e) => handleTagClick(e)}>
                  {tag}
                </span>
              ))}
          </div>
          <div className="mt-4 d-flex justify-content-center flex-wrap">
            {collections &&
              collections.map((item) => (
                <UserCollection
                  link={'/'}
                  description={item.description}
                  key={item._id}
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
          {collections && (
            <Paginate
              countCollections={collectionsLength}
              currentPage={currentPage}
              onPageChange={changePage}
            />
          )}
        </div>
      )}
    </>
  );
}

export default TagsSearch;
