/* eslint-disable no-useless-computed-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { validator } from '../../../utils/validator';
import { createCollection } from '../../../services/createRequest';

import UploadField from '../../form/uploadField';
import TextField from '../../form/textField';
import SelectField from '../../form/selectedField';
import AddFieldForm from '../../form/addFieldForm';
import TextAreaField from '../../form/textAreaField';

function Modal({ onActive, updateCollections }) {
  const { t } = useTranslation();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userId');
  const URL = 'http://localhost:5000/api/add-collection';
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

  const validatorConfig = {
    name: {
      isRequired: {
        message: t('field required'),
      },
    },
    theme: {
      isRequired: {
        message: t('field required'),
      },
    },
    description: {
      isRequired: {
        message: t('field required'),
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
  const isValid = Object.keys(errors).length === 0;
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'bushik123');
    const res = await fetch('	https://api.cloudinary.com/v1_1/drfjcq9hg/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    setCollection((prevState) => ({
      ...prevState,
      ['photoUrl']: file.secure_url,
    }));
  };

  const validateAddingFields = () => {
    let err = 0;
    for (let i = 0; i < fieldValue.length; i++) {
      if (fieldValue[i].type === '' || fieldValue[i].description === '') {
        err += 1;
      }
    }
    return err;
  };
  const clearData = () => {
    setCollection({
      name: '',
      photoUrl: '',
      theme: '',
      description: '',
    });
  };
  const onSubmit = async () => {
    const errors = validator(collection, validatorConfig);
    setErrors(errors);
    if (isValid && collection.photoUrl && validateAddingFields() === 0) {
      sendingData.postsTemplate.push(...fieldValue);
      await createCollection(URL, sendingData, updateCollections);
      clearData();
    }
  };

  const handleAddField = () => {
    const newField = [...fieldValue, { type: '', description: '' }];
    setFieldValue(newField);
  };
  const handleChangeField = (event, index, fieldType) => {
    const inputdata = [...fieldValue];
    if (fieldType === 'type') {
      inputdata[index].type = event;
    } else {
      inputdata[index].description = event;
    }
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
  return (
    <>
      <div className="modal-dialog modal-dialog-centered w-75 bg-light absolute-top mx-3 mt-3 p-3 dark-mode">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t('create collection')}</h5>
            <button type="button" className="close" onClick={onActive}>
              <span>x</span>
            </button>
          </div>
          <div className="modal-body">
            <div>
              <TextField
                label={t('collection name')}
                placeholder={t('collection name')}
                type="text"
                name="name"
                value={collection.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextAreaField
                name={t('description')}
                value={collection.description}
                onChange={handleChange}
                placeholder={t('collection description')}
                label={t('collection description')}
                error={errors.description}
              />
              <SelectField
                label={t('choose collection')}
                name="theme"
                options={[t('create'), t('edit'), t('delete')]}
                defaultOption={t('choose')}
                onChange={handleChange}
                value={collection.theme}
                error={errors.theme}
              />
            </div>
            <div>
              <h5>{t('upload field')}</h5>
              <UploadField
                type="file"
                isUrl={collection.photoUrl}
                name="photoUrl"
                onSave={uploadImage}
              />
            </div>
            <div>
              <div className="d-flex justify-content-between mt-3 mb-3">
                <h5>{t('additional fields')}</h5>
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
            <button className="btn btn-secondary  " onClick={() => handleAddField()}>
              {t('add field')}
            </button>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary "
              onClick={onSubmit}
              disabled={!isValid}>
              {t('save')}
            </button>
            <button type="button" className="btn btn-secondary mx-3" onClick={onActive}>
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
