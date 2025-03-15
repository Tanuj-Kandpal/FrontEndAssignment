import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../Store/postSlice";
import { useNavigate } from "react-router-dom";
import { postEndpoint } from "../Helpers/Constants";

function Posts() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const posts = useSelector((store) => store.post?.posts) || [];

  async function getPosts() {
    try {
      const response = await fetch(postEndpoint);
      const posts = await response.json();
      dispatch(setPost(posts));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  function handleNavigate(id) {
    navigate(`/details?id=${id}`, { replace: true });
  }

  useEffect(() => {
    if (!posts || posts.length === 0) {
      getPosts();
    }
    return () => {
      dispatch(setPost([])); 
    };
  }, []);

  const filteredData = Array.isArray(posts)
    ? posts.filter((post) =>
        post?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search posts..."
        className="border p-2 rounded-md w-full mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded-lg p-4 shadow-lg"
            >
              <h1 className="font-bold text-lg truncate">{post.title}</h1>
              <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {post.body}
              </p>
              <button
                onClick={() => handleNavigate(post.id)}
                className="mt-4 bg-black text-white px-4 py-2 rounded-md w-full cursor-pointer"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No posts found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Posts;
