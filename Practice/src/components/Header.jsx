import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Logo, SignoutBtn } from './index';

const Header = () => {
    const isAuthor = useSelector(state => state.auth.status);
    const [menuOpen, setMenuOpen] = useState(false);

    const Nav = [
        {
            slug: '/',
            name: 'Home',
        },
        {
            slug: '/null',
            name: 'About',
        },
        {
            slug: '/add-post',
            name: 'Add',
        },
        {
            slug: '/profile',
            name: 'Profile',
        },
    ];

    const HandleDark = () => {
        const check = document.getElementsByTagName('html')[0];
        check.classList.toggle('light');
        check.classList.toggle('dark');
    };


    return (
        <>
            <nav
                className={`bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 md:block`}
            >


                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <Logo />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Blogs
                        </span>
                    </Link>
                    <div className="flex md:order-2">
                        {isAuthor ? (
                            <SignoutBtn />
                        ) : (
                            <Link
                                type="button"
                                to="/create"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Create Account
                            </Link>
                        )}
                        <h1 onClick={() => HandleDark()} className=' cursor-pointer mx-2'>
                            <button
                                title="Toggle Theme"
                                class="w-12 h-6 rounded-full p-1 bg-gray-400 dark:bg-gray-600 relative transition-colors duration-500 ease-infocus:outline-none focus:ring-2 focus:ring-blue-700 dark:focus:ring-blue-600 focus:border-transparent">
                                <div id="toggle"
                                    class="rounded-full w-4 h-4 bg-blue-600 dark:bg-blue-500 relative ml-0 dark:ml-6 pointer-events-none transition-all duration-300 ease-out">
                                </div>
                            </button>
                        </h1>
                        <button
                            data-collapse-toggle="navbar-sticky"
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-sticky"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div
                        className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? 'block' : 'hidden'
                            } md:block`}
                        id="navbar-sticky"
                    >
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {Nav.map((value) => (
                                <li key={value.name}>
                                    <NavLink
                                        to={value.slug}
                                        className={({ isActive }) =>
                                            `${isActive
                                                ? 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                                                : 'block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`
                                        }
                                    >
                                        {value.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
