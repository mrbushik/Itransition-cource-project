/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useParams } from 'react-router-dom';
import TextField from '../form/textField';
import { validator } from '../utils/validator';
import { loginRequest } from '../utils/loginRequest';
import { useHistory } from 'react-router-dom';

function Login() {
  const { type } = useParams();
  const [formType, setFormType] = React.useState(type === 'register' ? type : 'login');
  const togleFormType = () => {
    setFormType((pervState) => (pervState === 'register' ? 'login' : 'register'));
  };
  const [data, setData] = React.useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({});
  // const [auth, setAuth] = React.useState();
  const history = useHistory();

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const validatorConfig = {
    username: {
      isRequired: {
        message: 'this field is required',
      },
    },
    password: {
      isRequired: {
        message: 'this field is required',
      },
      min: {
        message: 'Пароль должен состоять минимум из 5 символов',
        value: 5,
      },
    },
  };
  React.useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
    formType === 'login'
      ? loginRequest('http://localhost:5000/auth/login', data, setErrors)
      : loginRequest('http://localhost:5000/auth/registration', data, setErrors);
  };
  if (errors.token) {
    history.push('/');
  }
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3 shadow p-4">
            {formType === 'register' ? (
              <h3 className="mb-4">Register</h3>
            ) : (
              <h3 className="mb-4">Login</h3>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                label="user username"
                name="username"
                value={data.username}
                onChange={handleChange}
                error={errors.username}
              />
              <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
              />
              <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
                Submit
              </button>
              {errors.message ? (
                <span className="text-danger mt-2 mb-2">{errors.message}</span>
              ) : (
                <div className=""></div>
              )}
            </form>
            <p>Already have account?</p>{' '}
            <a role="button" onClick={togleFormType}>
              Sing In
            </a>
            <a role="button" onClick={togleFormType}>
              Sing Un
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
