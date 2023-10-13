import React, { useEffect, useState } from 'react';
import services from '../Appwrite/Database';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

const Home = () => {
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
                                            Amelia. Anderson
                                        </h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Lead Developer</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    ) : <><h1 className=' text-center my-3 font-bold'>Login to Read Post</h1></>;
};

export default Home;
