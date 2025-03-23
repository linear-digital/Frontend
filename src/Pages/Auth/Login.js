import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../Home/Auth/SocialLogin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.init';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import Lottie from 'react-lottie';
import signIn from "../../../src/lottie/login.json";

const Login = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [show, setShow] = useState(false);

    const formHandler = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    toast.success(`Login Successful as ${user.email}`);
                    navigate('/');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    toast.error(errorCode);
                });
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: signIn,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className='min-h-screen max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:px-8'>
            {/* Left Side - Lottie Animation */}
            <div className="w-full lg:w-1/2 p-6 lg:p-12 flex justify-center">
                <Lottie options={defaultOptions} className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-full" />
            </div>

            {/* Right Side - Sign-in Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-0">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className='text-center text-indigo-500 font-bold text-4xl logo-font'>Hazrat Ali</h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign in to your account
                    </h2>
                </div>

                {/* Social Login Button */}
                <button
                    onClick={() => setShow(!show)}
                    id='button-primary'
                    className='sm:w-full sm:max-w-sm md:max-w-lg w-full mx-auto py-2 text-white text-xl mt-5'
                >
                    Continue With Social
                </button>

                {/* Social Login Modal */}
                
                <div className={`${show ? "flex" : "hidden"} backdrop-blur-sm flex-col justify-center items-center fixed top-0 left-0 w-full h-full animate_animated animate__bounceIn`}>
                    <button onClick={() => setShow(false)} className='top-10 rounded-xl text-black px-3 py-1 left-10 bg-white'>Close</button>
                    <SocialLogin />
                </div>

                {/* Form Section */}
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg rounded-md px-4 py-7 shadow shadow-indigo-500">
                    <form className="space-y-6" action="#" onSubmit={formHandler}>
                        <div>
                            <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    required
                                    autoComplete="off"
                                    className="bg-[#26344D] text-white input input-md shadow shadow-indigo-500 w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter Your Password"
                                    className="bg-[#26344D] text-white input input-md shadow shadow-indigo-500 w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white hover:bg-green-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-base text-gray-500">
                        Not a member?{' '}
                        <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Signup
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;