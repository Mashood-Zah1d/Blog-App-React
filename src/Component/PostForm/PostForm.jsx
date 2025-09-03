import React, { useEffect, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form'
import service from '../../Appwrite/Config';
import { useNavigate } from 'react-router-dom';
import { addPost, editPost } from '../../Store/PostSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../Index';
import Selector from '../Selector/Selector'
import Rte from '../Rte/Rte'
function PostForm({ post }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const userData = useSelector((state) => state.auth.userData);
    const { register, handleSubmit, watch, getValues, setValue, control } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });

    const Submit = async (data) => {
        try {
            setError("")
            if (post) {
                const file =  data.image[0] ? await service.uploadPhoto(data.image[0]) : null;
 

                const dbpost = await service.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined, userId: userData.$id })

                if (dbpost) {
                    dispatch(editPost({ slug: data.slug, updatedData: dbpost }))
                    navigate(`/post/${dbpost.$id}`)
                }
            }

            else {
                const file = await service.uploadPhoto(data.image[0]);
                if (file) {
                    const dbpost = await service.createPost({ ...data, featuredImage: file ? file.$id : undefined, userId: userData.$id })

                    if (dbpost) {
                        console.log(dbpost);

                        dispatch(addPost(dbpost))
                        navigate(`/post/${dbpost.$id}`)
                    }
                }
            }

        } catch (error) {
            console.log(error.message);
            
            setError(error.message);
        }

    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);
    useEffect(() => {
        const subcription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true })
            }
        });

        return () => subcription.unsubscribe();

    }, [watch, , slugTransform, setValue])
    return (
        <>
            
            <form
                onSubmit={handleSubmit(Submit)}
                className="max-w-5xl  mx-auto bg-white shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                <div className="md:col-span-2 space-y-5">
                    <p className='text-red-500 text-center  '>{error}</p>
                    <Input
                        label="Title"
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter Your Title"
                        {...register("title", { required: true })}
                    />

                    <Input
                        label="Slug"
                        type="text"
                        placeholder="slug"
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        {...register("slug", { validate: true })}
                        onInput={(e) =>
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                        }
                    />

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Content</label>
                        <Rte
                            label="Content"
                            control={control}
                            name="content"
                            defaultValue={getValues("content")}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <Input
                            label="Image"
                            type="file"
                            className="w-full p-2 border mt-5 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                    </div>

                    {post && (
                        <div className="w-full mb-4">
                            <img
                                src={service.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    )}
                    <div>
                        <Selector
                            label="Status"
                            options={["active", "inactive"]}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            {...register("status", { required: true })}
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 text-white font-semibold rounded-lg shadow-md transition duration-300 ${post ? "bg-green-500 hover:bg-green-600" : "bg-indigo-500 hover:bg-indigo-600"
                            }`}
                    >
                        {post ? "Update" : "Submit"}
                    </button>
                </div>
            </form>
        </>

    )
}

export default PostForm