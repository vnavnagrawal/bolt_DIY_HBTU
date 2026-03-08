import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="header">
      <h1><Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Alumni Association</Link></h1>
      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/events">Events</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/newsletters">Newsletters</NavLink>
        <NavLink to="/polls">Polls</NavLink>
        {session ? (
          <>
            <NavLink to="/profile">Profile</NavLink>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', padding: '0', fontSize: '1em' }}>Logout</button>
          </>
        ) : (
          <NavLink to="/auth">Login/Signup</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
