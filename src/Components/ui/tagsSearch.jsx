/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollectonsByTag, getTagCollectonsTotal, getTags } from '../services/getInfoRequests';

import { selectedTagSearch } from '../redux/actions/selectedTag';
import { changeCurrentTagsPage } from '../redux/actions/currentPaginatePage';
import { getCollectionsTags, getCollectionsByTag } from '../redux/actions/userCollection';
import Paginate from '../common/paginate';
import UserCollection from './userCollection';
import { t } from 'i18next';

function TagsSearch() {
  const dispatch = useDispatch();
  const collectionsTags = useSelector(({ userCollection }) => userCollection.collectionsTags);
  const collectionsByTag = useSelector(({ userCollection }) => userCollection.collectionsByTag);
  const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.tagPage);
  const searchTag = useSelector(({ selectedTagSearch }) => selectedTagSearch.selectedTagSearch);

  const tagsURL = 'http://localhost:5000/api/all-tags';
  const tagColectionsURL = `http://localhost:5000/api/get-collection-by-tag`;

  const [collectionsLength, setCollectionsLength] = useState();

  useEffect(() => {
    dispatch(getCollectionsTags(tagsURL));
  }, []);

  const handleGetCollections = () => {
    const data = { tag: searchTag, page: currentPage };
    getTagCollectonsTotal(tagColectionsURL, data, setCollectionsLength);
    dispatch(getCollectionsByTag(tagColectionsURL, data));
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
      {collectionsTags && collectionsTags.length > 0 && (
        <div>
          <h4 className="text-center mt-4 mb-2">{t('tags cloud')}</h4>
          <div className="d-flex justify-content-center flex-wrap">
            {collectionsTags &&
              collectionsTags.map((tag, index) => (
                <span
                  className={`ms-1 ${searchTag === tag ? 'text-success' : ''}`}
                  style={{ cursor: 'pointer' }}
                  key={index}
                  onClick={(e) => handleTagClick(e)}>
                  {tag}
                </span>
              ))}
          </div>
          <div className="mt-4 d-flex justify-content-center flex-wrap">
            {collectionsByTag &&
              collectionsByTag.map((item) => (
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
          {collectionsByTag && (
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
