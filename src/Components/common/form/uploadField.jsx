import React, { useRef, useState } from 'react';

function UploadField({ name, onSave, isUrl }) {
  const [link, setLink] = useState('');
  const fileName = useRef();
  const handleLink = (e) => {
    setLink(e);
  };
  const saveLink = () => {
    if (link) {
      onSave(link);
    }
  };
  const getInputClasses = () => {
    return 'form-control' + (isUrl ? '' : ' is-invalid');
  };

  return (
    <>
      <div className="input-group">
        <input
          name={name}
          type="file"
          ref={fileName.current}
          // value="dd"
          className={getInputClasses()}
          placeholder="Upload an image"
          onChange={handleLink}
        />
        <button className="btn btn-outline-secondary" type="button" onClick={saveLink}>
          upload
        </button>
        {!isUrl && <div className="invalid-feedback">Attach the file and upload</div>}
      </div>
    </>
  );
}

export default UploadField;
