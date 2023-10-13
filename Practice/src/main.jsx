import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import {CreateAccount, EditPost, Post, SignInSide} from './components'
import AddPost from './Pages/AddPost.jsx'
import Home from './Pages/Home.jsx'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/',
      element: <Home />

    },
    {
      path: '/create',
      element: <CreateAccount />
    },
    {
      path: '/signIn',
      element: <SignInSide />
    },
    {
      path: '/add-post',
      element: <AddPost />
    },
    {
      path: '/post/:slug',
      element: <Post />
    }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
