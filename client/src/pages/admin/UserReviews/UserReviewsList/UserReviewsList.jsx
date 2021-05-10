import React from 'react';
import moment from 'moment-js';
import { Link } from 'react-router-dom';

export const UserReviewsList = ({ book }) => (
  <tr>
    <td>
      <Link to={`/admin/edit-book/${book._id}`}>{book.name}</Link>
    </td>
    <td>{book.author}</td>
    <td>{moment(book.createdAt).format('DD.MM.YYYY hh:mm')}</td>
  </tr>
);
