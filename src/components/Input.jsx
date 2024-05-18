import React from 'react'

const Input = ({label, name, id, value,  onChange, error}) => {
  return (
<div className= "input-container">
        <label htmlFor={id}>{label}</label>
        <input
          name={name}
          id={id}
          value={value}
          onChange={onChange}
        />
        <p className='error'>{error}</p>
      </div>
  )
}

export default Input