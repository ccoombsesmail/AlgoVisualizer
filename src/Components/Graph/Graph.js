import React, { Component } from 'react';
import * as d3 from 'd3';
import {animate_dijkstras} from "./AnimateGraphAlgos.js"
import { generateRandomGraph, generateRandomStaticGraph, renderDynamicGraph, renderStaticGraph} from "../Util/util.js"
import "./graphs.css";
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
            staticGraph: null

            }

        // generateRandomGraph = generateRandomGraph.bind(this)
        this.calcShortestPath = this.calcShortestPath.bind(this)
    
    }


    // calcNodeLocations(nodes, v, originX, originY, edgeLength ){

    //     if (nodes[v].fx < originX && nodes[v].fy < originY ) {
    //         nodes.push({ fx: nodes[v].fx - edgeLength * Math.sin(Math.random() * Math.PI), fy: nodes[v].fy - edgeLength * Math.sin(Math.random() * Math.PI) })
    //     } else if (nodes[v].fx < originX && nodes[v].fy > originY) {
    //         nodes.push({ fx: nodes[v].fx - edgeLength * Math.sin(Math.random() * Math.PI), fy: nodes[v].fy + edgeLength * Math.sin(Math.random() * Math.PI) })
    //     }else if (nodes[v].fx > originX && nodes[v].fy < originY) {
    //         nodes.push({ fx: nodes[v].fx + edgeLength * Math.sin(Math.random() * Math.PI), fy: nodes[v].fy - edgeLength * Math.sin(Math.random() * Math.PI) })
    //     }else {
    //         nodes.push({ fx: nodes[v].fx + edgeLength * Math.sin(Math.random() * Math.PI), fy: nodes[v].fy + edgeLength * Math.sin(Math.random() * Math.PI) })
    //     }

    // }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextState.sourceNodeIdx)
        // console.log(nextState.targetNodeIdx)
        if (nextState.sourceNodeIdx !== null || nextState.targetNodeIdx !== null ) {
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
        animate_dijkstras(this.state.adj, this.state.weights, this.state.sourceNodeIdx, this.state.targetNodeIdx, this.state.edgeNumbers)

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


    render() {


        return (
            <div id= "my_dataviz" >
                <button className="graphButtons" onClick={this.makeDynamicGraph.bind(this)}>Random Graph</button>
                <button className="graphButtons" onClick={this.makeStaticGraph.bind(this)}>Generate Static Graph</button>
                <button className="graphButtons" onClick = {this.calcShortestPath}>Find Shortest Path</button>
               
            </div>

           
        )
    }

}



export default Graph;

    


