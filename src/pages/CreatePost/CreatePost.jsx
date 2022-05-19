import { useState } from 'react';
import './CreatePost.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
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
          <button className="btn" type="submit">Post</button>
        </label>
      </form>
    </div>
  );
}

export default CreatePost;