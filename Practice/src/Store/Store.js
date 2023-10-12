import {configureStore} from '@reduxjs/toolkit'
import UserSlice from './UserSlice'

const store =configureStore({
    reducer: {
        auth: UserSlice
    }
})

export default store