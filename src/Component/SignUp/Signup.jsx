import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../Index';
import authentication from '../../Appwrite/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Store/AuthSlice';

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const Create = async (data) => {
        setError("");
        try {
            const userData = await authentication.Signup({ ...data });
            if (userData) {
                const session = await authentication.login({ ...data });
                if (session) {
                    const currentUser = await authentication.getUser();
                    if (currentUser) {
                        dispatch(login(currentUser));
                    }
                }
                navigate("/");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="max-w-md mx-auto my-25 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign-Up Form</h1>
            <form onSubmit={handleSubmit(Create)}>
                <Input
                    label="Name: "
                    placeholder="Enter Your Name"
                    className="w-full border my-4 border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    {...register("name", { required: "Name is required" })}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                <Input
                    label="Email: "
                    placeholder="Enter Your Email"
                    className="w-full border my-4 border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    {...register("email", {
                        required: "Email is required",
                        validate: {
                            matchPattern: (value) =>
                                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Enter a valid email address",
                        },
                    })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                <Input
                    label="Password: "
                    placeholder="Enter Your Password"
                    type="password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    {...register("password", {
                        required: "Password is required",
                        validate: {
                            matchPattern: (value) =>
                                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value) ||
                                "Password must be at least 8 characters, include uppercase, lowercase, and a number",
                        },
                    })}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-6 hover:bg-indigo-700 transition duration-200"
                >
                    Create Account
                </button>

                <Link to="/login">
                    <p className='text-center my-3 text-blue-500'>Already Have an Account?</p>
                </Link>
            </form>
        </div>
    );
}

export default Signup;
