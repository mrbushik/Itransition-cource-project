/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import CustomField from '../../form/customField';
import SelectField from '../../form/selectedField';
import TextAreaField from '../../form/textAreaField';
import TextField from '../../form/textField';
import TagsField from '../../form/tagsField';

function EditItemsModal({ modalType, posts, postsTemplates, onActive, fieldsCount }) {
  let targetElement;
  const [fieldValue, setFieldValue] = React.useState([]);

  const [editItem, setEditItem] = React.useState({
    item: '',
    tags: [],
  });
  React.useEffect(() => {
    let count = fieldsCount;
    const fieldArr = [];
    while (count > 0) {
      count--;
      fieldArr.push({ value: '' });
    }
    setFieldValue(fieldArr);
  }, []);
  const handleChange = (target) => {
    setEditItem((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  if (editItem.item) {
    targetElement = posts.find((item) => item.name === editItem.item);
  }
  const collectionsNames = posts.map((item) => item._id);

  const handleChangeField = (event, index) => {
    const inputdata = [...fieldValue];
    inputdata[index] = event;
    setFieldValue(inputdata);
  };
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    setEditItem((prevState) => ({ ...prevState, tags: [...editItem.tags, value] }));
    e.target.value = '';
  };
  const handleDeletTag = (index) => {
    setEditItem((prevState) => ({
      ...prevState,
      tags: editItem.tags.filter((el, i) => i !== index),
    }));
  };
  const handleSubmit = () => {
    console.log(targetElement._id);
  };
  return (
    <div className="modal-dialog modal-dialog-centered w-50 bg-light absolute-top mx-3 mt-3 p-3">
      <div className="modal-content h-100">
        <div className="modal-header">
          <h5 className="modal-title">{modalType}</h5>
          <button type="button" className="close" onClick={onActive}>
            <span>x</span>
          </button>
        </div>
        <div className="modal-body">
          <SelectField
            label="Choose collection type"
            name="item"
            options={collectionsNames}
            defaultOption="Choose.."
            onChange={handleChange}
            value={editItem.item}
          />
        </div>

        {modalType === 'Edit' && editItem.item && (
          <>
            <TagsField
              tags={editItem.tags}
              onDeleteTag={handleDeletTag}
              onKeyDown={handleKeyDown}
            />
            {postsTemplates.map((item, index) => (
              <CustomField
                key={index}
                label={postsTemplates[index].description}
                type={postsTemplates[index].type}
                handleChangeField={handleChangeField}
                index={index}
                value={item.value}
                data={fieldValue.value}
              />
            ))}
          </>
        )}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary "
            // onClick={handleSubmit}
          >
            {modalType}
          </button>
          <button type="button" className="btn btn-secondary mx-3" onClick={onActive}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditItemsModal;
