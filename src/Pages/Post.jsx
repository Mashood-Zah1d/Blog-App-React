import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../Appwrite/Config';
import { deletePost } from '../Store/PostSlice';
import { Link } from 'react-router-dom';
import parse from "html-react-parser";

function Post() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const posts = useSelector((state) => state.post.Posts);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const p = posts.find(p => p.$id === slug);
        setPost(p);
    }, [posts, slug]); 



    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    const postDelete = async () => {
        try {
            await service.deletePost(slug);
            dispatch(deletePost(slug))
            navigate("/");
        } catch (error) {
            console.log("ERROR DELETING POST :: ERROR" + error);

        }
    }

    return post ? (
        <div className="py-12 max-w-5xl my-20 mx-auto px-4">
            <div className="relative mb-8">
                <img
                    src={service.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-80 md:h-96 rounded-xl shadow-lg object-cover"
                />

                {isAuthor && (
                    <div className="absolute top-4 right-4 flex space-x-3">
                        <Link to={`/edit-post/${post.$id}`}>
                            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-colors">
                                Edit
                            </button>
                        </Link>
                        <button
                            onClick={postDelete}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {post.title}
            </h1>

            <div className="prose prose-lg max-w-full text-gray-700 dark:text-gray-800 leading-relaxed">
                {parse(post.content)}
            </div>
        </div>

    ) : null;
}

export default Post