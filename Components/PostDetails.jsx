import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { getPost } from "../Store/postSlice";

function PostDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const currentPostId = query.get("id");

  useEffect(() => {
    if (currentPostId) {
      fetchPostById(currentPostId);
    }
  }, [currentPostId]);

  async function fetchPostById(id) {
    try {
      const data = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const response = await data.json();
      dispatch(getPost(response));
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }

  const { postDetails } = useSelector((store) => store.post) || {};
  const { id, title, body } = postDetails || {};

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:cursor-pointer"
      >
        Back to Posts
      </button>

      <div className="bg-whit rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-2 capitalize">{title}</h1>
        <div className="border-t border-gray-800 dark:border-gray-700 my-4"></div>
        <p className="text-black dark:text-black">{body}</p>

        <div className="mt-4 flex justify-end">
          <span className="text-sm text-gray-500">Post ID: {id}</span>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
