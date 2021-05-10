import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { checkAuth } from '@/reducers/user/action';
import { pendingSelector, userSelector } from '@/reducers/user/selectors';
import { Loader } from '@/components/Loader/Loader';

export const withAuth = (WrappedComponent, reload) => (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isPending, user } = useSelector((state) => ({
    isPending: pendingSelector(state),
    user: userSelector(state)
  }));

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (user && !user.isAuth) {
      if (reload) {
        history.replace('/login');
      }
    } else if (reload === false) {
      history.replace('/profile');
    }
  }, [user, history]);

  if (isPending) {
    return <Loader />;
  }

  return <WrappedComponent {...props} user={user} />;
};
