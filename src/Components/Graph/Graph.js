import React, { Component } from 'react';
import {animate_dijkstras} from "./AnimateGraphAlgos.js"
import { generateRandomGraph, generateRandomStaticGraph, renderDynamicGraph, renderStaticGraph} from "../Util/util.js"
import "./graphs.css";
import SliderBar from '../SliderBar'
import Modal from '../Modal/Modal'
// import Force from 'd3-force';


class Graph extends Component {
  constructor(props) {
      super(props);
      this.state = {
        adj: [[1, 2], [2, 3, 4], [1, 4, 3], [], [3]],
        weights: [[4, 2], [2, 2, 3], [1, 4, 4], [], [1]] ,
        nodes: [],
        edges: [],
        source: 0,
        target: 3,
        edgeNumbers: {},
        sourceNodeIdx: null,
        targetNodeIdx: null,
        graph: null,
        staticGraph: null,
        speed: 80,
        showTutorial: true,
        noPathMessage: false,
        }
    this.makeDynamicGraph = this.makeDynamicGraph.bind(this)
    this.makeStaticGraph = this.makeStaticGraph.bind(this)
    this.calcShortestPath = this.calcShortestPath.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.openNoPathModal = this.openNoPathModal.bind(this)

    this.randomRef = React.createRef()
    this.staticRef = React.createRef()
    this.shortestRef = React.createRef()
  
  }


  componentDidMount() {
    this.makeDynamicGraph()
    
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.sourceNodeIdx !== null || nextState.targetNodeIdx !== null || nextState.speed !== this.state.speed ) {
        return false;
    }
    return true;
  }
  

  componentDidUpdate() {
    if (this.state.graph !== null) {
        renderDynamicGraph.call(this, null)
    }else if (this.state.staticGraph !== null){
          renderStaticGraph.call(this, null)
    }
  }

  closeModal() {
    this.setState({ showTutorial: false, noPathMessage: false  })
  }

  openNoPathModal() {
    this.setState({ noPathMessage: true, sourceNodeIdx: null, targetNodeIdx: null })
  }


  makeDynamicGraph() {
    // document.getElementsByClassName('App')[0].scrollBy(0, 200)
      this.setState({sourceNodeIdx: null, targetNodeIdx: null}, generateRandomGraph.bind(this))
   

  }
  makeStaticGraph() {
      this.setState({sourceNodeIdx: null, targetNodeIdx: null}, generateRandomStaticGraph.bind(this))
  }

  calcShortestPath() {
      animate_dijkstras(this.state.adj, this.state.weights, this.state.sourceNodeIdx, 
        this.state.targetNodeIdx, this.state.edgeNumbers, this.state.speed, this.openNoPathModal, this.randomRef, this.staticRef, this.shortestRef)
  }

  changeSpeed(value) {
    this.setState({speed: value})
  }


    render() {
        return (
          <div className="graphWrapper">
         
            {
              this.state.showTutorial ? <Modal type='Tutorial' closeModal={this.closeModal}/> : null
            }
            {
              this.state.noPathMessage ? <Modal type='NoPath' closeModal={this.closeModal} /> : null
            }
            <div className="graphControlsWrapper">
            <ul className="legend">
              <li>
                <div style={{ backgroundColor: 'purple' }} className="circle" />
                <span> - Source Node</span>
              </li>
              <li>
                <div style={{ backgroundColor: 'red' }} className="circle" />
                <span> - Destination Node</span>
              </li>
              <li>
                <div style={{ backgroundColor: 'green' }} className="circle" />
                <span> - Finished Calculating Shortest Distance to Source</span>
              </li>
              <li>
                <div style={{ backgroundColor: 'orange' }} className="circle" />
                <span> - Current Best Shortest Distance Estimate to Source</span>
              </li>
            </ul>
            <div className="graphBtnsWrapper">
              <button ref={this.randomRef} className="graphButtons" onClick={this.makeDynamicGraph}>Random Graph</button>
              <button ref={this.staticRef} className="graphButtons" onClick={this.makeStaticGraph}>Generate Static Graph</button>
              <button ref={this.shortestRef} className="graphButtons" onClick={this.calcShortestPath}>Find Shortest Path</button>
            </div>
              <SliderBar step={1} max={100} size={false} speedHandle={this.changeSpeed.bind(this)} /> 

            </div>
            <div id= "my_dataviz" >
               
            </div>
          </div>
           
        )
    }

}



export default Graph;

    


