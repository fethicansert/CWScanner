import React from 'react'
import logo from '../../images/cwlogo.png'
import useAuth from '../../hooks.js/useAuth';
import useLogout from '../../hooks.js/useLogout';
import { useNavigate } from 'react-router-dom';

const Header = ({ title }) => {


  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate('/');
  }
  return (
    <header className='header'>
      <div className='header-flex-group'>
        <img src={logo} width={70}></img>
        <h1>{title}</h1>
      </div>

      {
        auth.firstName &&
        <div className='header-flex-group'>
          <span className='username-text'>{auth.firstName} {auth.lastName} | <span onClick={handleLogout}>Çıkış Yap</span></span>
        </div>
      }

    </header>
  );
}




export default Header
