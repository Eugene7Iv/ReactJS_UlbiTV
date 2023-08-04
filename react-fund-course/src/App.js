import React, { useState, useEffect } from 'react';
import './styles/App.css'
import PostsList from './components/PostsList';
import PostForm from './components/PostForm'
import PostFilter from './components/PostFilter';
import MyModal from './components/Ui/modal/MyModal';
import MyButton from './components/Ui/button/MyButton';
import { usePosts } from './hooks/usePosts';
import PostServies from './API/PostsService';
import Loader from './components/Ui/loader/Loader';

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [])

  async function fetchPosts() {
    setIsPostsLoading(true);
    setTimeout(async () => {
      const posts = await PostServies.getAll();
      setPosts(posts);
      setIsPostsLoading(false);
    }, 5000)

  }

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter
        filter={filter}
        setFilter={setFilter} />
      {
        isPostsLoading
          ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
              <Loader />
            </div>
          : <PostsList remove={removePost} posts={sortedAndSearchPosts} title={'Посты про JS'} />
      }
    </div>
  );
}

export default App;
