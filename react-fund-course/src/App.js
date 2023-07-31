import React, { useState } from 'react';
import './styles/App.css'
import PostsList from './components/PostsList';
import PostForm from './components/PostForm'
import MySelect from './components/Ui/select/MySelect';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript 1', body: 'Description' },
    { id: 2, title: 'JavaScript 2', body: 'Description' },
    { id: 3, title: 'JavaScript 3', body: 'Description' }
  ]);

  const [selectedSort, setSelectedSort] = useState('');

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  }

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    console.log(sort);
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }} />
      <div>
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue='Сортировка'
          options={[
            { value: 'title', name: 'По названию' },
            { value: 'body', name: 'По описанию' },
          ]}
        />
      </div>
      {posts.length !== 0
        ?
        <PostsList remove={removePost} posts={posts} title={'Посты про JS'} />
        :
        <h1 style={{ textAlign: 'center' }}>
          Посты не найдены
        </h1>
      }
    </div>
  );
}

export default App;
