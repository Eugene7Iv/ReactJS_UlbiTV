import React from "react";
import MyButton from "./Ui/button/MyButton";

const PostItem = function (props) {
    return (
        <div className="post">
            <div className='psot__content'>
                <strong>{props.number}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className='post__btns'>
                <MyButton onClick={()=>props.remove(props.post)}>Удалить</MyButton>
            </div>
        </div>
    )
}

export default PostItem;