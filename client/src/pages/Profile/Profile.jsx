import React from 'react';

import { useAuth } from '@/hooks/useAuth';

import './Profile.scss';
import avatar from './avatar.png';

export const Profile = ({ user }) => {
  const isAuth = useAuth();

  return (
    <div className="profile">
      {isAuth && (
        <>
          <div className="profile__avatar">
            <img alt="avatar" src={avatar} />
          </div>
          <div className="profile__body">
            <div>
              <span>Имя:</span> {user.name}
            </div>
            <div>
              <span>Фамилия:</span> {user.lastname}
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
