import React from 'react'
import service from '../../Appwrite/Config'
import { Link } from 'react-router-dom'

function PostCard({
    $id,
    title,
    featuredImage
}) {


   return (
    <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-lg group">

      <img
        src={service.getFilePreview(featuredImage)}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5">
        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2">
          {title}
        </h3>

        <Link
          to={`/post/${$id}`}
          className="inline-block bg-white text-black text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-gray-200 transition"
        >
          View Post
        </Link>
      </div>
    </div>
  );
}

export default PostCard