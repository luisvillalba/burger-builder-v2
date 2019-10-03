import React from 'react';
import { MenuItem, MenuList } from '@material-ui/core';
import css from './TopMenu.module.css';
import { NavLink } from 'react-router-dom';

export default (props) => {
    return (
        <MenuList dense className={css.HorizontalMenu}>
            <NavLink to="/"><MenuItem>Build it</MenuItem></NavLink>
            <NavLink to="/orders/"><MenuItem>Orders</MenuItem></NavLink>
            <NavLink to="/about/"><MenuItem>About</MenuItem></NavLink>
        </MenuList>
    ); 
}