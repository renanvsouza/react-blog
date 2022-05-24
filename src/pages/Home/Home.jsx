import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Post from '../../components/Post/Post';
import useFetch from '../../hooks/useFetch';
import './Home.css';

function Home() {
  const [searchValue, setSearchValue] = useState('');
  const { documents: posts, loading } = useFetch("posts");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (searchValue) navigate(`/search?q=${searchValue}`);

    setSearchValue('');
  }

  return (
    <div className='home'>
      <h1>See our most recent posts</h1>
      <form className='search-form' onSubmit={handleSubmit}>
        <input type="text" placeholder="Or search by tags" onChange={(e) => setSearchValue(e.target.value)} />
        <button className="btn-sm">Search</button>
      </form>
      <div>
        {posts && posts.length < 1 && (
          <div className='no-posts'>
            <p>Nothing to show yet.</p>
            <Link to="/posts/create">Create a post</Link>
          </div>
        )}
        {loading && (<p>Loading</p>)}
        {posts && posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;