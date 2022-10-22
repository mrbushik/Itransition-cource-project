/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validator } from '../utils/validator';

import TextField from '../common/form/textField';

function ActivateMail({ resendMail }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState({ email: '' });

  const validatorConfig = {
    email: {
      isRequired: {
        message: t('field required'),
      },
      isEmail: {
        message: t('email error'),
      },
    },
  };

  const validate = () => {
    const errors = validator(email, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    validate();
  }, [email]);

  const handleChange = (target) => {
    setEmail((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div>
      <div className="m-3">
        <p>{t('resend email')}</p>
        <TextField
          label={t('email')}
          type="text"
          name="email"
          value={email.email}
          onChange={handleChange}
          error={errors.email}
        />
        <div
          className="btn btn-secondary"
          onClick={() => resendMail(email.email)}
          disabled={!isValid}>
          {t('send email')}
        </div>
      </div>
    </div>
  );
}

export default ActivateMail;
