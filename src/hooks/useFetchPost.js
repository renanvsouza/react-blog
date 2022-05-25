import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  doc,
  getDoc
} from "firebase/firestore";

function useFetchPost(docCollection, id) {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());

        setLoading(false);

      } catch (e) {
        setError(e.message);
        console.log(error);
      }

      setLoading(false);
    }

    loadData();
  }, [docCollection, id, cancelled, error]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { document, loading, error };
}

export default useFetchPost;