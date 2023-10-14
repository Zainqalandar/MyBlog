import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { EditPost } from './index'
import services from '../Appwrite/Database'

const UpdatePost = () => {
    const [post, setPost] = useState(null)
    let { slug } = useParams()
    useEffect(() => {
        services.getPost(slug).then((post) => {
            setPost(post)
        })

    }, [])

    return (
        <>
            {post && <EditPost slug={slug} post={post}  />}
        </>
    )
}

export default UpdatePost