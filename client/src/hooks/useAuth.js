import { useSelector } from 'react-redux';

import { userSelector } from '../reducers/user/selectors';

export const useAuth = () => {
  const user = useSelector(userSelector);
  return user && !!user.isAuth;
};
