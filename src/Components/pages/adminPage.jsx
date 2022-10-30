/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { adminErrors, getAllUsers } from '../redux/actions/adminData';
import { Link, useHistory } from 'react-router-dom';
import { unblock, block, deleteUser, getAdmin, pickUpAdmin } from '../services/adminRequests';

import UserTableItem from '../ui/userTableItem';
import EditBtn from '../common/buttons/editBtn';
import { logout } from '../utils/logout';
import { getToken } from '../utils/token';
import translateKeys from '../translate/translateKeys';

function AdminPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState({ user: '' });
  const [errors, setErrors] = useState();

  const buttons = [
    t(translateKeys.UNBLOCK),
    t(translateKeys.BLOCK),
    t(translateKeys.DELETE),
    t(translateKeys.GET_ADMIN),
    t(translateKeys.PIC_UP_ADMIN),
  ];

  const requests = [unblock, block, deleteUser, getAdmin, pickUpAdmin];
  const role = localStorage.getItem('role');
  const allUsersURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/all-users`;

  const allUsers = useSelector(({ adminData }) => adminData.users);
  const requestErrors = useSelector(({ adminData }) => adminData.errors);

  const updateUsers = () => dispatch(getAllUsers(allUsersURL, getToken(), setErrors));

  useEffect(() => {
    role === 'ADMIN' ? updateUsers() : history.push('/');
  }, []);

  const handleChange = (target) => {
    setSelectedUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setErrors('');
  };

  useEffect(() => {
    if (requestErrors) {
      logout();
      history.push('/login');
      dispatch(adminErrors(''));
    }
  }, [requestErrors]);

  const submitChanges = (buttonIndex) => {
    requests[buttonIndex](
      `${process.env.REACT_APP_DOMAIN_NAME}/api/change-status/${selectedUser.user}`,
      updateUsers,
      getToken(),
    );
  };

  const handlRequest = (buttonIndex) => {
    selectedUser.user ? submitChanges(buttonIndex) : setErrors(t(translateKeys.CHOOSE_USER));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap">
        <EditBtn onToggle={handlRequest} btnList={buttons} />
        <div className="m-4">
          <Link to="admin-collections">
            <div className="btn btn-secondary  ">{t(translateKeys.CHECK_USERS_COLLECTIONS)}</div>
          </Link>
        </div>
      </div>
      {errors && <div className="text-danger fs-4 ms-3">{errors}</div>}
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t(translateKeys.CHECKBOX)}</th>
              <th scope="col">{t(translateKeys.ID)}</th>
              <th scope="col">{t(translateKeys.USERNAME)}</th>
              <th scope="col">{t(translateKeys.ROLE)}</th>
            </tr>
          </thead>
          {allUsers && (
            <tbody>
              {allUsers.map((user) => (
                <UserTableItem
                  selectedUser={selectedUser}
                  key={user._id}
                  name={user.username}
                  role={user.roles}
                  id={user._id}
                  onChange={handleChange}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default AdminPage;
