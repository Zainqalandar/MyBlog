import React, { useEffect, useCallback, useState } from 'react'
import { Input, RTE } from './index'
import { useForm } from 'react-hook-form'
import services from '../Appwrite/Database'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const EditPost = ({ post, slug }) => {
    console.log(post)
    console.log(slug)
    const { register, handleSubmit, control, getValues, setValue, watch, } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.$id || ""
        }
    })
    const [successfully, setsuccessfully] = useState(false)
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)
    const Submit = async (data) => {
        if (post) {
            console.log(post)
          const dbPost = await services.updatePost(post.$id,{...data})
          if(dbPost) navigate(`/post/${dbPost.$id}`)
        }
        else {
            setsuccessfully(true)
            const file = await services.uploadFile(data.image[0])
            if (file) {
                const fileId = file.$id
                data.featureImage = fileId
                const DB = await services.createPost({ ...data, userId: userData.$id, name: userData.name })
                if (DB) {
                    navigate(`/post/${DB.$id}`)
                }
            }
        }
    }
    //Difficut Code
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);
    return (
        <div className=' border-2 border-black'>
            <form onSubmit={handleSubmit(Submit)} className=''>
                <div className=' flex justify-between p-4 '>

                    <div>
                        <Input
                            {...register("title", { required: true })}
                            lable="Title: "
                            type='text'
                            placeholder="Enter Title...."
                            className=" rounded-lg p-2 w-96 my-3"
                        />
                        <Input
                            {...register("slug", { required: true })}
                            lable="Slug: "
                            type='text'
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                            }}
                            className=" rounded-lg p-2 w-96 my-3"
                        />
                    </div>
                    {successfully && <div>
                        <div
                            id="dismiss-alert"
                            className="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-teal-50 border border-teal-200 rounded-md p-4"
                            role="alert"
                        >
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-4 w-4 text-teal-400 mt-0.5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={16}
                                        height={16}
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <div className="text-sm text-teal-800 font-medium">
                                        File has been successfully uploaded.
                                    </div>
                                </div>
                                <div className="pl-3 ml-auto">
                                    <div className="-mx-1.5 -my-1.5">
                                        <button
                                            type="button"
                                            className="inline-flex bg-teal-50 rounded-md p-1.5 text-teal-500 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-50 focus:ring-teal-600"
                                            data-hs-remove-element="#dismiss-alert"
                                        >
                                            <span className="sr-only">Dismiss</span>
                                            <svg
                                                className="h-3 w-3"
                                                width={16}
                                                height={16}
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    <div>
                        <Input
                            {...register("image", { required: true })}
                            lable='Upload Image'
                            type='file'
                            className='rounded-lg p-2 w-96 my-3'
                        />
                        <button className='rounded-lg p-2 w-96 my-3 bg-blue-800'>Submite</button>
                    </div>
                </div>
            </form>
            <RTE control={control} lable="Content" name='content' defaultValue={getValues("content")} />

        </div>
    )
}

export default EditPost