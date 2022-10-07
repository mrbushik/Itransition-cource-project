import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function UploadField({ name, onSave, isUrl }) {
  const [link, setLink] = useState('');
  const { t } = useTranslation();
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
          className={getInputClasses()}
          placeholder={t('upload field')}
          onChange={handleLink}
        />
        <button className="btn btn-outline-secondary" type="button" onClick={saveLink}>
          {t('upload')}
        </button>
        {!isUrl && <div className="invalid-feedback">{t('upload error')}</div>}
      </div>
    </>
  );
}

export default UploadField;
