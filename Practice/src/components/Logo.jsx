import React from 'react'

const Logo = ({
    className,
}) => {
    return (
        <div className={`${className}`}>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs-sV4e9E2Z2D26JxMXvWtVhvqZ6oIoB5_Xw&usqp=CAU"
                className="h-8 mr-3"
                alt="Flowbite Logo"
            />
        </div>
    )
}

export default Logo