import { useEffect, useState } from 'react';
import './EditPost.css';
import { useNavigate, useParams } from 'react-router-dom';
import useFetchPost from '../../hooks/useFetchPost';
import useUpdate from '../../hooks/useUpdate';

function EditPost() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);

  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { document: post } = useFetchPost('posts', id);
  const { updateDocument, response } = useUpdate('posts');


  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      setTags(post.tags.join(', '));
    }
  }, [post])

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


    updateDocument(id, {
      title,
      image,
      body,
      tags: tagArray
    })

    //Redirect to homepage
    navigate('/dashboard');
  }


  return (
    <div>
      <h1>Edit Post</h1>
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

export default EditPost;