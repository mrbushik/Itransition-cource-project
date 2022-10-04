/* eslint-disable no-useless-computed-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import TextField from '../../form/textField';
import { validator } from '../../../utils/validator';
import TagsField from '../../form/tagsField';
import CustomField from '../../form/customField';

// предусмотреть что дополнительных полей нет

function CreateItemsModal({ onClose, fieldsCount, addingFields, collectionId }) {
  // потом надо будте хранить айди автора и его имя
  const [postItem, setPostItem] = React.useState({
    name: '',
    tags: [],
  });
  const [fieldValue, setFieldValue] = React.useState([]);
  const [errors, setErrors] = React.useState({});

  const sendingData = {
    tags: postItem.tags,
    collectionId: collectionId.Id,
    date: Date.now(),
    fields: [{ name: postItem.name }, ...fieldValue],
    ownerId: 'AuthorId',
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'this field is required',
      },
    },
    theme: {
      isRequired: {
        message: 'this field is required',
      },
    },
  };
  const validate = () => {
    const errors = validator(postItem, validatorConfig);
    setErrors(errors);
  };
  React.useEffect(() => {
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
  const onSubmit = () => {
    // const errors = validator(postItem, validatorConfig);
    // setErrors(errors);
    // if (isValid && ) {
    //   sendingData.postsTemplate.push(...fieldValue);
    //   console.log(sendingData);
    // }
    console.log(sendingData);
  };

  React.useEffect(() => {
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

  return (
    <>
      <div className="modal-dialog modal-dialog-centered w-50 bg-light absolute-top mx-3 mt-3 p-3">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create new Item</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>x</span>
            </button>
          </div>

          <TagsField tags={postItem.tags} onDeleteTag={handleDeletTag} onKeyDown={handleKeyDown} />
          <TextField
            label="name"
            type="text"
            name="name"
            value={fieldValue.name}
            onChange={handleChange}
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
              Save changes
            </button>
            <button type="button" className="btn btn-secondary mx-3" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateItemsModal;
