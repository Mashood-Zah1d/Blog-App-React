import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import {PostCard} from '../Component/Index';
function Home() {
    const getPost = useSelector((state) => state.post.Posts);
    const userData = useSelector((state) => state.auth.userData);
    const [post, setPost] = useState([]);
    const [activeTab, setActiveTab] = useState("my");
    const authstatus = useSelector((state)=> state.auth.authstatus);
    
        useEffect(() => {
        if (getPost.length > 0 && userData) {
            setPost(getPost.filter((p) => p.userId === userData.$id));
        }
    }, [getPost, userData]);

    const myPost = () => {
        setActiveTab("my");
        setPost(getPost.filter((post) => post.userId === userData.$id))
    };

    const otherPost = () => {
        setActiveTab("other");
        setPost(getPost.filter((post) => post.userId !== userData.$id));
    }
    
    return authstatus? (
    <div className="w-full">
  <div className="flex justify-center my-25 pt-16">
    <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-1 flex space-x-2">
      <button
        onClick={myPost}
        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
          activeTab === "my"
            ? "bg-white dark:bg-gray-800 text-blue-600 shadow-md"
            : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-blue-600"
        }`}
      >
        My Post
      </button>
      <button
        onClick={otherPost}
        className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
          activeTab === "other"
            ? "bg-white dark:bg-gray-800 text-blue-600 shadow-md"
            : "text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 hover:text-blue-600"
        }`}
      >
        Other Post
      </button>
    </div>
  </div>


  <div className="my-6 mx-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {post && post.length > 0 ? (
      post.map((post) => (
        <PostCard
          key={post.$id}
          {...post}
        />
      ))
    ) : (
      <div className="col-span-full text-center text-gray-500 py-10">
        No posts available
      </div>
    )}
  </div>
</div>
    )
    : (<div className="w-full h-screen flex justify-center items-center">
      <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
        Please Login
      </h1>
    </div>)
    }

export default Home