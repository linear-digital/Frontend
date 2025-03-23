import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const BlogForm = ({ onBlogPosted }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const blogToEdit = location.state?.blog; // Get the blog data passed from AllBlog

    const [formData, setFormData] = useState({
        title: blogToEdit?.title || "",
        img: blogToEdit?.img || "",
        link: blogToEdit?.link || "",
        category: blogToEdit?.category || "",
        email: blogToEdit?.email || "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, img, link, category, email } = formData;

        const newBlog = { title, img, link, category, email };

        try {
            let response;
            if (blogToEdit) {
                // Update existing blog
                response = await fetch(`http://localhost:8000/api/blogs/${blogToEdit.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newBlog),
                });
            } else {
                // Create new blog
                response = await fetch('http://localhost:8000/api/blogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newBlog),
                });
            }

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: blogToEdit ? 'Blog Updated!' : 'Blog Posted!',
                    text: blogToEdit ? 'Your blog has been updated successfully.' : 'Your blog has been posted successfully.',
                });
                onBlogPosted(data); // Pass the updated list of blogs to the parent component
                navigate("/blogs"); // Navigate back to the blog list
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Failed to post/update blog.',
                });
            }
        } catch (error) {
            console.error("Error posting/updating blog:", error);
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: 'Blog successfully post.',
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <section id="blog-form" className="container px-6 mx-auto pb-20">
            <motion.h2
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 1.5, delay: 0.5, type: "spring" } },
                }}
                className="mb-12 py-6 text-5xl text-center tracking-tight font-extrabold text-dark dark:text-white sm:leading-none"
            >
                {blogToEdit ? "Edit" : "Post a"} <span className="text-indigo-600 dark:text-indigo-500">Blog</span>
            </motion.h2>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                {/* Form fields */}
                <div className="mb-4">
                    <label className="block text-sm font-medium ">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Image URL</label>
                    <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Blog Link</label>
                    <input
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium ">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    >
                        <option value="">Select a category</option>
                        <option value="Technology">Technology</option>
                        <option value="Programming">Programming</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Software QA/Testing">Software QA/Testing</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="AI">AI</option>
                        <option value="Git and Github">Git and Github</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {blogToEdit ? "Update Blog" : "Post Blog"}
                </button>
            </form>
        </section>
    );
};

export default BlogForm;