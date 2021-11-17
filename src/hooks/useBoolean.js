import * as React from 'react';

const useBoolean = (value) => {
  const [boolean, setBoolean] = React.useState(value);
  const setTrue = React.useCallback(() => setBoolean(true),[]);
  const setFalse = React.useCallback(() => setBoolean(false),[]);
  const setToggle = React.useCallback(() => setBoolean((old) => !old), []);
  return [boolean, setTrue, setFalse,setToggle];
};
export default useBoolean;
