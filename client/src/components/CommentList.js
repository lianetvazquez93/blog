import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ postId }) => {
  const [commnets, setComments] = useState([]);

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(response.data);
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const renderedComments = commnets.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
