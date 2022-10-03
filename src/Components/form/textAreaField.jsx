import React from 'react';

function TextAreaField({ value, label, placeholder, onChange, name }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-1">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          type={'text'}
          id={name}
          name={name}
          placeholder={placeholder ? placeholder : ''}
          value={value}
          onChange={handleChange}
          className={'form-control'}></textarea>
      </div>
    </div>
  );
}

export default TextAreaField;
