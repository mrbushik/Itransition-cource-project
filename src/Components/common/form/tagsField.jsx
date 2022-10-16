import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WithContext as ReactTags } from 'react-tag-input';
import { getAllTags } from '../../services/getInfoRequests';
function TagsField({ handleDelete, tags, handleAddition }) {
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
            inputFieldPosition="bottom"
            placeholder={t('write tag')}
            autocomplete
          />
        </div>
      </div>
    </>
  );
}

export default TagsField;
