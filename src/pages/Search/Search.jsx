import './Search.css';
import useFetch from '../../hooks/useFetch';
import useQuery from '../../hooks/useQuery';
import Post from '../../components/Post/Post';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Search() {
  const query = useQuery();
  const search = query.get('q');
  const [searchResults, setSearchResults] = useState([]);
  const { documents: posts } = useFetch('posts');

  useEffect(() => {
    if (posts) {
      const results = posts.filter(post =>
        post.tags.join(',').includes(search)
      )
      setSearchResults(results);
    }
  }, [posts, search])


  return (
    <div className='search'>
      <h1>Search</h1>
      <div>
        {
          searchResults.length > 0 ?
            searchResults.map(post =>
              <Post post={post} key={post.id} />
            )
            :
            <p>No results found. <span><Link to='/'>Go back.</Link></span></p>
        }
      </div>
    </div>
  );
}

export default Search;