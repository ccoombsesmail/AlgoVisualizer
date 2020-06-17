import React from 'react';
import classes from './Modal.module.css'
import NoPath from './NoPath';
import Tutorial from '../Tutorial/Tutorial'

const Modal = ({ closeModal, type }) => {
  let component = null
  switch (type) {
    case 'NoPath':
      component = <NoPath closeModal={closeModal} />
      break
    case 'Tutorial':
      component = <Tutorial closeModal={closeModal} />
      break
    default:
      break
  }

  return (
    <div className={classes.modalBg} onClick={closeModal}>
      <div className={classes.modalChild} onClick={e => e.stopPropagation()}>
        {component}
      </div>
    </div>

  )
}



export default Modal