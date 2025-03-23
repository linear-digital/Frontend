import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SocialLogin from '../Home/Auth/SocialLogin';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from './firebase.init';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import singnUp from "../../../src/lottie/signup.json";
import Lottie from 'react-lottie';

const SignUp = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [show, setShow] = useState(false);

    const formHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;

        if (email && password) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(auth.currentUser, {
                        displayName: name
                    });
                    toast.success(`Registration Successful as ${user.email}`);
                    navigate('/feedback');
                    sendEmailVerification(auth.currentUser);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    console.log(errorCode);
                    toast.error(errorCode);
                });
        } else {
            toast.error("Please fill all the fields");
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
        animationData: singnUp,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className='min-h-screen max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-12 lg:px-8'>
            {/* Left Side - Lottie Animation */}
            <div className="w-full lg:w-1/2 flex justify-center">
                <Lottie options={defaultOptions} className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl w-full" />
            </div>

            {/* Right Side - Form Section */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1 className='text-center text-indigo-500 font-bold text-4xl logo-font'>Hazrat Ali</h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                        Sign up to your account
                    </h2>
                </div>

                <button onClick={() => setShow(!show)} id='button-primary' className='sm:w-full sm:max-w-sm md:max-w-lg w-full mx-auto py-2 text-white text-xl mt-5'>
                    Continue With Social
                </button>

                <div className={`${show ? "flex" : "hidden"} backdrop-blur-sm flex-col justify-center items-center fixed top-0 left-0 w-full h-full animate_animated animate__bounceIn`}>
                    <button onClick={() => setShow(false)} className='top-10 rounded-xl text-black px-3 py-1 left-10 bg-white'>Close</button>
                    <SocialLogin />
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm md:max-w-lg rounded-md px-4 py-7 shadow shadow-indigo-500">
                    <form className="space-y-6" action="#" onSubmit={formHandler}>
                        <div>
                            <label htmlFor="name" className="block text-base font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    placeholder='Your full name'
                                    className="bg-[#26344D] text-white input input-md shadow shadow-indigo-500 w-full"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder='Enter your email'
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
                                    placeholder='Enter your password'
                                    required
                                    className="bg-[#26344D] text-white input input-md shadow shadow-indigo-500 w-full"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white hover:bg-green-500">
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-base text-gray-500">
                        Not a member?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;