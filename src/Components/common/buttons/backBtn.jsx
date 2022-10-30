import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import translateKeys from '../../translate/translateKeys';

function BackBtn({ backLink }) {
  const { t } = useTranslation();
  const history = useHistory();

  const returnToTargetPage = () => (backLink ? history.push(backLink) : history.goBack());

  return (
    <>
      <button className="btn btn-secondary ms-3 mt-3 back-btn" onClick={returnToTargetPage}>
        {t(translateKeys.BACK)}
      </button>
    </>
  );
}

BackBtn.propTypes = {
  backLink: PropTypes.string,
};

export default BackBtn;
