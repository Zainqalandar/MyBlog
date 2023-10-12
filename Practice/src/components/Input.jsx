import React, { forwardRef, useId } from 'react'

const Input = ({
  lable,
  className,
  type = 'text',
  ...props
}, ref) => {
  const id = useId()
  return (
    <>
      <div>
        {lable && <label htmlFor={id}>{lable}: </label>}
        <input
          ref={ref}
          {...props}
          className={` border ${className} `}
          type={type} id={id}
        />
      </div>
    </>
  )
}

export default forwardRef(Input)