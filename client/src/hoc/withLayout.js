import React from 'react';

import { Header } from '../components/Header/Header';

export const WithLayout = (props) => (
  <>
    <Header />
    {props.children}
  </>
);
