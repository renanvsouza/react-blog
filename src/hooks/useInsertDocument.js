import { useState, useEffect, useReducer } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const initialState = {
  loading: null,
  error: null
}

function insertReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { loading: true, error: null };
    case "INSERTED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useInsertDocument(docCollection) {
  const [response, dispatch] = useReducer(insertReducer, initialState);

  const [canceled, setCanceled] = useState(false);

  function checkCancelBeforeDispatch(action) {
    if (!canceled) {
      dispatch(action);
    }
  }

  async function insertDocument(document) {
    try {
      const newDocument = { ...document, createdAt: Timestamp.now() };
      const insertedDocument = await addDoc(
        collection(db, docCollection),
        newDocument
      )

      checkCancelBeforeDispatch(
        {
          type: "INSERTED_DOC",
          payload: insertedDocument
        }
      )
    } catch (error) {
      checkCancelBeforeDispatch(
        {
          type: "ERROR",
          payload: error.message
        }
      )
    }
  }

  useEffect(() => {
    return () => setCanceled(true);
  }, [])

  return { insertDocument, response };
}