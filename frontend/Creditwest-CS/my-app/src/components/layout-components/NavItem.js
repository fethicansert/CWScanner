import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';

const NavItem = ({ name, icon, link, roles, allowedRoles }) => {

  const allowed = useRef(roles.find(role => allowedRoles.includes(role)));

  return (
    <>
      {allowed.current &&
        <NavLink
          className={
            ({ isActive }) => (isActive ? 'nav-item nav-item-active' : 'nav-item')
          }
          to={link}>
          {icon}
          <span className='nav-item-text'>{name}</span>
        </NavLink>}
    </>
  )
}

export default NavItem
