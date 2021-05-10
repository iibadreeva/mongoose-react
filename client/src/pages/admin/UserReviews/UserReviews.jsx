import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { UserReviewsList } from '@/pages/admin/UserReviews/UserReviewsList/UserReviewsList';
import { getUserPosts } from '@/reducers/user/action';
import {
  userLoadingSelector,
  userBooksSelector
} from '@/reducers/user/selectors';
import { Loader } from '@/components/Loader/Loader.jsx';

export const UserReviews = ({ user }) => {
  const dispatch = useDispatch();
  const { loading, userBooks } = useSelector(
    (state) => ({
      loading: userLoadingSelector(state),
      userBooks: userBooksSelector(state)
    }),
    shallowEqual
  );

  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getUserPosts(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setBooks(userBooks);
  }, [userBooks]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="user_posts">
      <h4>Мои книжки:</h4>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Автор</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book) => <UserReviewsList key={book._id} book={book} />)}
        </tbody>
      </table>
    </div>
  );
};
