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

function AdminPage() {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState({
    user: '',
  });
  const [errors, setErrors] = useState();

  const buttons = [t('unblock'), t('block'), t('delete'), t('get admin'), t('pickUpAdmin')];
  const requests = [unblock, block, deleteUser, getAdmin, pickUpAdmin];
  const userId = localStorage.getItem('userId');
  const role = localStorage.getItem('role');
  const allUsersURL = `${process.env.REACT_APP_DOMAIN_NAME}/api/all-users`;

  const allUsers = useSelector(({ adminData }) => adminData.users);

  const updateUsers = () => dispatch(getAllUsers(allUsersURL, getToken()));

  useEffect(() => {
    if (role !== 'ADMIN') history.push('/');
  }, []);

  useEffect(() => {
    if (role === 'ADMIN') updateUsers();
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
    selectedUser.user ? submitChanges(buttonIndex) : setErrors(t('choose user'));
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap">
        <EditBtn onToggle={handlRequest} btnList={buttons} />
        <div className="m-4">
          <Link to="admin-collections">
            <div className="btn btn-secondary  ">{t('Check users collections')}</div>
          </Link>
        </div>
      </div>
      {errors && <div className="text-danger fs-4 ms-3">{errors}</div>}
      <div className="overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">{t('checkbox')}</th>
              <th scope="col">{t('id')}</th>
              <th scope="col">{t('username')}</th>
              <th scope="col">{t('role')}</th>
            </tr>
          </thead>
          {allUsers && (
            <tbody>
              {allUsers.map((user, index) => (
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
