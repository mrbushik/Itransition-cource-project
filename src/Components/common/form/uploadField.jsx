import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { uploadFile } from '../../services/modalRequests';

function UploadField({ name, onSave, isUrl }) {
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const checkFileSize = (fileSize) => {
    if (fileSize > 2100000) {
      setErrors(t('file error'));
      return true;
    } else {
      setErrors('');
    }
    return false;
  };

  const uploadImage = async (e) => {
    setLoading(true);
    const isBigFile = checkFileSize(e.target.files[0].size);
    if (!isBigFile) {
      await uploadFile(e, onSave);
    }
    setLoading(false);
  };

  const handleLink = (e) => {
    setLink(e);
  };

  const saveLink = () => {
    if (link) {
      uploadImage(link);
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
          accept=".png,.jpeg,.jpg,.heic,.raw"
          className={getInputClasses()}
          placeholder={t('upload field')}
          onChange={handleLink}
        />
        <button className="btn btn-outline-secondary" type="button" onClick={saveLink}>
          {t('upload')}
        </button>
        {!isUrl && <p className="invalid-feedback text-danger">{t('upload error')}</p>}
      </div>
      {errors && <div className="text-danger">{errors}</div>}
      {loading && <div className="lds-dual-ring "></div>}
    </>
  );
}

export default UploadField;
