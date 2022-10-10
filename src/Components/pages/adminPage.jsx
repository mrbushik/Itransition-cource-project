/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import {
  unblock,
  block,
  deleteUser,
  getAdmin,
  pickUpAdmin,
  getUsers,
} from '../services/adminRequests';

import UserTableItem from '../ui/userTableItem';
import EditButtons from '../common/buttons/editButtons';
import NavBar from '../navigation/navBar';
function AdminPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState({
    user: '',
  });
  const [errors, setErrors] = useState();
  const buttons = [t('unblock'), t('block'), t('delete'), t('get admin'), t('pickUpAdmin')];
  const requests = [unblock, block, deleteUser, getAdmin, pickUpAdmin];
  const history = useHistory();
  const role = localStorage.getItem('role');
  useEffect(() => {
    if (role !== 'ADMIN') {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (role === 'ADMIN') {
      getUsers(setUsers);
    }
  }, []);
  const handleChange = (target) => {
    setSelectedUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setErrors('');
  };

  const submitChanges = (buttonName) => {
    const requestNumber = buttons.findIndex((item) => item === buttonName);
    requests[requestNumber](
      `http://localhost:5000/api/change-status/${selectedUser.user}`,
      setUsers,
    );
  };

  const handlRequest = (buttonName) => {
    if (selectedUser.user) {
      // const requestNumber = buttons.findIndex((item) => item === buttonName);
      // requests[requestNumber]('https://jsonplaceholder.typicode.com/posts/1', { name: 'petya' });
      submitChanges(buttonName);
    } else {
      setErrors(t('choose user'));
    }
  };
  return (
    <>
      <NavBar />
      <EditButtons onToggle={handlRequest} btnList={buttons} />
      {errors && <div className="text-danger fs-4 ms-3">{errors}</div>}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{t('checkbox')}</th>
            <th scope="col">{t('id')}</th>
            <th scope="col">{t('username')}</th>
            <th scope="col">{t('role')}</th>
          </tr>
        </thead>
        {users && (
          <tbody>
            {users.map((user, index) => (
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
    </>
  );
}

export default AdminPage;
