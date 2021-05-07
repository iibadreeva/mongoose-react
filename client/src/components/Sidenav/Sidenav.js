import React from 'react';
import SideVav from 'react-simple-sidenav';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

import { items } from './data';

export const Sidenav = (props) => {
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
      navStyle={{
        background: '#242424'
      }}
    >
      {items.map((item, i) => (!item.restricted ? element(item, i) : null))}
    </SideVav>
  );
};
