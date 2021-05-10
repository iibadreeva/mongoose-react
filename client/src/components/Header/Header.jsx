import React, { useState, useCallback } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import { Sidenav } from '@/components/Sidenav/Sidenav.jsx';

import './Header.scss';

export const Header = () => {
  const [isNav, setNav] = useState(false);

  const onToggleNav = useCallback(() => {
    setNav(!isNav);
  }, [isNav]);

  return (
    <header className="header">
      <div className="open_nav">
        <FontAwesome
          name="bars"
          onClick={onToggleNav}
          style={{
            color: '#fff',
            padding: '10px',
            cursor: 'pointer'
          }}
        />
        <Sidenav showNav={isNav} onHideNav={onToggleNav} />
        <Link to="/" className="logo">
          The book Shelf
        </Link>
      </div>
    </header>
  );
};
