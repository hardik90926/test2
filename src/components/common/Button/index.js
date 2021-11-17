import React from 'react'

const Button = ({ children, className, isLoading, ...rest }) => {
  return (
    <button
      className={`btn btn-primary ${className}`}
      type="button"
      {...rest}
    >
      {isLoading ? "..." : children}
    </button>
  )
}

export default Button;
