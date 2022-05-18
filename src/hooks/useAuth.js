import { db } from '../firebase/config';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
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

  useEffect(() => {
    return () => setCanceled(true);
  }, []);


  return { auth, createUser, authError, loading };
}

export default useAuth;