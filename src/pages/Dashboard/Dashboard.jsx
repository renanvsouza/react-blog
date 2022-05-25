import './Dashboard.css';
import { useAuthValue } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useDelete from '../../hooks/useDelete';

function Dashboard() {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts } = useFetch('posts', null, uid);
  const { deleteDocument } = useDelete('posts')

  return (
    <div className='dashboard'>
      <h1>My Posts</h1>
      {
        !posts ? (
          <div className="no-posts">
            <p>No posts yet.</p>
            <Link to="/posts/create">Create a post</Link>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <Link to={`/posts/${post.id}`}>
                      <i className="fa-solid fa-eye"></i> View</Link>
                  </td>
                  <td>
                    <Link to={`/posts/${post.id}/edit`}>
                      <i className="fa-solid fa-pen-to-square"></i> Edit</Link>
                  </td>
                  <td>
                    <button className='btn-danger' onClick={() => deleteDocument(post.id)}>
                      Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default Dashboard;