
// function mergeSort(arr, l, r, animations) {

//     if (arr.length === 1 || arr.length === 0) { return arr; }
//     var mid = Math.trunc(arr.length / 2);
//     var left = [...arr.slice(0, mid)];
//     var right = [...arr.slice(mid,arr.length)];

//     return merge(mergeSort(left,l,mid-1), mergeSort(right,mid,r),l,mid,r,animations);

// }

// function merge(left, right,l,mid,r, animations) {
//     var merged_arr = [];
//     while (left.length!=0 && right.length!=0){
//         if (left[0] < right[0]) {
//             merged_arr.push(left.shift());
//         } else {
//             merged_arr.push(right.shift());     
//         }

//     }

//     // console.log(merged_arr.concat(left).concat(right))
//     return merged_arr.concat(left).concat(right);

// }

// l, r, animations



// function mergeSort(arr, l, r, animations) {

//     if (arr.length === 1 || arr.length === 0) { return arr; }
//     var mid = Math.trunc(arr.length / 2);
//     var left = [...arr.slice(0, mid)];
//     var right = [...arr.slice(mid, arr.length)];
//     return merge(mergeSort(left, l, mid - 1, animations), mergeSort(right, mid, r,animations), l, mid, animations);

// }
// function merge(left, right, l, mid, animations) {
//     var merge_animations = []
//     var merged_arr = [];
//     var i = 0
//     var j = 0
//     while (i< left.length && j < right.length) {
//          animations.push([l + i, mid + j, false])
//         if (left[i] < right[j]) {
//             merge_animations.push([l + i, mid + j, true])
//             merged_arr.push(left[i]);
//             i++
//         } else {
//             merge_animations.push([l + i, mid + j, true])
//             merged_arr.push(right[j]);
//             j++
//         }

//     }

//     // console.log(merged_arr.concat(left).concat(right))
//     //console.log(merge_animations)
//     animations.push(...merge_animations);
//     return merged_arr.concat(left.slice(i)).concat(right.slice(j));

// }





//  function mergeSort(arr, l, r, animations) {

//     if (arr.length === 1 || arr.length === 0) { return arr; }
//     var mid = Math.trunc(arr.length / 2);
//     var mid_track = l +mid
//     var left = [...arr.slice(0, mid)];
//     var right = [...arr.slice(mid, arr.length)];
//     console.log(left,right)
//      return merge(mergeSort(left, l, mid - 1, animations), mergeSort(right, mid_track, r, animations), l, mid_track, animations);

// }




//  function merge(left, right, l, mid, animations) {

//     var left_queue = [];
//     var merge_animations = []
//     var merged_arr = [];
//     var i = 0
//     var j = 0
//     var next_empty_pos = l;
//     while (i <= left.length && j <= right.length) {
//         // console.log(left,right)
//         // console.log(l+i, mid+j)
//         // console.log(i,j)
//         console.log("queue: ", left_queue)
//         if (i == left.length && j == right.length) {break;}

//         if (i == left.length){
//             merge_animations.push([mid + j, next_empty_pos, true])
//             next_empty_pos++
//             merged_arr.push(right[j]);
//             j++;
//             continue;
//         } 
//         if (j == right.length){
//             if (next_empty_pos == left_queue[1]) {
//                 left_queue[1] = left_queue[0];
//             }
//             merge_animations.push([left_queue.shift(), next_empty_pos, true])
//             next_empty_pos++
//             merged_arr.push(left[i]);
//             i++;
//             continue;
//         }

//         animations.push([l + i, mid + j, false])
//         if (left[i] <= right[j]) {
//             if (left_queue.length == 0){
//                 merge_animations.push([l + i, next_empty_pos, true])
//             }else if (next_empty_pos == left_queue[left_queue.length-1]){
//                 left_queue[left_queue.length - 1]= left_queue[0]
//                 merge_animations.push([left_queue.shift(), next_empty_pos, true])
//             } else if (next_empty_pos == left_queue[0]){
//                 merge_animations.push([left_queue.shift(), next_empty_pos, true])

//             }else {
//                 left_queue.push(left_queue[0])
//                 merge_animations.push([left_queue.shift(), next_empty_pos, true])
//             }
//             next_empty_pos++
//             merged_arr.push(left[i]);
//             i++;
//         } else {
//             if (next_empty_pos == left_queue[left_queue.length - 1]) {
//                 left_queue[left_queue.length - 1] = mid + j
//             } else if (next_empty_pos == left_queue[0]) {
//                 left_queue[0] = (mid + j)
//             }else {
//             left_queue.push(mid + j)
//             }
//             merge_animations.push([mid + j, next_empty_pos, true])
//             next_empty_pos++
//             merged_arr.push(right[j]);
//             j++;
//         }

//     }
// // var arr = [43, 23, 1, 3, 19, 24, 13, 12, 8, 4, 7, 5, 77, 3, 2, 1]

//     // console.log(merged_arr.concat(left).concat(right))
//     // console.log(merge_animations)
//     animations.push(...merge_animations);
//     console.log(mid)
//     console.log(left,right)
//     console.log(merge_animations);
//     console.log("\n")
//      console.log("\n")
//      console.log("\n")

//     return merged_arr;
//     // .concat(left.slice(i)).concat(right.slice(j));

// }


var animations = [];

var arr = [19, 3, 22, 14, 4, 5, 6, 12, 14, 1, 2, 19, 22, 18, 1, 21, 1, 15, 17]

// [4,5,6,7,8,9,10,12,1,2,14,19,18,22,1,1,21]
console.log(mergeSort(arr, 0, arr.length - 1, animations));
// console.log(animations);

function mergeSort(arr, l, r, animations) {

    if (arr.length === 1 || arr.length === 0) { return arr; }
    var mid = Math.trunc(arr.length / 2);
    var mid_track = l + mid
    var left = [...arr.slice(0, mid)];
    var right = [...arr.slice(mid, arr.length)];
    return merge(mergeSort(left, l, mid_track - 1, animations), mergeSort(right, mid_track, r, animations), l, mid_track, animations);

}

// var arr = [4, 5, 6, 12]
// var arr2 = [7, 8, 9, 10]
// var animations = []
// console.log(merge(arr2, arr, 0, 4, animations));


function merge(left, right, l, mid, animations) {
    var left_nodes = []
     for (let i = 0; i<left.length;i++){
        left_nodes.push({val:left[i], index: l+i, type: "left" })
     }
    var right_nodes = []
    for (let i = 0; i < right.length; i++) {
        right_nodes.push({ val: right[i], index: mid + i, type: "right" })
    }
    var nodes = left_nodes.concat(right_nodes)
    // console.log("not sorted:")
    // console.log(nodes)
    // nodes.sort(eventSorter)
    // console.log("sorted:" )
    // console.log(nodes)
    var left_queue = [];
    var merge_animations = []
    var merged_arr = [];
    var i  = 0
    var j = 0
    var next_empty_pos = l;

    while (i <= left.length && j <= right.length) {
        // console.log(left,right)
        // console.log(l+i, mid+j)
        // console.log(i,j)
        // console.log(left_queue)
        if (i == left.length && j == right.length) { break; }

        if (i == left.length) {
            merge_animations.push([mid + j, next_empty_pos, true])
            next_empty_pos++
            merged_arr.push(right[j]);
            j++;
            continue;
        }
        if (j == right.length) {

            var in_queue_idx = getIndexIfValInQueue(left_queue, next_empty_pos)
            if (in_queue_idx == -1) {
                nodes[next_empty_pos-l].index = left_queue[0].index
                left_queue.push(nodes[next_empty_pos-l])
                merge_animations.push([left_queue.shift().index, next_empty_pos, true])
            } else {
                left_queue[in_queue_idx].index = left_queue[0].index
                merge_animations.push([left_queue.shift().index, next_empty_pos, true])

            }
        
            next_empty_pos++
            merged_arr.push(left[i]);
            i++;
            continue;
        }

        animations.push([l + i, mid + j, false])
        if (left[i] <= right[j]) {
            if (left_queue.length == 0) {
                merge_animations.push([l + i, next_empty_pos, true])
            }else {
                var in_queue_idx = getIndexIfValInQueue(left_queue, next_empty_pos)
                if (next_empty_pos == left_queue[0].index){
                  merge_animations.push([left_queue.shift().index, next_empty_pos, true])
                } else if(in_queue_idx == -1) {
                    nodes[next_empty_pos-l].index = left_queue[0].index 
                    left_queue.push(nodes[next_empty_pos-l])
                    merge_animations.push([left_queue.shift().index, next_empty_pos, true])
                }else {
                    left_queue[in_queue_idx].index = left_queue[0].index
                    merge_animations.push([left_queue.shift().index, next_empty_pos, true])

                }
            }

            
            next_empty_pos++
            merged_arr.push(left[i]);
            i++;
        } else {
            var in_queue_idx = getIndexIfValInQueue(left_queue, next_empty_pos)
            // console.log(in_queue_idx)
            if (mid+j == next_empty_pos){
                merge_animations.push([mid + j, next_empty_pos, true])
            } else if (in_queue_idx == -1  ) {
                nodes[next_empty_pos - l].index = mid + j
                left_queue.push(nodes[next_empty_pos - l])
                merge_animations.push([mid + j, next_empty_pos, true])
            }else {
                // console.log("before: ", left_queue[in_queue_idx].index)
                left_queue[in_queue_idx].index = mid+j
                // console.log("after: ", left_queue[in_queue_idx].index)
                merge_animations.push([mid+j, next_empty_pos, true])
            }
            // merge_animations.push([mid + j, next_empty_pos, true])
            next_empty_pos++
            merged_arr.push(right[j]);
            j++;
        }

    }
 
    animations.push(...merge_animations);
    // console.log(merged_arr.concat(left).concat(right))
    console.log(mid)
    console.log(left,right)
    console.log(merge_animations);
    console.log("\n")
    console.log("\n")
    console.log("\n")

    left_queue = [];
    // console.log(animations);
    return merged_arr;
    // .concat(left.slice(i)).concat(right.slice(j));

}


function getIndexIfValInQueue(queue, next_pos){

    for (var i=0; i<queue.length; i++){
        if (queue[i].index == next_pos) {
            return i
        }
    }
    return -1

}



function eventSorter(a, b) {
    if (a.val == b.val) {
        return 0;
    } else {
        return a.val < b.val ? -1 : 1;
    }
}

// itemsArray.sort(eventSorter);