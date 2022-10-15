import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WithContext as ReactTags } from 'react-tag-input';
import { getAllTags } from '../../services/getInfoRequests';
function TagsField({ handleDelete, tags, handleAddition }) {
  // { tags, onDeleteTag, onKeyDown }
  const tagsURL = 'http://localhost:5000/api/all-tags';
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState();

  useEffect(() => {
    getAllTags(tagsURL, getTargetData, setSuggestions);
  }, []);

  const getTargetData = (data) => {
    const suggestionsData = [];
    for (let i = 0; i < data.length; i++) {
      const suggestionItem = { id: data[i], text: data[i] };
      suggestionsData.push(suggestionItem);
    }
    return suggestionsData;
  };
  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  const delimiters = [KeyCodes.comma, KeyCodes.enter];
  // const [tags, setTags] = useState([]);
  const [showAllTags, setShowAllTags] = useState(false);

  const toggleShow = () => setShowAllTags(!showAllTags);

  // const handleDelete = (i) => {
  //   setTags(tags.filter((tag, index) => index !== i));
  // };

  // const handleDrag = (tag, currPos, newPos) => {
  //   const newTags = tags.slice();

  //   newTags.splice(currPos, 1);
  //   newTags.splice(newPos, 0, tag);

  //   // re-render
  //   setTags(newTags);
  // };

  // const handleTagClick = (index) => {
  //   console.log('The tag at index ' + index + ' was clicked');
  // };
  return (
    <>
      <div className="app">
        <h5 className="mt-3"> {t('tags')}</h5>
        <div>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            // handleDrag={handleDrag}
            // handleTagClick={handleTagClick}
            inputFieldPosition="bottom"
            placeholder={t('write tag')}
            autocomplete
          />
          <div className="mt-2">
            {t('show all tags')}
            <button className="btn btn-outline-secondary ms-2" type="button" onClick={toggleShow}>
              {showAllTags ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye"
                  viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-slash"
                  viewBox="0 0 16 16">
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                </svg>
              )}
            </button>
          </div>
          {/* {showAllTags && (
            <div className="mb-3" style={{ maxWidth: '450px' }}>
              {suggestions.map((item, index) => (
                <span key={index}> {item.text}</span>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </>
    // <div className="">
    //   <div className="d-flex flex-wrap">
    //     {tags.map((tag, index) => (
    //       <div
    //         className="bg-secondary rounded-pill m-1 p-1 d-flex align-items-center white-element"
    //         key={index}>
    //         <span className="text ms-1">{tag}</span>
    //         <div className="vr ms-1 "></div>
    //         <p
    //           className="mx-2 mb-0 rounded-circle d-flex justify-content-center cursor-pointer"
    //           style={{ width: '10px', cursor: 'pointer' }}
    //           onClick={() => onDeleteTag(index)}>
    //           x
    //         </p>
    //       </div>
    //     ))}
    //   </div>

    //   <input
    //     onKeyDown={onKeyDown}
    //     type="text"
    //     className="form-control my-2"
    //     placeholder={t('write tag')}
    //   />
    // </div>
  );
}

export default TagsField;
