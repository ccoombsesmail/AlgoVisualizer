import React, { Component } from 'react';
import {animate_dijkstras} from "./AnimateGraphAlgos.js"
import { generateRandomGraph, generateRandomStaticGraph, renderDynamicGraph, renderStaticGraph} from "../Util/util.js"
import "./graphs.css";
import SliderBar from '../SliderBar'
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
            speed: 20
            }
      this.makeDynamicGraph = this.makeDynamicGraph.bind(this)
      this.makeStaticGraph = this.makeStaticGraph.bind(this)
      this.calcShortestPath = this.calcShortestPath.bind(this)
    
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


    makeDynamicGraph() {
        this.setState({sourceNodeIdx: null, targetNodeIdx: null}, generateRandomGraph.bind(this))
    }
    makeStaticGraph() {
        this.setState({sourceNodeIdx: null, targetNodeIdx: null}, generateRandomStaticGraph.bind(this))
    }

    calcShortestPath() {
        animate_dijkstras(this.state.adj, this.state.weights, this.state.sourceNodeIdx, this.state.targetNodeIdx, this.state.edgeNumbers, this.state.speed)

        // let path = []
        // let animations = []
        // // console.log(this.state.sourceNodeIdx, this.state.targetNodeIdx)
        // // console.log(this.state.adj)
        // // let stuff = dijkstras(this.state.adj, this.state.weights, this.state.source, this.state.target, animations)
        // let stuff = dijkstras(this.state.adj, this.state.weights, this.state.sourceNodeIdx , this.state.targetNodeIdx, animations, this.state.edgeNumbers)
        // if (stuff === -1) {
        //     console.log("No Path")
        // }else {
        //     let dist = stuff[0]
        //     let prev = stuff[1]
        //     calcPath(this.state.sourceNodeIdx , this.state.targetNodeIdx , prev, path)
        //     animate_dijkstras(animations, this.colorPath.bind(this), path)
        //     // this.colorPath(path)
        //     // // this.generateRandomGraph()
        // }

    }

  changeSpeed(value) {
    this.setState({speed: value})
  }


    render() {


        return (
          <div className="graphWrapper">
            <div className="graphControlsWrapper">

           
            <ul className="legend">
              <li>
                <div style={{ backgroundColor: 'purple' }} class="circle" />
                <span> - Source Node</span>
              </li>
              <li>
                <div style={{ backgroundColor: 'red' }} class="circle" />
                <span> - Destination Node</span>
              </li>
              <li>
                <div style={{ backgroundColor: 'green' }} class="circle" />
                <span> - Finished Calculating Shortest Distance to Source</span>
              </li>
              <li>
                <div style={{ backgroundColor: 'orange' }} class="circle" />
                <span> - Current Best Shortest Distance Estimate to Source</span>
              </li>
            </ul>
            <div className="graphBtnsWrapper">
              <button className="graphButtons" onClick={this.makeDynamicGraph}>Random Graph</button>
              <button className="graphButtons" onClick={this.makeStaticGraph}>Generate Static Graph</button>
              <button className="graphButtons" onClick={this.calcShortestPath}>Find Shortest Path</button>
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

    


