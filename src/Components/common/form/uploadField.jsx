import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { uploadFile } from '../../services/modalRequests';
import transtateKeys from '../../translate/transtateKeys';

function UploadField({ name, onSave, isUrl }) {
  const [link, setLink] = useState('');
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const MAX_FILE_SIZE = 2100000;

  const checkFileSize = (fileSize) => {
    if (fileSize > MAX_FILE_SIZE) {
      setErrors(t(transtateKeys.FILE_ERROR));
      return true;
    }

    setErrors('');
    return false;
  };

  const uploadImage = async (e) => {
    setLoading(true);
    const isBigFile = checkFileSize(e.target.files[0].size);
    if (!isBigFile) await uploadFile(e, onSave);
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
          placeholder={t(transtateKeys.UPLOAD_FIELD)}
          onChange={handleLink}
        />
        <button className="btn btn-outline-secondary" type="button" onClick={saveLink}>
          {t(transtateKeys.UPLOAD)}
        </button>
        {!isUrl && <p className="invalid-feedback text-danger">{t(transtateKeys.UPLOAD_ERROR)}</p>}
      </div>
      {errors && <div className="text-danger">{errors}</div>}
      {loading && <div className="lds-dual-ring "></div>}
    </>
  );
}

UploadField.propTypes = {
  name: PropTypes.string,
  isUrl: PropTypes.string,
  onSave: PropTypes.func,
};

export default UploadField;
