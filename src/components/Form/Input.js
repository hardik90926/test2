import * as React from 'react'

export const Input = React.forwardRef(({
  label,
  error,
  ...restProps
}, ref) => {
  // const handleChange = (event) => {
  //   if (restProps.type === 'number') {
  //     restProps.onChange(+event.target.value);
  //   } else {
  //     restProps.onChange(event.target.value);
  //   }
  // }
  return (
    <div className='form-group'>
      {
        label &&
        <label className="col-form-Label pt-0">{label}</label>
      }
      <input ref={ref} className={`form-control ${!!error && 'is-invalid'}`} {...restProps} />
      {error && <small className="text-danger"> {error} </small>}
    </div>
  )
})
