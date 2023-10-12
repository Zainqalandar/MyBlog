import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import {CreateAccount, SignInSide} from './components'

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/create',
      element: <CreateAccount />
    },
    {
      path: '/signIn',
      element: <SignInSide />
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
