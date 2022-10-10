import React from 'react';

function TextAreaField({ value, label, placeholder, onChange, name, error }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };
  return (
    <div className="mb-3">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <textarea
          type="text"
          id={name}
          name={name}
          placeholder={placeholder ? placeholder : ''}
          value={value}
          onChange={handleChange}
          className={getInputClasses()}></textarea>
        {error && <p className="invalid-feedback text-danger">{error}</p>}
      </div>
    </div>
  );
}

export default TextAreaField;
