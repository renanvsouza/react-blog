import { Link, NavLink } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';
import './Navbar.css';

function Navbar() {
  const { user } = useAuthValue();
  const { logout } = useAuth();

  return (
    <nav className='navbar'>
      <Link to='/'>
        <div className="brand">
          Mini <span>Blog</span>
        </div>
      </Link>
      <ul className='links-list'>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        {!user &&
          <>
            <li>
              <NavLink to='/login'>Login</NavLink>
            </li>
            <li>
              <NavLink to='/register'>Register</NavLink>
            </li>
          </>
        }
        {user &&
          <>
            <li>
              <NavLink to='/posts/create'>Create Post</NavLink>
            </li>
            <li>
              <NavLink to='/dashboard'>Dashboard</NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </>
        }
      </ul>
    </nav>
  );
}

export default Navbar;