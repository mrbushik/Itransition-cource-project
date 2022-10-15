import React, { useEffect, useState } from 'react';
import { getTags } from '../services/getInfoRequests';

function TagsSearch() {
  const tagsURL = 'http://localhost:5000/api/all-tags';
  const [tags, setTags] = useState();
  useEffect(() => {
    getTags(tagsURL, setTags);
  }, []);

  const handleTagClick = (e) => {
    console.log(e.target.outerText);
  };

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
    </div>
  );
}

export default TagsSearch;
