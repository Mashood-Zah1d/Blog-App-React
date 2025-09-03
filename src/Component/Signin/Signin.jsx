import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import authentication from '../../Appwrite/Auth';
import { Input } from '../Index';
import service from '../../Appwrite/Config';
import { Posts } from '../../Store/PostSlice';
import { login as authLogin } from '../../Store/AuthSlice';

function Signin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authentication.login({ ...data })
            if (session) {
                const CurrentUserData = await authentication.getUser();
                if (CurrentUserData){
                    console.log(CurrentUserData);
                    dispatch(authLogin(CurrentUserData))
                    const posts = await service.getallPost();
                    if (posts) {
                        dispatch(Posts(posts.documents))
                        navigate("/")
                    }
                }
                
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="max-h-full max-w-md mx-auto my-20 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h1>

            <form onSubmit={handleSubmit(login)}>

                <Input
                    label="Email: "
                    type="email"
                    placeholder="Enter Your Email"
                    className="w-full border my-4 border-gray-300 rounded-lg px-4 py-2  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Enter Your Valid Email Address"
                        }
                    })}
                />


                <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter Your Password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    {...register("password", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(value) || "Enter Your Valid Email Address"
                        }
                    })}
                />

                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                <button type='Submit' className="w-full bg-indigo-600 text-white py-2 rounded-lg mt-6 hover:bg-indigo-700 transition duration-200"> Log In </button>

                <Link to="/sign-up">
                <p className='text-center my-3 text-red-500'>Dont Have Account?</p>
                </Link>
                
            
                
            </form>
        </div >
    )
}

export default Signin