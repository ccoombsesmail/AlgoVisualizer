Algo Viz
======

Algo Viz is an interactive algorithm visualization app. Algo Viz allows users to visualize popular sorting algorithms as well as shortest path alogorithms on graphs. Currently supported algorithms are Insertion Sort, Bubble Sort, Quick Sort, Merge Sort, and Dijkstra's Algorithm. 

Live site: https://mystifying-benz-ae46a4.netlify.app


### Technologies
This project was built using React, Javascript, D3.js, and HTML5/CSS3

### Animating 
The algorithm animations were implemented using a common stategy. 
- First run the algorithm and save the operations in an array preserving the order. 
- Then iterate through the animations array and use requestAnimationFrame and DOM manipulation to highlight the animations. 

Below is an example of calculating and saving the operations associated with Dijkstra's algorithm:

```javascript
// Nodes stored in an adjecency list.
// s => source node, t => target node
// Edge numbers used for bookeeping and to conform to the way graphs were created
 export function dijkstras(adj, weight, s, t, animations, edgeNumbers) {
  let visited = new Set()                                                  
  let dist = Array(adj.length).fill(Infinity)
  let pq = new PriorityQueue()
  let prev = Array(adj.length).fill(0)

  dist[s] = 0
  pq.addNode([s, 0])

  while (pq.heap.length > 1) {
    let currNode = pq.extractMin()[0]
    if (visited.has(currNode)) {
        continue
    }
    animations.push([prev[currNode], currNode, edgeNumbers[currNode], true])
    visited.add(currNode)
    if (currNode === t){
        return [dist[currNode], prev]
    }
    for (let i = 0; i < adj[currNode].length; i++) {
        let node = adj[currNode][i]
        if (dist[node] > dist[currNode] + weight[currNode][i]){
            animations.push([currNode, node, edgeNumbers[currNode][i], false])
            prev[node] = currNode
            dist[node] = dist[currNode] + weight[currNode][i]
            pq.addNode([node, dist[node]])
        }
    }
  }
  return -1
 }
```

The animations are then iterated over. For sorting algorithms, comparisons and swaps are highlghted. For shortest path graph algorithms, best estimate and shortest distance to nodes are colored differently, and backtracking is used to highlight the resulting shortest path.


![alt text](https://i.ibb.co/kGNQJ6v/graph-Animation.png "Dijkstra's Algorithm in Action ")



### Future Work

Appart from adding more path finding algorithms, one area which still could be improved is the generation of graphs. Creating graphs randomly while still being viable graphs for visualization was challenging. Generating graphs with less overlapping edges and more variety is left for a later date.






