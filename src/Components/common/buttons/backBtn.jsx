import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
function BackBtn({ backLink }) {
  const { t } = useTranslation();

  return (
    <>
      <Link to={backLink}>
        <button className="btn btn-secondary ms-3 mt-3"> {t('back')}</button>
      </Link>
    </>
  );
}

export default BackBtn;
