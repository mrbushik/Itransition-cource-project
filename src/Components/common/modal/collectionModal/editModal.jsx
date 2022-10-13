/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  editCollectionRequest,
  modalDeleteInOwner,
  modalDelete,
  deleteAllPosts,
} from '../../../services/modalRequests';

import SelectField from '../../form/selectedField';
import TextAreaField from '../../form/textAreaField';
import TextField from '../../form/textField';

function EditModal({ modalType, collections, onActive, updateCollectionsData }) {
  let targetElement;
  const UserId = localStorage.getItem('userId');
  const { t } = useTranslation();

  const [editItem, setEditItem] = useState({
    item: '',
    name: '',
    description: '',
    type: '',
  });

  const handleChange = (target) => {
    setEditItem((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  if (editItem.item) {
    targetElement = collections.find((item) => item.name === editItem.item);
  }

  useEffect(() => {
    if (targetElement) {
      const defailtInputValue = {
        item: editItem.item,
        name: targetElement.name,
        description: targetElement.description,
        type: targetElement.type,
      };
      setEditItem(defailtInputValue);
    }
  }, [editItem.item]);

  const collectionsNames = collections.map((item) => item.name);

  const modifiedCollection = {
    name: editItem.name,
    description: editItem.description,
    type: editItem.type,
  };

  const deleteCollection = (URL, collectionId, ownerId) => {
    deleteAllPosts(`http://localhost:5000/api/delete-posts-from-collection/${collectionId}`);
    modalDeleteInOwner(`http://localhost:5000/api/delete-collection-user/${ownerId}`, collectionId);
    modalDelete(URL, updateCollectionsData);
    setEditItem({ item: '' });
  };

  const collectionEdit = (URL) => {
    editCollectionRequest(URL, modifiedCollection, updateCollectionsData);
  };

  const targetRequest = (URL, collectionId, ownerId) => {
    modalType === t('edit') ? collectionEdit(URL) : deleteCollection(URL, collectionId, ownerId);
  };

  const handleSubmit = () => {
    if (targetElement) {
      const URL = `http://localhost:5000/api/change-collection/${targetElement._id}`;
      targetRequest(URL, targetElement._id, targetElement._ownerId);
    }
  };

  return (
    <div className="modal-dialog modal-dialog-centered  bg-light absolute-top mx-3 mt-3 p-3 dark-mode">
      <div className="modal-content h-100">
        <div className="modal-header">
          <h5 className="modal-title">{modalType}</h5>
          <button type="button" className="close" onClick={onActive}>
            <span>x</span>
          </button>
        </div>
        <div className="modal-body">
          <SelectField
            label={t('select collection')}
            name="item"
            options={collectionsNames}
            defaultOption={t('choose')}
            onChange={handleChange}
            value={editItem.item}
          />
        </div>
        {(modalType === 'Edit' || modalType === 'Редактировать') && editItem.item && editItem && (
          <div>
            <TextField
              label={t('collection name')}
              type="text"
              name="name"
              value={editItem.name}
              onChange={handleChange}
            />
            <SelectField
              label={t('choose collection')}
              name="type"
              options={[t('books'), t('music'), t('clothes')]}
              onChange={handleChange}
              value={editItem.type}
            />
            <TextAreaField
              name="description"
              value={editItem.description}
              label={t('collection description')}
              onChange={handleChange}
            />
          </div>
        )}
        <div className="modal-footer">
          <button type="button" className="btn btn-primary " onClick={handleSubmit}>
            {modalType}
          </button>
          <button type="button" className="btn btn-secondary mx-3" onClick={onActive}>
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
