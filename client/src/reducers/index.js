import { combineReducers } from 'redux';

import { bookReducer } from '@/reducers/book/reducer';
import { userReducer } from '@/reducers/user/reducer';

export const reducer = combineReducers({
  book: bookReducer,
  user: userReducer
});
