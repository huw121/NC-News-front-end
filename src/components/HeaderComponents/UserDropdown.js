import React from 'react';
import styles from './Header.module.css';

const UserDropdown = ({ handleUserChange, users, user }) => {
  return (
    <form>
      <label className={styles.userItems}>
        <select onChange={({ target: { value: user } }) => { handleUserChange(user) }} value={user}>
          {users.map(({ username }) => (
            <option key={username} >{username}</option>
          ))}
        </select>
      </label>
    </form>
  );
};

export default UserDropdown;