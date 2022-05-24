import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import useAuth from './hooks/useAuth';
import { useState, useEffect } from 'react';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';

function App() {

  const [user, setUser] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth]);

  if (user === undefined) return <p>Loading</p>;

  return (
    <>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/search' element={<Search />} />
              <Route path='/login'
                element={!user ? <Login /> : <Navigate to='/' />} />
              <Route path='/register'
                element={!user ? <Register /> : <Navigate to='/' />} />
              <Route path='/posts'>
                <Route path='create'
                  element={!user ? <Navigate to='/login' /> : <CreatePost />} />
              </Route>
              <Route path='/dashboard'
                element={!user ? <Navigate to='/login' /> : <Dashboard />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
