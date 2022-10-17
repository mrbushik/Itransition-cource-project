import React from 'react';
import PropTypes from 'prop-types';

function UserTableItem({ name, role, id, selectedUser, onChange }) {
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

UserTableItem.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  selectedUser: PropTypes.object,
  onChange: PropTypes.func,
};

export default UserTableItem;
