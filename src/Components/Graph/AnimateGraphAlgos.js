import * as d3 from 'd3';
import { dijkstras } from "./GraphAlgos" 





export function animate_dijkstras(adj, weights, s, t, edgeNumbers, speed, openNoPathModal, randomRef, staticRef, shortestRef) {

    let animations = []
    let path = []
    let stuff = dijkstras(adj, weights, s, t, animations, edgeNumbers)

    if (stuff === -1) {
      openNoPathModal()
    } else {
      // let dist = stuff[0]
      let prev = stuff[1]
      calcPath(s, t, prev, path)
      run_dijkstra_animations(animations, path, adj, edgeNumbers, s, t, speed, randomRef, staticRef, shortestRef)
      // this.colorPath(path)
      // // this.generateRandomGraph()
    }



}
function run_dijkstra_animations(animations, path, adj, edgeNumbers, s, t, speed, randomRef, staticRef, shortestRef) {
  randomRef.current.setAttribute("disabled", "disabled");
  staticRef.current.setAttribute("disabled", "disabled");
  shortestRef.current.setAttribute("disabled", "disabled");
  document.getElementsByClassName("slider")[0].style['display'] = 'none';
    let i = 1
    const animate = () => {
        let node = d3.select(d3.selectAll("circle")._groups[0][animations[i][1]])
        let line = d3.select(d3.selectAll("line")._groups[0][animations[i][2]])
        if (animations[i][3] === true) {
            node.style("fill", "green")

        } else {
            node.style("fill", "orange")
            line.style("stroke", "orange")
        }

        let k = i
        setTimeout(() => {
            d3.select(d3.selectAll("line")._groups[0][animations[k][2]]).style("stroke", "black")
        }, 100 + 5*(100/speed))


        i += 1
        if (i < animations.length - 1) {
            setTimeout(() => {
              window.requestAnimationFrame(animate);
            }, 1000/speed)
        } else {
           d3.selectAll("line")._groups[0].forEach((line) => {
             d3.select(line).style("opacity", .3)
           })
          d3.selectAll("circle")._groups[0].forEach((circle) => {
            d3.select(circle).style("opacity", .3)
          })
          d3.select(d3.selectAll("circle")._groups[0][s]).style("opacity", 1)
           setTimeout(()=> colorPath(path, adj, edgeNumbers, s, t), 0)
          randomRef.current.removeAttribute("disabled")
          staticRef.current.removeAttribute("disabled")
          shortestRef.current.removeAttribute("disabled")
          document.getElementsByClassName("slider")[0].style['display'] = 'flex';
        }

    }

    window.requestAnimationFrame(animate);

}


function calcPath(s, t, prev, path) {
    let end = t
    while (end !== s) {
        path.unshift([prev[end], end])
        end = prev[end]
    }


}

function getEdgeNumbers(path, adj, edgeNumbers) {
    let edgeNums = []
    for (let i = 0; i < path.length; i++) {
        let source = path[i][0]
        let target = path[i][1]
        let num = adj[source].indexOf(target)
        edgeNums.push(edgeNumbers[source][num])
    }
    return edgeNums
}



function colorPath(path, adj, edgeNums, s, t) {
    let edgeNumbers = getEdgeNumbers(path, adj, edgeNums)
    for (let i = 0; i < path.length; i++) {
      let circle = d3.select(d3.selectAll("circle")._groups[0][path[i][1]])
      circle.style("fill", "purple")
      circle.style("opacity", 1)
      let line = d3.select(d3.selectAll("line")._groups[0][edgeNumbers[i]])
      // line.attr("class", null)
      // line.attr("class", "links-path")
      line.classed("links", false)
      line.classed("links-path", true)
      line.style("stroke", "purple")
      line.style("opacity", 1)
      // line.attr("stroke", "green")

    }
    d3.select(d3.selectAll("circle")._groups[0][s]).style("fill", "purple")
    d3.select(d3.selectAll("circle")._groups[0][t]).style("fill", "red")


}



