/* eslint-disable no-useless-computed-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import TextField from '../../form/textField';
import { validator } from '../../../utils/validator';
import TagsField from '../../form/tagsField';
import CustomField from '../../form/customField';
import { useTranslation } from 'react-i18next';
import { addPost } from '../../../services/modalRequests';

// предусмотреть что дополнительных полей нет

function CreateItemsModal({ onClose, fieldsCount, addingFields, collectionId, onUpdateData }) {
  const { t } = useTranslation();

  // потом надо будте хранить айди автора и его имя
  const [postItem, setPostItem] = useState({
    name: '',
    tags: [],
  });
  const [fieldValue, setFieldValue] = useState([]);
  const [errors, setErrors] = useState({});

  const fieldValueToArr = fieldValue.map((value) => value.value);

  const sendingData = {
    tags: postItem.tags,
    collectionId: collectionId,
    fields: [postItem.name, ...fieldValueToArr],
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: t('field required'),
      },
    },
    // theme: {
    //   isRequired: {
    //     message: t('field required'),
    //   },
    // },
  };
  const validate = () => {
    const errors = validator(postItem, validatorConfig);
    setErrors(errors);
  };
  useEffect(() => {
    validate();
  }, [postItem]);
  const isValid = Object.keys(errors).length === 0;

  const validateAddingFields = () => {
    let err = 0;
    for (let i = 0; i < fieldValue.length; i++) {
      if (fieldValue[i].type === '' || fieldValue[i].description === '') {
        err += 1;
      }
    }
    return err;
  };

  useEffect(() => {
    let count = fieldsCount;
    const fieldArr = [];

    while (count > 0) {
      count--;
      fieldArr.push({ value: '' });
    }
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

  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setPostItem((prevState) => ({ ...prevState, tags: [...postItem.tags, value] }));
    e.target.value = '';
  };
  const handleDeletTag = (index) => {
    setPostItem((prevState) => ({
      ...prevState,
      tags: postItem.tags.filter((el, i) => i !== index),
    }));
  };

  const clearData = () => {
    setPostItem({
      name: '',
      tags: [],
    });
    setFieldValue([]);
  };

  const onSubmit = () => {
    // const errors = validator(postItem, validatorConfig);
    // setErrors(errors);
    // if (isValid && ) {
    //   sendingData.postsTemplate.push(...fieldValue);
    //   console.log(sendingData);
    // }
    addPost(sendingData, onUpdateData);
    clearData();
  };

  return (
    <>
      <div className="modal-dialog modal-dialog-centered  bg-light absolute-top mx-3 mt-3 p-3 dark-mode">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('new item')}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>x</span>
            </button>
          </div>

          <TagsField tags={postItem.tags} onDeleteTag={handleDeletTag} onKeyDown={handleKeyDown} />
          <TextField
            name="name"
            value={postItem.name}
            onChange={handleChange}
            placeholder={t('post description')}
            label={t('post description')}
            error={errors.name}
          />
          {fieldValue &&
            fieldValue.map((item, index) => (
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
              {t('save')}
            </button>
            <button type="button" className="btn btn-secondary mx-3" onClick={onClose}>
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateItemsModal;
