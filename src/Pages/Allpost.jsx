import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { PostCard } from '../Component/Index';
function Allpost() {
    const post= useSelector((state) => state.post.Posts);
    const authstatus = useSelector((state)=> state.auth.authstatus)
    if (!authstatus) return <div>Login First</div>;

    return (
        <div className=" my-20 py-8 flex flex-wrap">
            {post.length > 0 ? (
                post.map((p) => (
                    <div key={p.$id} className="p-2 w-1/4">
                        <PostCard {...p} />
                    </div>
                ))
            ) : (
                <div>No posts available</div>
            )}
        </div>
    );
}
export default Allpost