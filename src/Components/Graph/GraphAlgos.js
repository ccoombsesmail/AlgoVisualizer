class PriorityQueue {
    constructor() {
        this.heap = [null]
    }

    addNode(node){
        this.heap.push(node)
        this.heapify()
    }


    heapify(){
        let idx = this.heap.length-1
        let node = this.heap[idx]
        while (idx > 1 && node[1] <= this.heap[Math.trunc(idx/2)][1] ) {
            this.swap(Math.trunc(idx / 2), idx)
            idx = Math.trunc(idx / 2)
        }
    }

    swap(x, y) {
        [this.heap[x], this.heap[y]] = [this.heap[y], this.heap[x]]
    }

    extractMin() {
        if (this.heap.length <= 2) {
            return this.heap.pop()
        }
        let minVal = this.heap[1]
        this.heap[1] = this.heap.pop()
        let idx = 1

        if (this.heap.length === 2) {
            return minVal
        } else if (this.heap.length === 3){
            if (this.heap[1][1] > this.heap[2][1])
            this.swap(1, 2)
            return minVal
        }else {
            
            while (true) {
                if (this.heap[idx][1] > this.heap[2 * idx][1] && this.heap[2 * idx][1] <= this.heap[2 * idx + 1][1]) {
                    this.swap(idx, 2 * idx)
                    idx = idx * 2
                } else if (this.heap[idx][1] > this.heap[2 * idx + 1][1] && this.heap[2 * idx][1] > this.heap[2 * idx + 1][1]){
                    this.swap(idx, 2 * idx + 1)
                    idx = idx * 2 + 1
                }else{
                    break
                }
                if (idx * 2 + 1 >=  Math.trunc(this.heap.length/2)){
                    break
                }
            }

        }

        return minVal

    }
}



 export function dijkstras(adj, weight, s, t, animations, edgeNumbers) {
    let visited = new Set()
    let dist = Array(adj.length).fill(10**9)
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
            // calcPath(s,t,prev, path)
            console.log(animations)
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

 
























// let adj =[[1, 2], [2], [], [0]]
// let cost = [[1, 5], [2], [], [2]]
// let path = []
// let adj = [[1, 2], [2, 3, 4], [1, 4, 3], [], [3]]
// let cost = [[4, 2], [2, 2, 3], [1, 40, 40], [], [1]]

// let stuff = dijkstras(adj, cost, 0, 4, [], path)
// let prev = stuff[1]
// console.log(dijkstras(adj, cost, 0, 4, [], path))


// console.log(calcPath(0,4, prev, path))

// console.log(path)