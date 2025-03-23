import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Auth/firebase.init";
import Swal from "sweetalert2";
import FeaturedBlogs from "./FeaturedBlogs";

const categories = [
    "Technology", "Programming", "Web Development", "Software QA/Testing", "Machine Learning", "Git and Github"
];

const allowedEmails = [
    "hazrataliein@gmail.com",
    "programmer.hazratali@gmail.com",
    "iushazratali@gmail.com",
    "hazratalisoft@gmail.com",
];

const AllBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 9;
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/blogs')
            .then(response => response.json())
            .then(data => {
                setBlogs(data);
                setFilteredBlogs(data);
            })
            .catch(error => console.error("Error fetching blogs:", error));
    }, []);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
        if (category === "All") {
            setFilteredBlogs(blogs);
        } else {
            setFilteredBlogs(blogs.filter(blog => blog.category === category));
        }
    };

    const handleUpdate = (blog) => {
        if (!user || !allowedEmails.includes(user.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'You are not authorized to update this blog.',
            });
            return;
        }
        navigate("/blog-post", { state: { blog } });
    };

    const handleDelete = async (id) => {
        if (!user || !allowedEmails.includes(user.email)) {
            Swal.fire({
                icon: 'error',
                title: 'Unauthorized',
                text: 'You are not authorized to delete this blog.',
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:8000/api/blogs/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email: user.email }), // Send the user's email for authorization
                    });

                    if (response.ok) {
                        setBlogs(blogs.filter(blog => blog.id !== id));
                        setFilteredBlogs(filteredBlogs.filter(blog => blog.id !== id));
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: 'Your blog has been deleted.',
                        });
                    } else {
                        const errorData = await response.json();
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: errorData.message || 'Failed to delete the blog.',
                        });
                    }
                } catch (error) {
                    console.error("Error deleting blog:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An error occurred while deleting the blog.',
                    });
                }
            }
        });
    };

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="max-w-7xl mx-auto py-10 text-white">
            <FeaturedBlogs />
            {user && allowedEmails.includes(user.email) && (
                <div className="text-center mb-6">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500">
                        <Link to="/blog-post">Blog Post</Link>
                    </button>
                </div>
            )}

            <div className="flex justify-center mb-6 space-x-4 flex-wrap">
                {categories.map((category) => (
                    <button 
                        key={category} 
                        onClick={() => handleCategoryClick(category)}
                        className={`px-4 py-2 rounded-lg ${activeCategory === category ? 'bg-indigo-600' : 'bg-gray-800'} hover:bg-indigo-500`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <motion.h2 className="text-4xl text-center font-bold mb-10">
                All <span className="text-indigo-500">Blogs</span>
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentBlogs.map((blog) => (
                    <div key={blog.id} className="relative rounded-lg overflow-hidden group">
                        <Link to={`${blog.link}`}>
                            <img
                                src={blog.img}
                                alt="blog"
                                className="w-full h-72 object-cover transition duration-300 ease-in-out group-hover:opacity-60"
                            />
                            <div className="absolute inset-0 bg-indigo-900 bg-opacity-50 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                                <h3 className="text-white text-2xl font-semibold text-center px-4">{blog.title}</h3>
                            </div>
                        </Link>

                        {user && allowedEmails.includes(user.email) && (
                            <div className="absolute top-2 right-2 flex space-x-2">
                                <button
                                    onClick={() => handleUpdate(blog)}
                                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(blog.id)}
                                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-2">
                {[...Array(Math.ceil(filteredBlogs.length / blogsPerPage)).keys()].map((number) => (
                    <button
                        key={number}
                        onClick={() => paginate(number + 1)}
                        className={`px-3 py-2 rounded-md ${currentPage === number + 1 ? 'bg-indigo-600' : 'bg-gray-800'} hover:bg-indigo-500`}
                    >
                        {number + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default AllBlog;