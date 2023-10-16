import React, { useEffect, useState } from 'react';
import services from '../Appwrite/Database';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const Home = () => {
    const user = useSelector(state => state.auth.userData)
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        services.getPosts().then((data) => {
            setPosts(data.documents);
        });
    }, []);

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + '...'; // Truncate the text if it's longer than maxLength
        }
        return text;
    };

    if (user) {
        return posts ? (
            <>
                <section className="bg-white dark:bg-gray-900">
                    <div className="container px-6 py-10 mx-auto">
                        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                            From the blog
                        </h1>
                        {posts.map((post, index) => (
                            <div key={index} className="mt-8 lg:-mx-6 lg:flex lg:items-center">
                                <img
                                    className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
                                    src={services.getFilePreview(post.featureImage)}
                                    alt=""
                                />
                                <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">
                                    <p className="text-sm text-blue-500 uppercase">category</p>
                                    <a
                                        href="#"
                                        className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white"
                                    >
                                        {post.title}
                                    </a>
                                    <div className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
                                        {parse(truncateText(post.content, 300))} {/* Display only the first 300 characters */}
                                    </div>
                                    <Link
                                        to={`/post/${post.$id}`}
                                        className="inline-block mt-2 text-blue-500 underline hover:text-blue-400"
                                    >
                                        Read more
                                    </Link>
                                    <div className="flex items-center mt-6">
                                        <img
                                            className="object-cover object-center w-10 h-10 rounded-full"

                                            src={
                                                'https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
                                            }
                                            alt=""
                                        />
                                        <div className="mx-4">
                                            <h1 className="text-sm text-gray-700 dark:text-gray-200">
                                                {post.name}
                                            </h1>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Lead Developer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )).reverse()}
                    </div>
                </section>
            </>
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
        );
    }
    else return <><h1 className=' text-center text-2xl py-16 bg-blue-500'>Please Sign In to see Post
        <Link to='/signIn'> <i className=' cursor-pointer border-black text-red-600 border-b-2'>Sign In</i></Link></h1></>
};

export default Home;
