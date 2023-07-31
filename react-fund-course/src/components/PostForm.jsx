import React, { useState } from 'react';
import MyButton from './Ui/button/MyButton';
import MyInput from './Ui/input/MyInput';

const PostForm = function({create}) {
    const [post, setPost] = useState({title: '', body: ''});

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now()
        }
        create(newPost);
        setPost({title: '', body: ''});
      }

    return (
        <form>
        {/*Управляемый компонент, бывают ещё не управляемые используют ref в теге и хук useRef*/}
        <MyInput
          value={post.title}
          onChange={e => setPost({...post, title: e.target.value})}
          type='text'
          placeholder='Название поста' />
        <MyInput
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})}
          type='text'
          placeholder='Описание поста' />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form> 
    )
}

export default PostForm;