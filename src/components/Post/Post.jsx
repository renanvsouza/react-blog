import { Link } from "react-router-dom";
import './Post.css';

function Post({ post }) {
  return (
    <div className="post">
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>Posted by {post.createdBy}</p>
      <div className="tags">
        {
          post.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))
        }
      </div>
      <Link to={`/posts/${post.id}`} className="btn">Show</Link>
    </div>
  );
}

export default Post;