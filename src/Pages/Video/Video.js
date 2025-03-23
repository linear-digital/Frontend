import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { auth } from "../Auth/firebase.init";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Lottie from "react-lottie";
import video from "../../../src/lottie/video.json";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [reload, setReload] = useState(false);
  const [user] = useAuthState(auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState({});
  const [showAllComments, setShowAllComments] = useState({});
  const [showEditInput, setShowEditInput] = useState({}); 

  const allowedEmails = [
    "hazrataliein@gmail.com",
    "programmer.hazratali@gmail.com",
    "iushazratali@gmail.com",
    "hazratalisoft@gmail.com",
  ];

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:8000/videos");
      const data = await res.json();
      setVideos(data?.data);
    })();
  }, [reload]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadVideo = async (event) => {
    event.preventDefault();
    if (!allowedEmails.includes(user?.email)) {
      return toast.error("You do not have permission to upload videos!");
    }
    if (!selectedFile) {
      return toast.error("Please select a video file!");
    }

    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("title", title);
    formData.append("userEmail", user?.email);

    const res = await fetch("http://localhost:8000/videos", {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      toast.success("Video uploaded successfully.!");
      setReload(!reload);
      setSelectedFile(null);
      setTitle("");
    }
  };

  const deleteVideo = async (id) => {
    if (!allowedEmails.includes(user?.email)) {
      return toast.error("You do not have permission to delete the video.!");
    }

    const res = await fetch(`http://localhost:8000/videos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user?.email }),
    });

    if (res.status === 200) {
      toast.success("Video deleted.!");
      setReload(!reload);
    }
  };

  const addComment = async (videoId) => {
    if (!commentText) return toast.error("Please enter a comment!");

    const res = await fetch(`http://localhost:8000/videos/${videoId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: commentText,
        userEmail: user?.email,
        userName: user?.displayName,
      }),
    });

    if (res.status === 201) {
      toast.success("Comment added successfully!");
      setReload(!reload);
      setCommentText("");
      setShowCommentInput(false);
    }
  };

  const editComment = async (videoId, commentId) => {
    if (!commentText) return toast.error("Please enter a comment!");

    const res = await fetch(`http://localhost:8000/videos/${videoId}/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: commentText,
        userEmail: user?.email,
      }),
    });

    if (res.status === 200) {
      toast.success("Comment updated successfully!");
      setReload(!reload);
      setCommentText("");
      setEditingCommentId(null);
      setShowEditInput({ ...showEditInput, [commentId]: false }); // Hide edit input after update
    }
  };

  const deleteComment = async (videoId, commentId) => {
    const res = await fetch(`http://localhost:8000/videos/${videoId}/comments/${commentId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user?.email }),
    });

    if (res.status === 200) {
      toast.success("Comment deleted successfully!");
      setReload(!reload);
    }
  };

  const addReply = async (videoId, commentId) => {
    if (!replyText) return toast.error("Please enter a reply!");

    const res = await fetch(`http://localhost:8000/videos/${videoId}/comments/${commentId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: replyText,
        userEmail: user?.email,
        userName: user?.displayName,
      }),
    });

    if (res.status === 201) {
      toast.success("Reply added successfully!");
      setReload(!reload);
      setReplyText("");
      setShowReplyInput({ ...showReplyInput, [commentId]: false });
    }
  };

  const editReply = async (videoId, commentId, replyId) => {
    if (!replyText) return toast.error("Please enter a reply!");

    const res = await fetch(`http://localhost:8000/videos/${videoId}/comments/${commentId}/replies/${replyId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: replyText,
        userEmail: user?.email,
      }),
    });

    if (res.status === 200) {
      toast.success("Reply updated successfully!");
      setReload(!reload);
      setReplyText("");
      setEditingReplyId(null);
      setShowEditInput({ ...showEditInput, [replyId]: false }); // Hide edit input after update
    }
  };

  const deleteReply = async (videoId, commentId, replyId) => {
    const res = await fetch(`http://localhost:8000/videos/${videoId}/comments/${commentId}/replies/${replyId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user?.email }),
    });

    if (res.status === 200) {
      toast.success("Reply deleted successfully!");
      setReload(!reload);
    }
  };

  const toggleShowAllComments = (videoId) => {
    setShowAllComments((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: video,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto pt-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Video</h2>

      {allowedEmails.includes(user?.email) && (
        <form onSubmit={uploadVideo} className="mb-6 flex flex-col gap-4 items-center">
          <input
            type="text"
            placeholder="Enter Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered p-2 rounded-lg bg-gray-800 text-white w-1/2"
            required
          />
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="input input-bordered p-2 rounded-lg bg-gray-800 text-white"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-700"
          >
            Upload
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12 justify-center">
        <div className="justify-center">
          <div className="w-4/4">
            <Lottie options={defaultOptions} />
          </div>
        </div>
        {videos.map((video) => (
          <div key={video._id} className="bg-gray-800 p-4">
            <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
            <video className="w-full rounded-md" controls>
              <source src={`http://localhost:8000/uploads/${video.filename}`} type="video/mp4" />
            </video>
            {allowedEmails.includes(user?.email) && (
              <button
                onClick={() => deleteVideo(video._id)}
                className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Delete Video
              </button>
            )}

            <div className="mt-4">
              <h4 className="text-lg font-semibold">Comments</h4>
              <div className="mt-2">
                {video.comments
                  ?.slice(0, showAllComments[video._id] ? video.comments.length : 2) 
                  .map((comment) => (
                    <div key={comment._id} className="mb-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-300">
                            <strong>{comment.userName}</strong>: {comment.text}
                          </p>
                        </div>
                        {comment.userEmail === user?.email && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingCommentId(comment._id);
                                setCommentText(comment.text);
                                setShowEditInput({ ...showEditInput, [comment._id]: true }); // Show edit input
                              }}
                              className="text-blue-500 hover:text-blue-700"
                            >
                              <FaRegEdit />
                            </button>
                            <button
                              onClick={() => deleteComment(video._id, comment._id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <RiDeleteBin6Line />
                            </button>
                          </div>
                        )}
                      </div>
                      {showEditInput[comment._id] && ( // Show edit input if editing
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Edit comment"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="input input-bordered p-2 rounded-lg bg-gray-700 text-white w-full"
                          />
                          <button
                            onClick={() => editComment(video._id, comment._id)}
                            className="mt-2 bg-green-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-green-700"
                          >
                            Update Comment
                          </button>
                        </div>
                      )}
                      <div className="ml-4 mt-2">
                        {comment.replies?.map((reply) => (
                          <div key={reply._id} className="mb-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-300">
                                  <strong>{reply.userName}</strong>: {reply.text}
                                </p>
                              </div>
                              {reply.userEmail === user?.email && (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingReplyId(reply._id);
                                      setReplyText(reply.text);
                                      setShowEditInput({ ...showEditInput, [reply._id]: true }); // Show edit input
                                    }}
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    <FaRegEdit />
                                  </button>
                                  <button
                                    onClick={() => deleteReply(video._id, comment._id, reply._id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <RiDeleteBin6Line />
                                  </button>
                                </div>
                              )}
                            </div>
                            {showEditInput[reply._id] && ( // Show edit input if editing
                              <div className="mt-2">
                                <input
                                  type="text"
                                  placeholder="Edit reply"
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  className="input input-bordered p-2 rounded-lg bg-gray-700 text-white w-full"
                                />
                                <button
                                  onClick={() => editReply(video._id, comment._id, reply._id)}
                                  className="mt-2 bg-green-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-green-700"
                                >
                                  Update Reply
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                        <div className="mt-2">
                          {showReplyInput[comment._id] ? (
                            <>
                              <input
                                type="text"
                                placeholder="Add a reply"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="input input-bordered p-2 rounded-lg bg-gray-700 text-white w-full"
                              />
                              <button
                                onClick={() => addReply(video._id, comment._id)}
                                className="mt-2 bg-green-500 px-4 py-1 rounded-lg  text-white font-semibold "
                              >
                                Reply
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setShowReplyInput({ ...showReplyInput, [comment._id]: true })}
                              className="mt-2 bg-green-500 px-4 py-1 rounded-lg text-white text-sm font-semibold"
                            >
                              Reply
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                {video.comments?.length > 2 && (
                  <button
                    onClick={() => toggleShowAllComments(video._id)}
                    className="mt-2 bg-gray-700 px-4 py-1 rounded-lg text-white font-semibold hover:bg-gray-500"
                  >
                    {showAllComments[video._id] ? "Show Less" : "View More"}
                  </button>
                )}
              </div>
              <div className="mt-4">
                {showCommentInput ? (
                  <>
                    <input
                      type="text"
                      placeholder="Add a comment"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="input input-bordered p-2 rounded-lg bg-gray-700 text-white w-full"
                    />
                    <button
                      onClick={() => addComment(video._id)}
                      className="mt-2 bg-blue-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-blue-700"
                    >
                      Add Comment
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setShowCommentInput(true)}
                    className="mt-2 bg-blue-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-blue-700"
                  >
                    Comment
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;