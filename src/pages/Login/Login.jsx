import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authError, loading, login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email,
      password
    }

    await login(data);
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <span>E-mail: </span>
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label htmlFor="password">
          <span>Password: </span>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          {
            loading ?
              <button className='btn' type="submit" disabled>Login</button>
              :
              <button className='btn' type="submit">Login</button>
          }
        </label>
      </form>
      <p>Don't have an account? <span><Link to='/register'>
        Register</Link></span></p>
      {authError && <p className='error'>{authError}</p>}
    </div>
  );
}

export default Login;