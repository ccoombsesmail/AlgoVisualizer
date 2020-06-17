import React from 'react';
import classes from './Modal.module.css'
import { FaExclamationCircle } from 'react-icons/fa';

const NoPath = ({ closeModal }) => {
  return (
    <>
      <span className={classes.exclamation}>< FaExclamationCircle size={30} /></span>
      <h1> No Path Between Selected Nodes</h1>
      <span className={classes.exit} onClick={closeModal}>X</span>
    </>
 

  )
}



export default NoPath