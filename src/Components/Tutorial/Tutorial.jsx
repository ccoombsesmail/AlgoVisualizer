import React, { useState } from 'react';
import classes from './Tutorial.module.css'
import { FaHandPointDown, FaArrowLeft, FaArrowRight} from 'react-icons/fa';

const Tutorial = ({ closeModal }) => {
  const [page, setPage] = useState(1)
  let contents = null

  switch (page) {
    case 1:
      contents = <>
        <h1>Graph Algo Instructions</h1>
        <p>Dijkstra's Algorithm finds the shortest path between nodes in a directed graph</p>
        <p>Step 1: Select a source node by clicking on a node as shown below</p>
        < FaHandPointDown size={30} />
        <img alt='' src={require('../../assets/TutorialStep1.png')} className={classes.tutorialImg} />
      </>
      break
    case 2:
      contents = <>
        <h1>Select Target Node</h1>
        <p>Step 2: Select a target node by clicking on a node as shown below</p>
        <p>Unselect by clicking on the node again</p>
        < FaHandPointDown size={30} />
        <img alt='' src={require('../../assets/TutorialStep2.png')} className={classes.tutorialImg} />
      </>
      break
    case 3:
      contents = <>
        <h1>Find Shotest Path</h1>
        <p>Step 3: Click the Find Shortest Path button</p>
        <p>Not Every Source/Target node pair has a path!</p>
        < FaHandPointDown size={30} />
        <img alt='' src={require('../../assets/TutorialStep3.png')} className={classes.tutorialImg} />
      </>
      break
    default:
      break
  }

  function pageLeft() {
    if (page === 1) {
      return
    }
    setPage(page - 1)
  }

  function pageRight() {
    if (page === 3) {
      return
    }
    setPage(page + 1)
  }


  return (
    // <div className={classes.modalBg} onClick={closeModal}>
    //   <div className={classes.modalChild} onClick={e => e.stopPropagation()}>
      <>
         {contents}
        <span className={classes.left} onClick={pageLeft}>< FaArrowLeft size={30} /></span>
        <span className={classes.right} onClick={pageRight}>< FaArrowRight size={30} /></span>
        <span className={classes.exit} onClick={closeModal}>X</span>
      </>
    //   </div>
    // </div>

  )
}



export default Tutorial