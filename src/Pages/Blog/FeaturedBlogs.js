import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FeaturedBlogs = () => {
    return (
        <div className="max-w-7xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-white mb-6">Featured Blogs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Large Featured Blog */}
                <motion.div className="md:col-span-2">
                    <div className="relative rounded-lg overflow-hidden group">
                        <Link to="https://hazrat-ali.hashnode.dev/nextjs-backend-development-using-api-routes-for-dynamic-features">
                            <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1741244431119/31d27460-b679-4e2c-95b3-6e4b4d409061.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" alt="blog"
                                className="w-full h-96 object-cover transition duration-300 ease-in-out group-hover:opacity-60" />
                            <div
                                className="absolute inset-0 bg-indigo-900 bg-opacity-50 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                                <h3 className="text-white text-2xl font-semibold text-center px-4">Next.js Backend Development Using API Routes for Dynamic Features
                                </h3>
                            </div>
                        </Link>
                    </div>
                </motion.div>

                {/* Small Featured Blogs */}
                <div className="flex flex-col gap-2">
                    <motion.div>
                        <div className="relative rounded-lg overflow-hidden group">
                            <Link to="https://hazrat-ali.hashnode.dev/a-software-engineer-must-know-the-core-concept">
                                <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1740204237027/fe08aa0b-d17d-4188-ad07-890d2073a9bf.jpeg?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" alt="blog"
                                    className="w-full h-48 object-cover transition duration-300 ease-in-out group-hover:opacity-60" />
                                <div
                                    className="absolute inset-0 bg-indigo-900 bg-opacity-50 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                                    <h3 className="text-white text-xl font-semibold text-center px-4">A software engineer must know the core concept
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div>
                        <div className="relative rounded-lg overflow-hidden group">
                            <Link to="https://hazrat-ali.hashnode.dev/object-oriented-programming-oop-in-dart">
                                <img src="https://cdn.hashnode.com/res/hashnode/image/upload/v1740835266473/ba3b722c-4ed0-45f9-9708-d9a69324be48.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress,format&format=webp" alt="blog"
                                    className="w-full h-48 object-cover transition duration-300 ease-in-out group-hover:opacity-60" />
                                <div
                                    className="absolute inset-0 bg-indigo-900 bg-opacity-50 flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                                    <h3 className="text-white text-xl font-semibold text-center px-4">Object-Oriented Programming (OOP) in Dart
                                    </h3>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedBlogs;