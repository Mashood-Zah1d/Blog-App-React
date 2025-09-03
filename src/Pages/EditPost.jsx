import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {  PostForm } from '../Component/Index';

function EditPost() {
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();
    const posts = useSelector((state)=> state.post.Posts)
    useEffect(()=>{
        if(slug){
            setPost(posts.find((post)=> post.$id === slug))
        }
        else{
            navigate("/");
        }
    },[slug,navigate,posts])
  
    return post? (
        <div className='py-8'>
             <PostForm post={post}/>
        </div>
    ) : null
}

export default EditPost