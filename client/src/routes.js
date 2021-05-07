import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { WithLayout } from './hoc/withLayout';
import { Home } from './pages/Home/Home';
import { Books } from './pages/Books/Books';
import { Login } from './pages/Login/Login';
import { withAuth } from './hoc/withAuth';

export const Routes = () => (
  <WithLayout>
    <Switch>
      <Route path="/" exact component={withAuth(Home, null)} />
      <Route path="/books/:id" exact component={Books} />
      <Route path="/login" exact component={Login} />
    </Switch>
  </WithLayout>
);
