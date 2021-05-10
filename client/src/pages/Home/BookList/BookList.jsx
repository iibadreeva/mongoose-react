import React from 'react';
import { Link } from 'react-router-dom';

import './Book-list.scss';

export const BookList = (item) => (
  <Link to={`/book/${item._id}`} className="book-list">
    <div className="book-list__header">
      <h2>{item.name}</h2>
    </div>
    <div className="book-list__items">
      <div className="book_author">{item.author}</div>

      <div className="book-list__bubble">
        <strong>Цена</strong> {item.price} руб.
      </div>

      <div className="book-list__bubble">
        <strong>Страниц</strong> {item.pages}
      </div>

      <div className="book-list__bubble rating">
        <strong>Рейтинг</strong> {item.rating}
      </div>
    </div>
  </Link>
);
