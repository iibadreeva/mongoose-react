import React from 'react';

import { useAuth } from '@/hooks/useAuth';

import avatar from './avatar.png';

export const Profile = ({ user }) => {
  const isAuth = useAuth();

  return (
    <div className="user_container">
      {isAuth && (
        <>
          <div className="avatar">
            <img alt="avatar" src={avatar} />
          </div>
          <div className="nfo">
            <div>
              <span>Name:</span> {user.name}
            </div>
            <div>
              <span>Lastname:</span> {user.lastname}
            </div>
            <div>
              <span>Email:</span> {user.email}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
