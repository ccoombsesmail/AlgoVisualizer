import React from 'react'
import classes from './Tutorial.module.css'
import { FaHandPointDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Tutorial = ({ closeModal }) => {

  return (
        <>
        <h1>Graph Algo Instructions</h1>
        <p>Dijkstra's Algorithm finds the shortest path between two nodes in a directed graph</p>
        <p>Step 1: select a source node by clicking on a node as shown below</p>
        < FaHandPointDown size={30} />
        <img alt='' src={require('../../assets/TutorialStep1.png')} className={classes.tutorialImg} />
        </>

  )
}



export default Tutorial