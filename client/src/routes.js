import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { WithLayout } from '@/hoc/withLayout';
import { withAuth } from '@/hoc/withAuth';
import { Home } from '@/pages/Home/Home.jsx';
import { Books } from '@/pages/Books/Books.jsx';
import { Login } from '@/pages/Login/Login.jsx';
import { Profile } from '@/pages/Profile/Profile.jsx';
import { CreateBook } from '@/pages/admin/CreateBook/CreateBook.jsx';
import { UserReviews } from '@/pages/admin/UserReviews/UserReviews.jsx';
import { EditBook } from '@/pages/admin/EditBook/EditBook.jsx';
import { CreateUser } from '@/pages/admin/CreateUser/CreateUser.jsx';
import { Logout } from '@/pages/admin/Logout/Logout';

export const Routes = () => (
  <WithLayout>
    <Switch>
      <Route path="/" exact component={withAuth(Home, null)} />
      <Route path="/book/:id" exact component={withAuth(Books, null)} />
      <Route path="/login" component={withAuth(Login, false)} />
      <Route path="/profile" component={withAuth(Profile, true)} />
      <Route path="/admin/create/book" component={withAuth(CreateBook, true)} />
      <Route path="/admin/user-books" component={withAuth(UserReviews, true)} />
      <Route
        path="/admin/edit-book/:id"
        exact
        component={withAuth(EditBook, true)}
      />
      <Route path="/admin/create/user" component={withAuth(CreateUser, true)} />
      <Route path="/user/logout" component={withAuth(Logout, true)} />
    </Switch>
  </WithLayout>
);
