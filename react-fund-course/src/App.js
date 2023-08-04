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
import { useFetcheng } from './hooks/useFetching';
import { getPageCount } from './utils/pages';
import Pagination from './components/Ui/pagination/Pagination';

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: '', query: '' });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetcheng(async (limit, page) => {
    const responce = await PostServies.getAll(limit, page);
    setPosts(responce.data);
    const totalCount = responce.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [])

  const changePage = (page) => {
    setPage(page);
    fetchPosts(limit, page);
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
        postError &&
        <h1>Произошла ошибка {postError}</h1>
      }
      {
        isPostsLoading
          ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
            <Loader />
          </div>
          : <PostsList remove={removePost} posts={sortedAndSearchPosts} title={'Посты про JS'} />
      }
      <Pagination
        page={page}
        changePage={changePage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default App;
