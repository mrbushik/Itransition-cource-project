/* eslint-disable no-useless-computed-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import UploadField from '../../form/uploadField';
// import TextField from '../form/textField';
import TextField from '../../form/textField';
import SelectField from '../../form/selectedField';
import AddFieldForm from '../../form/addFieldForm';
import { validator } from '../../../utils/validator';
import TagsField from '../../form/tagsField';

function CreateItemsModal({ onActive }) {
  // потом надо будте хранить айди автора и его имя
  const [collection, setCollection] = React.useState({
    name: '',
    photoUrl: '',
    theme: '',
  });
  const [fieldValue, setFieldValue] = React.useState([]);
  const [errors, setErrors] = React.useState({});

  const sendingData = {
    _authorId: '63356ff4ed30ed38a56c14f8',
    authorName: 'user',
    name: collection.name,
    icon: collection.photoUrl,
    postsTemplate: [
      { type: 'string', description: 'tags' },
      { type: 'string', description: 'name' },
    ],
    posts: [],
    type: collection.theme,
    description: 'it is good songs',
    likes: [],
    comments: [],
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
    const errors = validator(collection, validatorConfig);
    setErrors(errors);
  };
  React.useEffect(() => {
    validate();
  }, [collection]);
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
    const errors = validator(collection, validatorConfig);
    setErrors(errors);
    if (isValid && collection.photoUrl && validateAddingFields() === 0) {
      sendingData.postsTemplate.push(...fieldValue);
      console.log(sendingData);
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
  //test
  const [tags, setTags] = React.useState([]);

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = '';
  }

  function handleDeletTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }
  //test
  return (
    <>
      <div className="modal-dialog modal-dialog-centered w-50 bg-light absolute-top mx-3 mt-3 p-3">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create new collection</h5>
            <button type="button" className="close" onClick={onActive}>
              <span>x</span>
            </button>
          </div>
          {/* <div className="modal-body">
            <div>
              <TextField
                label="collection name"
                type="text"
                name="name"
                value={collection.name}
                onChange={handleChange}
                error={errors.name}
              />
              <SelectField
                label="Choose collection type"
                name="theme"
                options={['books', 'clothes', 'sings']}
                defaultOption="Choose.."
                onChange={handleChange}
                value={collection.theme}
                error={errors.theme}
              />
            </div>

            <div>
              <div className="d-flex justify-content-between mt-3 mb-3">
                <h5>Additional fields</h5>
                <button className="btn btn-secondary  " onClick={() => handleAddField()}>
                  add field
                </button>
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
          </div> */}

          <TagsField tags={tags} onDeleteTag={handleDeletTag} onKeyDown={handleKeyDown} />
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary "
              onClick={onSubmit}
              disabled={!isValid}>
              Save changes
            </button>
            <button type="button" className="btn btn-secondary mx-3" onClick={onActive}>
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateItemsModal;
