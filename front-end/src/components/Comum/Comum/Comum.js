import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";

const Comum = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/login');
  }, [])

  return (
    <>
    Loading
    </>
  )
}

export default Comum;
