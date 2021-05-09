import React from 'react';
import SideVav from 'react-simple-sidenav';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import { useAuth } from '@/hooks/useAuth';

import { items } from './data.js';

export const Sidenav = (props) => {
  const isAuth = useAuth();

  const element = (item, i) => (
    <div key={i} className={item.type}>
      <Link to={item.link}>
        <FontAwesome name={item.icon} />
        {item.text}
      </Link>
    </div>
  );

  return (
    <SideVav
      className="sidenav"
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      navStyle={{ background: '#242424' }}
    >
      {items.map((item, i) => {
        if (isAuth) {
          return !item.exclude ? element(item, i) : null;
        }
        return !item.restricted ? element(item, i) : null;
      })}
    </SideVav>
  );
};
