/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../redux/actions/adminData';
import { Link, useHistory } from 'react-router-dom';
import { unblock, block, deleteUser, getAdmin, pickUpAdmin } from '../services/adminRequests';

import UserTableItem from '../ui/userTableItem';
import EditBtn from '../common/buttons/editBtn';
import { logout } from '../utils/logout';
import { getToken } from '../utils/token';
import transtateKeys from '../translate/transtateKeys';

function AdminPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState({
    user: '',
  });
  const [errors, setErrors] = useState();

  const buttons = [
    t(transtateKeys.UNBLOCK),
    t(transtateKeys.BLOCK),
    t(transtateKeys.DELETE),
    t(transtateKeys.GET_ADMIN),
    t(transtateKeys.PIC_UP_ADMIN),
  ];

  const requests = [unblock, block, deleteUser, getAdmin, pickUpAdmin];
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  const allUsersURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/all-users`;

  const allUsers = useSelector(({ adminData }) => adminData.users);

  const updateUsers = () => dispatch(getAllUsers(allUsersURL, getToken()));

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

  const removeAdmin = (admin) => {
    if (!admin || admin.roles[0] === 'BLOCK') {
      logout();
      history.push('/login');
    } else {
      localStorage.setItem('role', 'USER');
      history.push('/');
    }
  };

  useEffect(() => {
    if (allUsers) {
      const admin = allUsers.find((item) => item._id === userId);
      if (!admin || admin.roles[0] !== 'ADMIN') removeAdmin(admin);
    }
  }, [allUsers]);

  const submitChanges = (buttonIndex) => {
    requests[buttonIndex](
      `${process.env.REACT_APP_DOMAIN_NAME}/api/change-status/${selectedUser.user}`,
      updateUsers,
      getToken(),
    );
  };

  const handlRequest = (buttonIndex) => {
    selectedUser.user ? submitChanges(buttonIndex) : setErrors(t(transtateKeys.CHOOSE_USER));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap">
        <EditBtn onToggle={handlRequest} btnList={buttons} />
        <div className="m-4">
          <Link to="admin-collections">
            <div className="btn btn-secondary  ">{t(transtateKeys.CHECK_USERS_COLLECTIONS)}</div>
          </Link>
        </div>
      </div>
      {errors && <div className="text-danger fs-4 ms-3">{errors}</div>}
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t(transtateKeys.CHECKBOX)}</th>
              <th scope="col">{t(transtateKeys.ID)}</th>
              <th scope="col">{t(transtateKeys.USERNAME)}</th>
              <th scope="col">{t(transtateKeys.ROLE)}</th>
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
