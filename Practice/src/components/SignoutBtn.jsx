import React from 'react'
import { useDispatch } from 'react-redux'
import { Signout } from '../Store/UserSlice'
import { useNavigate } from 'react-router-dom'
import authservice from '../Appwrite/Auth'

const SignoutBtn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Logout = () => {
        authservice.Logout()
        dispatch(Signout())
        navigate('/')
    }
    return (
        <>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={Logout}>Logout</button>
        </>
    )
}

export default SignoutBtn