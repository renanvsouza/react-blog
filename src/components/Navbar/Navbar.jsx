import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
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
        <li>
          <NavLink to='/about'>About</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;