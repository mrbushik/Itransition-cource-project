/* eslint-disable no-useless-computed-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { validator } from '../../../utils/validator';
import { useTranslation } from 'react-i18next';
import { addPost } from '../../../services/modalRequests';

import TextField from '../../form/textField';
import TagsField from '../../form/tagsField';
import CustomField from '../../form/customField';
import { getToken } from '../../../utils/token';
import transtateKeys from '../../../translate/transtateKeys';

function CreateItemsModal({ onClose, fieldsCount, addingFields, collectionId, onUpdateData }) {
  const { t } = useTranslation();
  const addPostURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/add-posts`;

  const [postItem, setPostItem] = useState({ name: '' });
  const [tags, setTags] = useState([]);
  const [fieldValue, setFieldValue] = useState([]);
  const [errors, setErrors] = useState({});

  const fieldValueToArr = fieldValue.map((value) => value.value);

  const sendingData = {
    tags: tags.map((item) => item.text),
    collectionId: collectionId,
    fields: [postItem.name, ...fieldValueToArr],
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: t(transtateKeys.FIELD_REQUIRED),
      },
      max: {
        message: t(transtateKeys.FIELD_MAX_LENGTH),
        value: 30,
      },
    },
  };

  const validate = () => {
    const errors = validator(postItem, validatorConfig);
    setErrors(errors);
  };

  useEffect(() => {
    validate();
  }, [postItem]);
  const isValid = Object.keys(errors).length === 0;

  const handleDeleteTag = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const deleteTagsError = () => {
    const otherErrors = errors;
    delete otherErrors.tags;
    setErrors(otherErrors);
  };

  const addTagsError = () => {
    const otherErrors = errors;
    otherErrors.tags = t(transtateKeys.FIELD_REQUIRED);
    setErrors({ tags: t(transtateKeys.FIELD_REQUIRED) });
  };

  const handleAddition = (tag) => {
    deleteTagsError();
    setTags([...tags, tag]);
  };

  const createFields = () => {
    let count = fieldsCount;
    const fieldArr = [];
    while (count > 0) {
      count--;
      fieldArr.push({ value: '' });
    }
    return fieldArr;
  };

  useEffect(() => {
    const fieldArr = createFields();
    setFieldValue(fieldArr);
  }, []);

  const handleChangeField = (event, index) => {
    const inputdata = [...fieldValue];
    inputdata[index].value = event;
    setFieldValue(inputdata);
  };

  const handleChange = (target) => {
    setPostItem((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const clearData = () => {
    setPostItem({ name: '' });
    setTags([]);
    setFieldValue([...createFields()]);
  };

  const onSubmit = () => {
    if (!tags.length) {
      addTagsError();
      return;
    }
    addPost(addPostURL, sendingData, onUpdateData, getToken());
    clearData();
  };

  return (
    <>
      <div className="modal-dialog modal-dialog-centered  bg-light absolute-top mx-3 mt-3 p-3 dark-mode">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t(transtateKeys.NEW_ITEM)}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>x</span>
            </button>
          </div>
          <TagsField
            handleDelete={handleDeleteTag}
            tags={tags}
            handleAddition={handleAddition}
            error={errors.tags}
          />
          <TextField
            name="name"
            value={postItem.name}
            onChange={handleChange}
            placeholder={t(transtateKeys.POST_DESCRIPTION)}
            label={t(transtateKeys.POST_DESCRIPTION)}
            error={errors.name}
          />
          {fieldValue?.map((item, index) => (
            <CustomField
              key={index}
              label={addingFields[index].description}
              type={addingFields[index].type}
              handleChangeField={handleChangeField}
              index={index}
              value={item.value}
              data={fieldValue.value}
            />
          ))}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary "
              onClick={onSubmit}
              disabled={!isValid}>
              {t(transtateKeys.SAVE)}
            </button>
            <button type="button" className="btn btn-secondary mx-3" onClick={onClose}>
              {t(transtateKeys.CLOSE)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

CreateItemsModal.propTypes = {
  addingFields: PropTypes.array,
  collectionId: PropTypes.string,
  fieldsCount: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onUpdateData: PropTypes.func.isRequired,
};

export default CreateItemsModal;
