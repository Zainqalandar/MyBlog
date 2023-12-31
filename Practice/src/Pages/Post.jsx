import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { Container } from '../components/index'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'
import services from '../Appwrite/Database'


const Post = () => {
  const [Post, setpost] = useState(null)
  const userData = useSelector(state => state.auth.userData)
  const { slug } = useParams();
  const navigate = useNavigate()

  const isAuther = Post && userData ? Post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((post) => {
        if (post) setpost(post)
        else navigate('/')
      })
    } else {
      navigate('/')
    }

  }, [slug, navigate])

  const handleDelete = () => {
    services.deletePost(Post.$id).then((status) => {
      if (status) {
        services.deleteFile(Post.featureImage);
        navigate('/')

      }
    })
  }

  return Post ? (
    <div className="py-8 bg-white dark:bg-gray-900 ">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={services.getFilePreview(Post.featureImage)}
            alt="kjjnk"
            className="rounded-xl w-full h-[500px]"
          />

          {isAuther && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${Post.$id}`}>
                <button bgColor="" className="mr-3 bg-green-500">
                  Edit
                </button>
              </Link>
              <button onClick={handleDelete} className="bg-red-500" >
                Delete
              </button>
            </div>
          )}
        </div>
        <div className='  dark:bg-gray-600 rounded-lg p-2'>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{Post.title}</h1>
          </div>
          <div className="browser-css">
            {parse(Post.content)}
          </div>
        </div>
      </Container>
    </div>
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

export default Post