/* eslint-disable no-useless-computed-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { validator } from '../../../utils/validator';
import { createCollection } from '../../../services/createRequest';

import UploadField from '../../form/uploadField';
import TextField from '../../form/textField';
import SelectField from '../../form/selectedField';
import AddFieldForm from '../../form/addFieldForm';
import TextAreaField from '../../form/textAreaField';
import { getToken } from '../../../utils/token';
import translateKeys from '../../../translate/translateKeys';

function Modal({ onActive, updateCollectionsData }) {
  const { t } = useTranslation();
  let addingFieldsErrorsCount = 0;
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userId');
  const URL = `${process.env.REACT_APP_DOMAIN_NAME}/api/add-collection`;

  const SELECTED_OPTIONS = ['books', 'music', 'clothes'];
  const SELECTED_TRANSLATED_OPTIONS = [
    t(translateKeys.BOOKS),
    t(translateKeys.MUSIK),
    t(translateKeys.CLOTHES),
  ];

  const [collection, setCollection] = useState({
    name: '',
    photoUrl: '',
    theme: '',
    description: '',
  });
  const [fieldValue, setFieldValue] = useState([]);
  const [errors, setErrors] = useState({});

  const sendingData = {
    _ownerId: userId,
    ownerName: userName,
    name: collection.name,
    icon: collection.photoUrl,
    postsTemplate: [
      { type: 'string', description: 'tags' },
      { type: 'string', description: 'name' },
    ],
    type: collection.theme,
    description: collection.description,
  };

  const getSelectedValue = () => {
    const themeIndex = SELECTED_OPTIONS.indexOf(collection.theme);
    if (themeIndex === -1) return '';
    return SELECTED_TRANSLATED_OPTIONS[themeIndex];
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
      },
      max: {
        message: t(translateKeys.FIELD_MAX_LENGTH),
        value: 30,
      },
    },
    theme: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
      },
    },
    description: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
      },
    },
  };

  const validate = () => {
    const errors = validator(collection, validatorConfig);
    setErrors(errors);
  };

  useEffect(() => {
    validate();
  }, [collection]);

  const isValid = !Object.keys(errors).length;

  const validateAddingFields = () => {
    for (let i = 0; i < fieldValue.length; i++) {
      if (!fieldValue[i].type || !fieldValue[i].description) addingFieldsErrorsCount += 1;
    }
    return addingFieldsErrorsCount;
  };

  const clearData = () => {
    setCollection({
      name: '',
      photoUrl: '',
      theme: '',
      description: '',
    });
    setFieldValue([]);
  };

  const onSubmit = () => {
    if (isValid && collection.photoUrl && !validateAddingFields()) {
      sendingData.postsTemplate.push(...fieldValue);
      createCollection(URL, sendingData, updateCollectionsData, getToken());
      clearData();
    }
  };

  const handleAddField = () => {
    const newField = [...fieldValue, { type: '', description: '' }];
    setFieldValue(newField);
  };

  const handleChangeField = (event, index, fieldType) => {
    const inputdata = [...fieldValue];
    fieldType === 'type' ? (inputdata[index].type = event) : (inputdata[index].description = event);
    setFieldValue(inputdata);
  };

  const handleDelete = (index) => {
    const deleteData = [...fieldValue];
    deleteData.splice(index, 1);
    setFieldValue(deleteData);
  };

  const handleChange = (target) => {
    setCollection((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleChangeChoose = (target) => {
    const optionIndex = SELECTED_TRANSLATED_OPTIONS.indexOf(target.value);
    setCollection((prevState) => ({ ...prevState, [target.name]: SELECTED_OPTIONS[optionIndex] }));
  };

  return (
    <>
      <div className="modal-dialog modal-dialog-centered  bg-light absolute-top mx-3 mt-3 p-3 dark-mode">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t(translateKeys.CREATE_COLLECTION)}</h5>
            <button type="button" className="close" onClick={onActive}>
              <span>x</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <TextField
                label={t(translateKeys.COLLECTION_NAME)}
                placeholder={t(translateKeys.COLLECTION_NAME)}
                type="text"
                name="name"
                value={collection.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextAreaField
                name="description"
                value={collection.description}
                onChange={handleChange}
                placeholder={t(translateKeys.COLLECTION_DESCRIPTION)}
                label={t(translateKeys.COLLECTION_DESCRIPTION)}
                error={errors.description}
              />
              <SelectField
                label={t(translateKeys.CHOOSE_COLLECTION)}
                name="theme"
                options={SELECTED_TRANSLATED_OPTIONS}
                defaultOption={t(translateKeys.CHOOSE)}
                onChange={handleChangeChoose}
                value={getSelectedValue()}
                error={errors.theme}
              />
            </div>
            <div>
              <h5>{t(translateKeys.UPLOAD_FIELD)}</h5>
              <UploadField isUrl={collection.photoUrl} name="photoUrl" onSave={handleChange} />
            </div>
            <div>
              <div className="d-flex justify-content-between mt-3 mb-3">
                <h5>{t(translateKeys.ADDITIONAL_FIELDS)}</h5>
              </div>
              {fieldValue.map((data, index) => (
                <AddFieldForm
                  key={index}
                  handleChangeField={handleChangeField}
                  index={index}
                  dataType={data.type}
                  dataDescription={data.description}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <button className="btn btn-secondary" onClick={() => handleAddField()}>
              {t(translateKeys.ADD_FIELD)}
            </button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary "
              onClick={onSubmit}
              disabled={!isValid}>
              {t(translateKeys.SAVE)}
            </button>
            <button type="button" className="btn btn-secondary mx-3" onClick={onActive}>
              {t(translateKeys.CLOSE)}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

Modal.propTypes = {
  onActive: PropTypes.func.isRequired,
  updateCollectionsData: PropTypes.func.isRequired,
};

export default Modal;
