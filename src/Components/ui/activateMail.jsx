/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validator } from '../utils/validator';

import TextField from '../common/form/textField';
import translateKeys from '../translate/translateKeys';

function ActivateMail({ resendMail }) {
  const { t } = useTranslation();
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState({ email: '' });

  const validatorConfig = {
    email: {
      isRequired: {
        message: t(translateKeys.FIELD_REQUIRED),
      },
      isEmail: {
        message: t(translateKeys.EMAIL_ERROR),
      },
    },
  };

  const validate = () => {
    const errors = validator(email, validatorConfig);
    setErrors(errors);
    return !Object.keys(errors).length;
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

  const isValid = !Object.keys(errors).length;

  return (
    <div>
      <div className="m-3">
        <p>{t(translateKeys.RESEND_EMAIL)}</p>
        <TextField
          label={t(translateKeys.EMAIL)}
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
          {t(translateKeys.SEND_EMAIL)}
        </div>
      </div>
    </div>
  );
}

export default ActivateMail;
