import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { auth } from "../../Auth/firebase.init";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Lottie from "react-lottie";
import audio from "../../../../src/lottie/audio.json"

const Audio = () => {
  const [audios, setAudios] = useState([]);
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
  const [expandedComments, setExpandedComments] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});

  const allowedEmails = [
    "hazrataliein@gmail.com",
    "programmer.hazratali@gmail.com",
    "iushazratali@gmail.com",
    "hazratalisoft@gmail.com",
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:8000/audios");
        const data = await res.json();
        setAudios(data?.data || []); // Fallback to an empty array if data?.data is undefined
      } catch (error) {
        console.error("Error fetching audios:", error);
        setAudios([]); // Set to an empty array in case of an error
      }
    })();
  }, [reload]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadAudio = async (event) => {
    event.preventDefault();
    if (!allowedEmails.includes(user?.email)) {
      return toast.error("আপনার অনুমতি নেই অডিও আপলোড করার!");
    }
    if (!selectedFile) {
      return toast.error("Please select an audio file!");
    }

    const formData = new FormData();
    formData.append("audio", selectedFile);
    formData.append("title", title);
    formData.append("userEmail", user?.email);

    const res = await fetch("http://localhost:8000/audios", {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      toast.success("অডিও সফলভাবে আপলোড হয়েছে!");
      setReload(!reload);
      setSelectedFile(null);
      setTitle("");
    }
  };

  const deleteAudio = async (id) => {
    if (!allowedEmails.includes(user?.email)) {
      return toast.error("আপনার অনুমতি নেই অডিও ডিলিট করার!");
    }

    const res = await fetch(`http://localhost:8000/audios/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user?.email }),
    });

    if (res.status === 200) {
      toast.success("অডিও ডিলিট হয়েছে!");
      setReload(!reload);
    }
  };

  const addComment = async (audioId) => {
    if (!commentText) return toast.error("Please enter a comment!");

    const res = await fetch(`http://localhost:8000/audios/${audioId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: commentText,
        userEmail: user?.email,
        userName: user?.displayName // Add userName
      }),
    });

    if (res.status === 201) {
      toast.success("Comment added successfully!");
      setReload(!reload);
      setCommentText("");
      setShowCommentInput(false);
      setExpandedComments((prev) => ({
        ...prev,
        [audioId]: true, // Automatically expand comments when a new one is added
      }));
    }
  };

  const editComment = async (audioId, commentId) => {
    if (!commentText) return toast.error("Please enter a comment!");

    const res = await fetch(`http://localhost:8000/audios/${audioId}/comments/${commentId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: commentText,
        userEmail: user?.email
      }),
    });

    if (res.status === 200) {
      toast.success("Comment updated successfully!");
      setReload(!reload);
      setCommentText("");
      setEditingCommentId(null);
    }
  };

  const deleteComment = async (audioId, commentId) => {
    const res = await fetch(`http://localhost:8000/audios/${audioId}/comments/${commentId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user?.email }),
    });

    if (res.status === 200) {
      toast.success("Comment deleted successfully!");
      setReload(!reload);
    }
  };

  const addReply = async (audioId, commentId) => {
    if (!replyText) return toast.error("Please enter a reply!");

    const res = await fetch(`http://localhost:8000/audios/${audioId}/comments/${commentId}/replies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: replyText,
        userEmail: user?.email,
        userName: user?.displayName // Add userName
      }),
    });

    if (res.status === 201) {
      toast.success("Reply added successfully!");
      setReload(!reload);
      setReplyText("");
      setShowReplyInput({ ...showReplyInput, [commentId]: false });
      setExpandedReplies((prev) => ({
        ...prev,
        [commentId]: true, // Automatically expand replies when a new one is added
      }));
    }
  };

  const editReply = async (audioId, commentId, replyId) => {
    if (!replyText) return toast.error("Please enter a reply!");

    const res = await fetch(`http://localhost:8000/audios/${audioId}/comments/${commentId}/replies/${replyId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: replyText,
        userEmail: user?.email
      }),
    });

    if (res.status === 200) {
      toast.success("Reply updated successfully!");
      setReload(!reload);
      setReplyText("");
      setEditingReplyId(null);
    }
  };

  const deleteReply = async (audioId, commentId, replyId) => {
    const res = await fetch(`http://localhost:8000/audios/${audioId}/comments/${commentId}/replies/${replyId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userEmail: user?.email }),
    });

    if (res.status === 200) {
      toast.success("Reply deleted successfully!");
      setReload(!reload);
    }
  };

  const toggleCommentExpansion = (audioId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [audioId]: !prev[audioId],
    }));
  };

  const toggleReplyExpansion = (commentId) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };
  // audio
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: audio,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="p-6 min-h-screen max-w-7xl mx-auto text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Audio</h2>

      {allowedEmails.includes(user?.email) && (
        <form onSubmit={uploadAudio} className="mb-6 flex flex-col gap-4 items-center">
          <input
            type="text"
            placeholder="Enter Audio Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered p-2 rounded-lg bg-gray-800 text-white w-1/2"
            required
          />
          <input
            type="file"
            accept="audio/*"
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

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-12">
        <div className="justify-end">
          <div className="w-3/4 text-end">
            <Lottie options={defaultOptions} />
          </div>
        </div>
        <div>
          {audios.map((audio) => (
            <div key={audio._id} className="bg-gray-800 p-4">
              <h3 className="text-xl font-semibold mb-2">{audio.title}</h3>
              <audio className="w-full rounded-md" controls>
                <source src={`http://localhost:8000/uploads/${audio.filename}`} type="audio/mpeg" />
              </audio>
              {allowedEmails.includes(user?.email) && (
                <button
                  onClick={() => deleteAudio(audio._id)}
                  className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
                >
                  Delete Audio
                </button>
              )}

              <div className="mt-4">
                <h4 className="text-lg font-semibold">Comments</h4>
                <div className="mt-2">
                  {audio.comments
                    ?.slice(0, expandedComments[audio._id] ? audio.comments.length : 2)
                    .map((comment) => (
                      <div key={comment._id} className="mb-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-300">
                              <strong>{comment.userName}</strong>: {comment.text} {/* Display userName */}
                            </p>
                          </div>
                          {comment.userEmail === user?.email && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  setEditingCommentId(comment._id);
                                  setCommentText(comment.text);
                                }}
                                className="text-blue-500 hover:text-blue-700"
                              >
                                <FaRegEdit />
                              </button>
                              <button
                                onClick={() => deleteComment(audio._id, comment._id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          )}
                        </div>
                        {/* Edit Comment Input Field */}
                        {editingCommentId === comment._id && (
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Edit your comment"
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              className="input input-bordered p-2 rounded-lg bg-gray-700 text-white w-full"
                            />
                            <button
                              onClick={() => editComment(audio._id, comment._id)}
                              className="mt-2 bg-blue-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-blue-700"
                            >
                              Update Comment
                            </button>
                          </div>
                        )}
                        <div className="ml-4 mt-2">
                          {comment.replies
                            ?.slice(0, expandedReplies[comment._id] ? comment.replies.length : 2)
                            .map((reply) => (
                              <div key={reply._id} className="mb-2">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <p className="text-sm text-gray-300">
                                      <strong>{reply.userName}</strong>: {reply.text} {/* Display userName */}
                                    </p>
                                  </div>
                                  {reply.userEmail === user?.email && (
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => {
                                          setEditingReplyId(reply._id);
                                          setReplyText(reply.text);
                                        }}
                                        className="text-blue-500 hover:text-blue-700"
                                      >
                                        <FaRegEdit />
                                      </button>
                                      <button
                                        onClick={() => deleteReply(audio._id, comment._id, reply._id)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <RiDeleteBin6Line />
                                      </button>
                                    </div>
                                  )}
                                </div>
                                {/* Edit Reply Input Field */}
                                {editingReplyId === reply._id && (
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      placeholder="Edit your reply"
                                      value={replyText}
                                      onChange={(e) => setReplyText(e.target.value)}
                                      className="input input-bordered p-2 rounded-lg bg-gray-700 text-white w-full"
                                    />
                                    <button
                                      onClick={() => editReply(audio._id, comment._id, reply._id)}
                                      className="mt-2 bg-green-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-green-700"
                                    >
                                      Update Reply
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          {comment.replies?.length > 2 && (
                            <button
                              onClick={() => toggleReplyExpansion(comment._id)}
                              className="mt-2 bg-gray-700 px-4 py-1 rounded-lg text-white font-semibold hover:bg-gray-500"
                            >
                              {expandedReplies[comment._id] ? "View Less" : "View More"}
                            </button>
                          )}
                        </div>
                        {/* Reply Input Field */}
                        {showReplyInput[comment._id] && (
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Add a reply"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="input input-bordered p-2 rounded-lg bg-gray-700 text-white w-full"
                            />
                            <button
                              onClick={() => addReply(audio._id, comment._id)}
                              className="mt-2 bg-green-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-green-700"
                            >
                              Add Reply
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => setShowReplyInput({ ...showReplyInput, [comment._id]: true })}
                          className="mt-2 bg-green-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-green-700"
                        >
                          Reply
                        </button>
                      </div>
                    ))}
                  {audio.comments?.length > 2 && (
                    <button
                      onClick={() => toggleCommentExpansion(audio._id)}
                      className="mt-2 bg-gray-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-gray-700"
                    >
                      {expandedComments[audio._id] ? "View Less" : "View More"}
                    </button>
                  )}
                </div>
                {/* Add Comment Input Field */}
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
                      {editingCommentId ? (
                        <button
                          onClick={() => editComment(audio._id, editingCommentId)}
                          className="mt-2 bg-blue-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-blue-700"
                        >
                          Update Comment
                        </button>
                      ) : (
                        <button
                          onClick={() => addComment(audio._id)}
                          className="mt-2 bg-blue-500 px-4 py-1 rounded-lg text-white font-semibold hover:bg-blue-700"
                        >
                          Add Comment
                        </button>
                      )}
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
    </div>
  );
};

export default Audio;