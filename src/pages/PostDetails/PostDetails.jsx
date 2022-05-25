import { useParams } from 'react-router-dom';
import useFetchPost from '../../hooks/useFetchPost';
import './PostDetails.css';


function PostDetails() {
  const { id } = useParams();
  const { document: post } = useFetchPost('posts', id);

  return (
    <div className='post-details'>
      {
        post && (
          <div className="post-container">
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title} />
            <p>{post.body}</p>
            <div className="tags-container">
              <h3>Tags:</h3>
              {post.tags.map(tag => <span>#{tag}</span>)}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default PostDetails;