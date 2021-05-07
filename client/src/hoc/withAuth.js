import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { checkAuth } from '../reducers/user/action';
import { pendingSelector, userSelector } from '../reducers/user/selectors';

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
    if (user && !user.isAuth && reload) {
      history.replace('/login');
    } else if (reload === false) {
      history.replace('/user');
    }
  }, [user, history]);

  if (isPending) {
    return <div className="loader">Loading...</div>;
  }

  return <WrappedComponent {...props} user={user} />;
};
