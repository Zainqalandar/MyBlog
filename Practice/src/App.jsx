import { Outlet } from 'react-router-dom'
import './App.css'
import { useEffect} from 'react'
import authservice from './Appwrite/Auth'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import SignInSide from './components/SignIn.jsx'
import { SignIn } from './Store/UserSlice'
import { Footer, Header} from './components'

function App() {
  const status = useSelector(state=> state.auth.status)
  const dispatch = useDispatch()
  useEffect(() => {
    authservice.getCurrentAccount()
      .then((userData) => {
        if (userData) {
          dispatch(SignIn({ userData }))
        }
      })

  }, [])
  

  return (
    <>
      {/* {status ? <Header />: <SignInSide />} */}
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
