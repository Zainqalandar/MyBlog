import React from 'react'
import { EditPost, Container } from '../components'

const AddPost = () => {
    return (
        <div className=' py-8 dark:bg-gray-900 dark:text-black'>
            <Container>
                <EditPost />
            </Container>
        </div>
    )
}

export default AddPost