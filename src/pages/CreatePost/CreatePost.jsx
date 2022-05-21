import { useState } from 'react';
import './CreatePost.css';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useAuthValue } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState(null);
  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setFormError(null);

    //Validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError('Image must be a valid URL.');
      return;
    }

    //Create tag array
    const tagArray = tags.split(',').map((tag) => {
      return tag.trim().toLowerCase()
    })

    //Check the values
    if (!title || !image || !body || !tags) {
      setFormError('Please fill all required fields.');
    }


    insertDocument({
      title,
      image,
      body,
      tags: tagArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    //Redirect to homepage
    navigate('/');
  }


  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          <span>Title:</span>
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label htmlFor="image">
          <span>Image URL:</span>
          <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <label htmlFor="body">
          <span>Share your thoughts: </span>
          <textarea name="body" rows="3" value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        <label htmlFor="tags">
          <span>Tags:</span>
          <input type="text" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Enter the tags separated by commas" />
        </label>
        <label>
          {response.loading ?
            <button className="btn" type="submit" disabled>Post</button>
            :
            <button className="btn" type="submit">Post</button>
          }
        </label>
      </form>
      {(response.error || formError) && <p className='error'>{response.error || formError}</p>}
    </div>
  );
}

export default CreatePost;