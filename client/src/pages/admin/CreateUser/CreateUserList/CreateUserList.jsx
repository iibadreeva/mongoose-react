import React from 'react';

export const CreateUserList = ({ user }) => (
  <tr key={user._id}>
    <td>{user.name}</td>
    <td>{user.lastname}</td>
    <td>{user.email}</td>
  </tr>
);
