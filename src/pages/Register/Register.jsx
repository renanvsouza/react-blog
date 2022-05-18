import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import './Register.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { createUser, authError, loading } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {

      setError("Password doesn't match confirmation.");
      console.log(error);

    } else {

      const data = {
        displayName: name,
        email,
        password
      }

      const res = await createUser(data);

      console.log(res);

    }

    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }


  return (
    <div>
      <h1>Register to start posting</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          <span>Username: </span>
          <input type="text" name="displayName" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label htmlFor="email">
          <span>E-mail: </span>
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label htmlFor="password">
          <span>Password: </span>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label htmlFor="confirmPassword">
          <span>Confirm password: </span>
          <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </label>
        {
          loading ?
            <button className='btn' type="submit" disabled>Register</button>
            :
            <button className='btn' type="submit">Register</button>
        }
      </form>
      {(error || authError) && <p className='error'>{error || authError}</p>}
    </div>
  );
}

export default Register;