import React from 'react';

function UserTableItem({ name, role, id, selectedUser, onChange }) {
  const [check, setCheck] = React.useState(false);
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <tr>
      <th>
        <input
          type="radio"
          name="user"
          value={id}
          onChange={handleChange}
          checked={selectedUser.user === id}
        />
      </th>
      <th>{id}</th>
      <th>{name}</th>
      <th>{role}</th>
    </tr>
  );
}

export default UserTableItem;
