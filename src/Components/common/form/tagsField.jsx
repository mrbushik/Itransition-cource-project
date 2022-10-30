/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { WithContext as ReactTags } from 'react-tag-input';
import translateKeys from '../../translate/translateKeys';

function TagsField({ handleDelete, tags, handleAddition, error }) {
  const { t } = useTranslation();
  const allTags = useSelector(({ selectedTagSearch }) => selectedTagSearch.allTags);

  const [suggestions, setSuggestions] = useState();

  useEffect(() => {
    getTargetData(allTags);
  }, [allTags]);

  const getTargetData = (data) => {
    const suggestionsData = [];
    for (let i = 0; i < data.length; i++) {
      const suggestionItem = { id: data[i], text: data[i] };
      suggestionsData.push(suggestionItem);
    }
    setSuggestions(suggestionsData);
  };

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  return (
    <>
      <div className="app">
        <h5 className="mt-3"> {t(translateKeys.TAGS)}</h5>
        <div>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            inputFieldPosition="bottom"
            placeholder={t(translateKeys.WRITE_TAG)}
            autocomplete
          />
        </div>
      </div>
      {error && <div className="text-danger">{error}</div>}
    </>
  );
}

TagsField.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  handleAddition: PropTypes.func.isRequired,
  tags: PropTypes.array,
};

export default TagsField;
