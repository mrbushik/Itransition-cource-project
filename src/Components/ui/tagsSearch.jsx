/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectedTagSearch } from '../redux/actions/selectedTag';
import { changeCurrentTagsPage } from '../redux/actions/currentPaginatePage';
import { getCollectionsTags, getCollectionsByTag } from '../redux/actions/userCollection';
import Paginate from '../common/paginate';
import UserCollection from './userCollection';
import { t } from 'i18next';
import translateKeys from '../translate/translateKeys';

function TagsSearch() {
  const dispatch = useDispatch();
  const collectionsTags = useSelector(({ userCollection }) => userCollection.collectionsTags);
  const collectionsByTag = useSelector(({ userCollection }) => userCollection.collectionsByTag);
  const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.tagPage);
  const searchTag = useSelector(({ selectedTagSearch }) => selectedTagSearch.selectedTagSearch);

  const tagsURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/all-tags`;
  const tagColectionsURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/get-collection-by-tag`;

  const PAGE_LIMIT = 3;
  const DEFAULT_TAG_PAGE = 1;

  useEffect(() => {
    dispatch(getCollectionsTags(tagsURL));
  }, []);

  const handleGetCollections = () => {
    const data = { tag: searchTag, page: currentPage };
    dispatch(getCollectionsByTag(tagColectionsURL, data));
  };

  const totalPages = () => collectionsByTag.total / PAGE_LIMIT;

  useEffect(() => {
    handleGetCollections();
  }, [searchTag, currentPage]);

  useEffect(() => {
    if (collectionsByTag.total && Math.ceil(totalPages()) < currentPage) {
      dispatch(changeCurrentTagsPage(1));
      handleGetCollections();
    }
  }, [collectionsByTag]);

  const handleTagClick = (e) => {
    dispatch(changeCurrentTagsPage(DEFAULT_TAG_PAGE));
    dispatch(selectedTagSearch(e.target.outerText));
  };

  const changePage = (count) => dispatch(changeCurrentTagsPage(count));

  return (
    <>
      {collectionsTags && !!collectionsTags.length && (
        <div>
          <h4 className="text-center mt-4 mb-2">{t(translateKeys.TAGS_CLOUD)}</h4>
          <div className="d-flex justify-content-center flex-wrap">
            {collectionsTags?.map((tag, index) => (
              <span
                className={`ms-1 cursor-pointer ${searchTag === tag ? 'text-success' : ''}`}
                key={index}
                onClick={(e) => handleTagClick(e)}>
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-4 d-flex justify-content-center flex-wrap">
            {collectionsByTag?.collections?.map((item) => (
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
              countCollections={collectionsByTag.total}
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
