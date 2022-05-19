import { db } from '../firebase/config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useEffect, useState } from "react";

function useAuth() {
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(null);

  //Clean-up
  const [canceled, setCanceled] = useState(false);

  const auth = getAuth();

  function checkIfIsCanceled() {
    if (canceled) return;
  }

  async function createUser(data) {
    checkIfIsCanceled();
    setLoading(true);
    setAuthError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName
      });

      setLoading(false);
      return user;

    } catch (error) {
      //Returns the error message without the "Firebase: " at the beggining
      setAuthError(error.message.slice(9));
    }

    setLoading(false);
  }

  //Login
  async function login(data) {
    checkIfIsCanceled();
    setLoading(true);
    setAuthError(null);

    try {
      await signInWithEmailAndPassword(
        auth, data.email, data.password
      );
    } catch (error) {
      //Returns the error message without the "Firebase: " at the beggining
      setAuthError('Invalid username or password.');
    }
    setLoading(false);
  }


  //Logout
  function logout() {
    checkIfIsCanceled();
    signOut(auth);
  }

  useEffect(() => {
    return () => setCanceled(true);
  }, []);


  return { auth, createUser, login, logout, authError, loading };
}

export default useAuth;