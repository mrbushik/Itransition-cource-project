import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function BackBtn({ backLink }) {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <>
      <button className="btn btn-secondary ms-3 mt-3 back-btn" onClick={() => history.goBack()}>
        {t('back')}
      </button>
    </>
  );
}

BackBtn.propTypes = {
  backLink: PropTypes.string,
};

export default BackBtn;
