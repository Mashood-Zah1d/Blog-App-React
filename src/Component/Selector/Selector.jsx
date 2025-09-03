import React from 'react'

function Selector({
    label,
    options,
    className,
    ...props
},ref) {
  return (
    <div>
        {label && <label>{label}</label>}
    <select
    {...props}
    className={className}
    ref={ref}
    >
     {options.map((option)=>(
        <option key={option} value={option}>{option}</option>
     ))}

    </select>
    </div>
  )
}

export default React.forwardRef(Selector)