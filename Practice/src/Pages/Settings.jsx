import React, { useEffect, useState } from 'react'
import services from '../Appwrite/Database'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

function Settings() {
    const [MyPosts, setMyPosts] = useState([])
    const user = useSelector(state => state.auth.userData)
    useEffect(() => {
        services.getPosts().then((posts) => {
            if (posts) {
                setMyPosts(posts.documents)

            }
        })
    }, [])
    
    const filteredPosts = MyPosts.filter((value) => {
        return value.userId === user.$id;
    });

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + ''; // Truncate the text if it's longer than maxLength
        }
        return text;
    };
    return (filteredPosts.length > 0) ? (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                        From the blog
                    </h1>
                    <p className="max-w-lg mx-auto mt-4 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure veritatis
                        sint autem nesciunt, laudantium quia tempore delect
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-2">
                    {filteredPosts.map((posts, index) => (<div key={index}
                        className=' relative'
                    >
                        <Link to={`/update/${posts.$id}`}>
                            <div className="flex justify-center border-t-2 dark:border-white border-black py-2">
                                <button className="flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </Link>

                        <img
                            className="relative z-10 object-cover w-full rounded-md h-96"
                            src={services.getFilePreview(posts.featureImage)}
                            alt=""
                        />
                        <div className="relative z-20 max-w-lg p-6 mx-auto -mt-20 bg-white rounded-md shadow dark:bg-gray-900">
                            <a
                                href="#"
                                className="font-semibold text-gray-800 hover:underline dark:text-white md:text-xl"
                            >
                                {posts.title}
                            </a>
                            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                {parse(truncateText(posts.content, 200))}
                            </p>
                            <p className="mt-3 text-sm text-blue-500 mb-2">{truncateText(posts.$createdAt, 10)}</p>
                            <div onClick={() => {
                                services.deletePost(posts.$id).then((status) => {
                                    if (status) services.deleteFile(posts.featureImage)
                                })
                            }}>
                                <Button variant="outlined" startIcon={<DeleteIcon />}>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>))}

                </div>
            </div>
        </section>

    ) : (
        <div className="min-h-[15rem] flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
                <div className="flex justify-center">
                    <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings