import * as d3 from 'd3';


export function generateRandomGraph(){
    let nodes = [];
    let edges = [];
    let edgeNumbers = {}
    let adj = [];
    let weights = []
    let count = 0;
    let size = Math.floor(Math.random() * 160) + 17
    for (let i = 0; i < size; i++) {
        nodes.push({ id: i, group: 1 })
        adj.push([])
        weights.push([])
        edgeNumbers[i] = []
        for (let j = i; j < i + 3; j++) {
            let target = j + 1 + Math.floor(Math.random() * 5 + -2)
            if (j%5 === 0) {
                target = target + 7
            }
            if (target < size && target !== i) {
                let dist = Math.random() * 200
                adj[i].push(target)
                weights[i].push(dist)
                edges.push({ source: i, target: target, distance: dist })
                edgeNumbers[i].push(count)
                count++
            }
        }

    }

    // console.log(adj)
    // console.log(edgeNumbers)

    // for (let i = 0; i < 140; i++) {
    //     nodes.push({ fx: i * 12.5, fy: 10 })
    // }
    // for (let i = 0; i < 140; i++) {
    //     nodes.push({ fx: i * 12.5, fy: 1400 })
    // }
    // for (let i = 0; i < 140; i++) {
    //     nodes.push({ fx: 10, fy: i*10 })
    // }
    // for (let i = 0; i < 140; i++) {
    //     nodes.push({ fx: 1800, fy: i * 10  })
    // }


    this.setState({
        adj: adj,
        weights: weights,
        nodes: nodes,
        edges: edges,
        target: adj.length - 1,
        edgeNumbers: edgeNumbers,
        graph: true,
        staticGraph: null
    })
}



// export function generateRandomStaticGraph() {


//     let edgeNumbers = {}
//     let adj = [];
//     let weights = []


//     let size = 7
//     let levels = [4];
//     let edgeStarts = [1]
//     for (let i = 0; i < size - 1; i++) {
//         let nodesInlevel = levels[levels.length - 1]
//         edgeStarts.push(edgeStarts[edgeStarts.length - 1] + nodesInlevel)
//         levels.push(nodesInlevel * 2)
//     }

//     console.log(levels)
//     // [5, 10, 20, 40, 80]
//     let edgeLength = 40;
//     let originX = window.innerWidth / 2
//     let originY = window.innerHeight / 1.2
//     let nodes = [];
//     let edges = []
//     nodes.push({ fx: originX, fy: originY })
//     for (let i = 0; i < levels.length; i++) {
//         for (let j = 0; j < levels[i]; j++) {
//             let saltedAngle = j
//             // Math.random() * (-2)
//             let saltedLength = edgeLength + (Math.random() * (-50) + 60 )
//             // let saltedLength = edgeLength 
//             nodes.push({ id: i + 1, fx: originX + (i + 1) * saltedLength * Math.cos(saltedAngle * 2 * Math.PI / levels[i]), fy: originY + (i + 1) * saltedLength * Math.sin(saltedAngle * 2 * Math.PI / levels[i]), distance: saltedLength })
//         }

//     }


//     // console.log(nodes)
//     edges.push({ source: 0, target: 1 })
//     edges.push({ source: 0, target: 2 })
//     edges.push({ source: 0, target: 3 })
//     edges.push({ source: 0, target: 4 })
//     edges.push({ source: 0, target: 5 })

//     adj.push([1, 2, 3, 4, 5])
//     weights.push([nodes[1].distance, nodes[2].distance, nodes[3].distance, nodes[4].distance, nodes[5].distance])
//     edgeNumbers[0] = [0, 1, 2, 3, 4]

//     let totalEdgeCount = levels[levels.length - 1] + edgeStarts[edgeStarts.length - 1]
//     console.log(totalEdgeCount)
//     console.log(edgeStarts)
//     let edgeCount = 5
//     let count = 6
//     for (let i = 0; i < edgeStarts.length; i++) {
//         for (let j = edgeStarts[i]; j < edgeStarts[i] + levels[i]; j++) {
//             let [t1, t2, t3] = [count, count + 1, count - Math.floor(Math.random() * 3)]
//             if (Math.max(t1, t2, t3) < totalEdgeCount) {
//                 console.log()
//                 adj.push([t1, t2, t3])
//                 weights.push([nodes[t1].distance, nodes[t2].distance, nodes[t3].distance])
//                 edgeNumbers[j] = [edgeCount, edgeCount + 1, edgeCount + 2]
//                 edges.push({ source: j, target: t1 })
//                 edges.push({ source: j, target: t2 })
//                 edges.push({ source: j, target: t3 })
//                 count += 2
//                 edgeCount += 3
//             }else {
//             adj.push([])
//             }
//         }
//     }




//     this.setState({
//         adj: adj,
//         weights: weights,
//         nodes: nodes,
//         edges: edges,
//         target: adj.length - 1,
//         edgeNumbers: edgeNumbers,
//         graph: null,
//         staticGraph: true
//     })
// }




export function renderDynamicGraph() {

    let oldSVG = document.getElementById('my_dataviz').querySelector("svg")
    // console.log(oldSVG)
    if (oldSVG != null) {
        oldSVG.parentNode.removeChild(oldSVG)
    }
    var width = window.innerWidth-100,
        height = 1500,
        radius = 7;

    const forceX = d3.forceX(width / 2).strength(0.165)
    const forceY = d3.forceY(height / 2).strength(0.165)

    var svg = d3.select('#my_dataviz').append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append("svg:defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 17)
        .attr("markerHeight", 15)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) { return d.id; }))
        .force("link", d3.forceLink().distance(linkDistance).strength(0.3))
        .force("charge", d3.forceManyBody().strength(-400))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force('x', forceX)
        .force('y', forceY);

    function linkDistance(d) {
        return d.distance;
    }

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(this.state.edges)
        .enter().append("line")
        .attr("marker-end", "url(#end)")
        .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(this.state.nodes)
        .enter().append("g")
        .on("click", node_click.bind(this))


    var circles = node.append("circle")
        .attr("r", 7)
        .attr("fill", "black")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    simulation.nodes(this.state.nodes).on("tick", ticked);
    simulation.force("link").links(this.state.edges);


    function ticked() {
        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            // .attr("transform", function (d) { 
            //     return "translate(" + Math.max(radius, Math.min(width - radius, d.x)) + "," + Math.max(radius, Math.min(height - radius, d.y)) + ")";})
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

                
            
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }



}


export function renderStaticGraph() {


    let oldSVG = document.getElementById('my_dataviz').querySelector("svg")
    // console.log(oldSVG)
    if (oldSVG != null) {
        oldSVG.parentNode.removeChild(oldSVG)
    }
    var width = window.innerWidth,
        height = 1500,
        radius = 5;

    var svg = d3.select('#my_dataviz').append('svg')
        .attr('width', width)
        .attr('height', height);

    svg.append("svg:defs").selectAll("marker")
        .data(["end"])      // Different link/path types can be defined here
        .enter().append("svg:marker")    // This section adds in the arrows
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    var simulation = d3.forceSimulation()
        .force("link", d3.forceLink().id(function (d) { return d.id; }))
        .force("link", d3.forceLink().distance(linkDistance).strength(0.1))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("center", d3.forceCenter(width / 2, height / 2));

    function linkDistance(d) {
        return d.distance;
    }

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(this.state.edges)
        .enter().append("line")
        .attr("marker-end", "url(#end)")
        .attr("stroke-width", function (d) { return Math.sqrt(d.value); });

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(this.state.nodes)
        .enter().append("g")
        .on("click", node_click.bind(this))


    var circles = node.append("circle")
        .attr("r", 7)
        .attr("fill", "black")
        .attr("class", "node")
       

    simulation.nodes(this.state.nodes).on("tick", ticked);
    simulation.force("link").links(this.state.edges);


    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
      
    }





}



function node_click(d) {
    // console.log(d.index)
    console.log(this.state.adj)
    if (this.state.targetNodeIdx === null && this.state.sourceNodeIdx === null) {
        d3.select(d3.selectAll("circle")._groups[0][d.index]).style("fill", "purple")
        this.setState({ sourceNodeIdx: d.index })
    } else if (this.state.targetNodeIdx === null && d3.selectAll("circle")._groups[0][d.index].style.fill === "purple") {
        d3.select(d3.selectAll("circle")._groups[0][d.index]).style("fill", "black")
        this.setState({ sourceNodeIdx: null })
    } else if (this.state.sourceNodeIdx !== null && this.state.targetNodeIdx === null) {
        d3.select(d3.selectAll("circle")._groups[0][d.index]).style("fill", "red")
        this.setState({ targetNodeIdx: d.index })
    } else if (this.state.sourceNodeIdx !== null && d3.selectAll("circle")._groups[0][d.index].style.fill === "red") {
        d3.select(d3.selectAll("circle")._groups[0][d.index]).style("fill", "black")
        this.setState({ targetNodeIdx: null })
    } else if (this.state.sourceNodeIdx !== null && this.state.targetNodeIdx !== null && d3.selectAll("circle")._groups[0][d.index].style.fill !== "red" && d3.selectAll("circle")._groups[0][d.index].style.fill !== "purple") {
        d3.select(d3.selectAll("circle")._groups[0][this.state.targetNodeIdx]).style("fill", "black")
        d3.select(d3.selectAll("circle")._groups[0][d.index]).style("fill", "red")
        this.setState({ targetNodeIdx: d.index })

        // else if (this.state.sourceNodeIdx !== null && this.state.targetNodeIdx !== null && d3.selectAll("circle")._groups[0][d.index].style.fill === "purple") {
        // this.setState({ sourceNodeIdx: null, targetNodeIdx: null })
        //  d3.select(d3.selectAll("circle")._groups[0][d.index]).style("fill", "black")
    }
    // this.setState( {prevNode : d.index})
    // console.log(d)

}




export function generateRandomStaticGraph() {


    let edgeNumbers = {}
    let adj = [];
    let weights = []


    let size = 7
    let levels = [5];
    let edgeStarts = [1]
    for (let i = 0; i < size - 1; i++) {
        let nodesInlevel = levels[levels.length - 1]
        edgeStarts.push(edgeStarts[edgeStarts.length - 1] + nodesInlevel)
        levels.push(nodesInlevel * 2)
    }
    // levels[levels.length-1] = levels[levels.length-1]/2
    console.log(levels)
    // edgeStarts[edgeStarts.length - 1] = edgeStarts[edgeStarts.length-1]/2
    // console.log(levels)
    // console.log(edgeStarts)
    // [5, 10, 20, 40, 80]
    let edgeLength = 60;
    let originX = window.innerWidth / 2
    let originY = window.innerHeight / 1.2
    let nodes = [];
    let edges = []
    nodes.push({ fx: originX, fy: originY })
    for (let i = 0; i < levels.length-1; i++) {
        for (let j = 0; j < levels[i]; j++) {
            let saltedAngle = j + Math.random() 
            let saltedLength = edgeLength + Math.random() * 10 
            let radius = (i+1) * saltedLength
            if (i === levels.length-2){
                radius = j % 2 === 0 ? radius * 1.1 : radius * 1.4
                // radius = 2*i * saltedLength
              
            }
            if (i === levels.length - 1) {
                radius = 3 * i * saltedLength
            }
            // Math.random() * (-2)
            // + (Math.random() * (-50) + 60 )
            // let saltedLength = edgeLength 
            if (i !== levels.length - 1) {
            nodes.push({ id: i + 1, fx: originX + radius* Math.cos(saltedAngle * 2 * Math.PI / levels[i]), fy: originY + radius * Math.sin(saltedAngle * 2 * Math.PI / levels[i]), distance: saltedLength })
            }
        }

    }


    // console.log(nodes)
    edges.push({ source: 0, target: 1 })
    edges.push({ source: 0, target: 2 })
    edges.push({ source: 0, target: 3 })
    edges.push({ source: 0, target: 4 })
    edges.push({ source: 0, target: 5 })

    adj.push([1, 2, 3, 4, 5])
    weights.push([nodes[1].distance, nodes[2].distance, nodes[3].distance, nodes[4].distance, nodes[5].distance])
    edgeNumbers[0] = [0, 1, 2, 3, 4]

    let totalEdgeCount = levels[levels.length - 2] + edgeStarts[edgeStarts.length - 2]
    // console.log(totalEdgeCount)
    // console.log(edgeStarts)
    let edgeCount = 5
    let count = 6
    for (let i = 0; i < edgeStarts.length-1; i++) {
    
                // [t1, t2] = [count-15, count]
                // console.log(t1,t2, "here")
        for (let j = edgeStarts[i]; j < edgeStarts[i] + levels[i]; j++) {
            let [t1, t2, t3] = [count, count+1 , count -  Math.floor(Math.random() * 3)]
          
            if (Math.max(t1, t2, t3) < totalEdgeCount) {
                // console.log(j, t1,t2,t3)
                adj.push([t1, t2, t3])
                weights.push([nodes[t1].distance, nodes[t2].distance, nodes[t3].distance])
                edgeNumbers[j] = [edgeCount, edgeCount + 1, edgeCount + 2]
                edges.push({ source: j, target: t1 })
                edges.push({ source: j, target: t2 })
                edges.push({ source: j, target: t3 })
                count += 2
                edgeCount += 3
            }else {
            adj.push([])
            }
        }
    }




    this.setState({
        adj: adj,
        weights: weights,
        nodes: nodes,
        edges: edges,
        target: adj.length - 1,
        edgeNumbers: edgeNumbers,
        graph: null,
        staticGraph: true
    })
}
