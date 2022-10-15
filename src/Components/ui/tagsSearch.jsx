import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCollectonsByTag, getTagCollectonsTotal, getTags } from '../services/getInfoRequests';

import Paginate from '../common/paginate';
import UserCollection from './userCollection';
import { changeCurrentTagsPage } from '../redux/actions/currentPaginatePage';

function TagsSearch() {
  const currentPage = useSelector(({ changeCurrentPage }) => changeCurrentPage.tagPage);
  const dispatch = useDispatch();

  const tagsURL = 'http://localhost:5000/api/all-tags';
  const tagColectionsURL = `http://localhost:5000/api/get-collection-by-tag`;

  const [collections, setCollections] = useState();
  const [collectionsLength, setCollectionsLength] = useState();
  const [currentTag, setCurrentTag] = useState();
  const [tags, setTags] = useState();

  useEffect(() => {
    getTags(tagsURL, setTags);
  }, []);

  const handleGetCollections = (e) => {
    const data = { tag: currentTag, page: currentPage };
    console.log(data);
    getTagCollectonsTotal(tagColectionsURL, data, setCollectionsLength);
    getCollectonsByTag(tagColectionsURL, data, setCollections);
  };

  useEffect(() => {
    handleGetCollections();
  }, [currentTag, currentPage]);

  const handleTagClick = (e) => {
    dispatch(changeCurrentTagsPage(1));
    setCurrentTag(e.target.outerText);
  };

  const changePage = (count) => dispatch(changeCurrentTagsPage(count));

  return (
    <div>
      <h4 className="text-center mt-4 mb-2">Tags Cloud</h4>
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
      <div>
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
  );
}

export default TagsSearch;
