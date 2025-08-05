import React from 'react';
import { Link } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import '../styles/Navigation.css';

const Navigation = () => {
  return (
    <div className="navigation">
      <Menu>
        <Link className="menu-item" to="/">
          Home
        </Link>
        <Link className="menu-item" to="/postcards">
          Postcards
        </Link>
        <Link className="menu-item" to="/about">
          About the Game
        </Link>
      </Menu>
    </div>
  );
};

export default Navigation; 