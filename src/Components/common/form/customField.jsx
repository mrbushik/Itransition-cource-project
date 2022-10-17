/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TextAreaField from './textAreaField';

function CustomField({
  type,
  label,
  handleChangeField,
  index,
  value,
  placeholder,
  checkboxDefault,
}) {
  const handleChange = (e) => {
    handleChangeField(e.target.value, index);
  };

  const handleCheck = (e) => {
    handleChangeField(!value, index);
  };

  useEffect(() => {
    if (type === 'checkbox' && !checkboxDefault) {
      handleChangeField(false, index);
    }
  }, []);

  const handleChangeTextArea = (e) => {
    handleChangeField(e.value, index);
  };
  return (
    <>
      <div className="mb-3">
        <span className="input-group" id="basic-addon1">
          {label}
        </span>
        {type !== 'checkbox' && type !== 'multiline text' && (
          <input
            type={type}
            name="value"
            value={value}
            onChange={handleChange}
            placeholder={placeholder ? placeholder : ''}
          />
        )}
        {type === 'checkbox' && (
          <input type={type} name="value" checked={value ? true : false} onChange={handleCheck} />
        )}
        {type === 'multiline text' && (
          <>
            <TextAreaField
              name="value"
              value={value}
              onChange={handleChangeTextArea}
              placeholder={placeholder ? placeholder : ''}
            />
          </>
        )}
      </div>
    </>
  );
}

CustomField.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  data: PropTypes.any,
  index: PropTypes.number,
  value: PropTypes.any,
};

export default CustomField;
