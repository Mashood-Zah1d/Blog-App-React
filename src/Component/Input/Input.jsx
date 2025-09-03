import React from 'react'

function Input({
    label,
    type="text",
    className,
    ...props
},ref) {
  return (
      <>
      <div>
        {label && 
        <label className=' my-4 color-black'>{label}</label>
        }
        <input
        type={type} 
        ref ={ref}
        className={className}
        {...props}
        />
      </div>
      </>
  )
}

export default React.forwardRef (Input)