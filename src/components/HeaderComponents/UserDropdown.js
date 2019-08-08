import React from 'react';

const UserDropdown = ({ handleUserChange, users, user }) => {
  return (
    <label>
      User:
            <select onChange={({ target: { value: user } }) => { handleUserChange(user) }} value={user}>
              {users.map(({ username }) => (
                <option key={username} >{username}</option>
              ))}
            </select>
    </label>
  );
};

export default UserDropdown;