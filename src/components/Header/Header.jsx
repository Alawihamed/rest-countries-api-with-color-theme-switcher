import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({darkTheme,setNewTheme}) {
  return (
    <div className={`header ${darkTheme}`}>
        <div className='logo'>
            <Link to={'/'}>
              <h1>Where in the world?</h1>
            </Link>
        </div>
        <div className='dark-mode'>
            {darkTheme === 'dark' ? (<i className="fa-solid fa-moon"></i>) : (<i className="fa-regular fa-moon"></i>)}
            <span onClick={()=>setNewTheme()}>
              {darkTheme === 'dark' ? 'Light Mode' :'Dark Mode'}
            </span>
        </div>
    </div>
  )
}
