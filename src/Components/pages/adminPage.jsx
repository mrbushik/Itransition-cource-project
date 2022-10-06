/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTableItem from '../ui/userTableItem';
import EditButtons from '../common/editButtons';
import { unblock, block, deleteUser, getAdmin, pickUpAdmin } from '../services/adminRequests';
import { useHistory } from 'react-router-dom';
import NavBar from '../navigation/navBar';
function AdminPage() {
  const [users, setUsers] = useState();
  const [selectedUser, setSelectedUser] = useState({
    user: '',
  });
  const [errors, setErrors] = useState();
  const buttons = ['Unblock', 'Block', 'Delete', 'Get admin', 'Pick up admin'];
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
      axios
        .get('http://localhost:5000/api/all-users')
        .then((response) => response)
        .then((data) => setUsers(data.data.users));
    }
  }, []);
  const handleChange = (target) => {
    setSelectedUser((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setErrors('');
  };
  //   useEffect(() => {
  //     if (selectedUser.user) {
  //       const requestNumber = buttons.findIndex((item) => item === selectButton);
  //       requests[requestNumber]('https://jsonplaceholder.typicode.com/posts/1', { name: 'petya' });
  //     } else {
  //       setErrors('Select user');
  //     }
  //   }, [selectButton]);
  const handlRequest = (buttonName) => {
    if (selectedUser.user) {
      const requestNumber = buttons.findIndex((item) => item === buttonName);
      requests[requestNumber]('https://jsonplaceholder.typicode.com/posts/1', { name: 'petya' });
    } else {
      console.log('err');
      setErrors('choose user');
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
            <th scope="col">CheckBox</th>
            <th scope="col">Id</th>
            <th scope="col">User name</th>
            <th scope="col">Role</th>
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
