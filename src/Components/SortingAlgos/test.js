
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


// var animations = [];

// var arr = [19, 3, 22, 14, 4, 5, 6, 12, 14, 1, 2, 19, 22, 18, 1, 21, 1, 15, 17]

// // [4,5,6,7,8,9,10,12,1,2,14,19,18,22,1,1,21]
// console.log(mergeSort(arr, 0, arr.length - 1, animations));
// // console.log(animations);

// function mergeSort(arr, l, r, animations) {

//     if (arr.length === 1 || arr.length === 0) { return arr; }
//     var mid = Math.trunc(arr.length / 2);
//     var mid_track = l + mid
//     var left = [...arr.slice(0, mid)];
//     var right = [...arr.slice(mid, arr.length)];
//     return merge(mergeSort(left, l, mid_track - 1, animations), mergeSort(right, mid_track, r, animations), l, mid_track, animations);

// }

// // var arr = [4, 5, 6, 12]
// // var arr2 = [7, 8, 9, 10]
// // var animations = []
// // console.log(merge(arr2, arr, 0, 4, animations));


// function merge(left, right, l, mid, animations) {
//     var left_nodes = []
//      for (let i = 0; i<left.length;i++){
//         left_nodes.push({val:left[i], index: l+i, type: "left" })
//      }
//     var right_nodes = []
//     for (let i = 0; i < right.length; i++) {
//         right_nodes.push({ val: right[i], index: mid + i, type: "right" })
//     }
//     var nodes = left_nodes.concat(right_nodes)
//     // console.log("not sorted:")
//     // console.log(nodes)
//     // nodes.sort(eventSorter)
//     // console.log("sorted:" )
//     // console.log(nodes)
//     var left_queue = [];
//     var merge_animations = []
//     var merged_arr = [];
//     var i  = 0
//     var j = 0
//     var next_empty_pos = l;

//     while (i <= left.length && j <= right.length) {
//         // console.log(left,right)
//         // console.log(l+i, mid+j)
//         // console.log(i,j)
//         // console.log(left_queue)
//         if (i == left.length && j == right.length) { break; }

//         if (i == left.length) {
//             merge_animations.push([mid + j, next_empty_pos, true])
//             next_empty_pos++
//             merged_arr.push(right[j]);
//             j++;
//             continue;
//         }
//         if (j == right.length) {

//             var in_queue_idx = getIndexIfValInQueue(left_queue, next_empty_pos)
//             if (in_queue_idx == -1) {
//                 nodes[next_empty_pos-l].index = left_queue[0].index
//                 left_queue.push(nodes[next_empty_pos-l])
//                 merge_animations.push([left_queue.shift().index, next_empty_pos, true])
//             } else {
//                 left_queue[in_queue_idx].index = left_queue[0].index
//                 merge_animations.push([left_queue.shift().index, next_empty_pos, true])

//             }
        
//             next_empty_pos++
//             merged_arr.push(left[i]);
//             i++;
//             continue;
//         }

//         animations.push([l + i, mid + j, false])
//         if (left[i] <= right[j]) {
//             if (left_queue.length == 0) {
//                 merge_animations.push([l + i, next_empty_pos, true])
//             }else {
//                 var in_queue_idx = getIndexIfValInQueue(left_queue, next_empty_pos)
//                 if (next_empty_pos == left_queue[0].index){
//                   merge_animations.push([left_queue.shift().index, next_empty_pos, true])
//                 } else if(in_queue_idx == -1) {
//                     nodes[next_empty_pos-l].index = left_queue[0].index 
//                     left_queue.push(nodes[next_empty_pos-l])
//                     merge_animations.push([left_queue.shift().index, next_empty_pos, true])
//                 }else {
//                     left_queue[in_queue_idx].index = left_queue[0].index
//                     merge_animations.push([left_queue.shift().index, next_empty_pos, true])

//                 }
//             }

            
//             next_empty_pos++
//             merged_arr.push(left[i]);
//             i++;
//         } else {
//             var in_queue_idx = getIndexIfValInQueue(left_queue, next_empty_pos)
//             // console.log(in_queue_idx)
//             if (mid+j == next_empty_pos){
//                 merge_animations.push([mid + j, next_empty_pos, true])
//             } else if (in_queue_idx == -1  ) {
//                 nodes[next_empty_pos - l].index = mid + j
//                 left_queue.push(nodes[next_empty_pos - l])
//                 merge_animations.push([mid + j, next_empty_pos, true])
//             }else {
//                 // console.log("before: ", left_queue[in_queue_idx].index)
//                 left_queue[in_queue_idx].index = mid+j
//                 // console.log("after: ", left_queue[in_queue_idx].index)
//                 merge_animations.push([mid+j, next_empty_pos, true])
//             }
//             // merge_animations.push([mid + j, next_empty_pos, true])
//             next_empty_pos++
//             merged_arr.push(right[j]);
//             j++;
//         }

//     }
 
//     animations.push(...merge_animations);
//     // console.log(merged_arr.concat(left).concat(right))
//     console.log(mid)
//     console.log(left,right)
//     console.log(merge_animations);
//     console.log("\n")
//     console.log("\n")
//     console.log("\n")

//     left_queue = [];
//     // console.log(animations);
//     return merged_arr;
//     // .concat(left.slice(i)).concat(right.slice(j));

// }


// function getIndexIfValInQueue(queue, next_pos){

//     for (var i=0; i<queue.length; i++){
//         if (queue[i].index == next_pos) {
//             return i
//         }
//     }
//     return -1

// }



// function eventSorter(a, b) {
//     if (a.val == b.val) {
//         return 0;
//     } else {
//         return a.val < b.val ? -1 : 1;
//     }
// }

// // itemsArray.sort(eventSorter);


// animations = []
// arr = [19, 3, 22, 14, 4, 5, 6, 12, 14, 1, 2, 19, 22, 18, 1, 21, 1, 15, 17]
// quicksort(arr, 0, arr.length-1, animations)
// console.log(arr)

function quicksort(arr, l, r, animations) {
    //console.log(arr)
    if (l >= r) {
        return
    }

    var m = partition(arr, l, r, animations)
    quicksort(arr, l, m - 1, animations)
    quicksort(arr, m + 1, r, animations)

}




function partition(arr, l, r, animations) {
    var pivotIdx = Math.floor(Math.random() * (r - l + 1)) + l
    var lastIndex = r;
    var pivot = arr[pivotIdx];
    swap(arr, lastIndex, pivotIdx)
    animations.push([lastIndex, pivotIdx, true])
    var left = l;
    var right = r - 1;
    while (left <= right) {
        animations.push([left, lastIndex, false])
        animations.push([right, lastIndex, false])
        if (arr[left] > pivot && arr[right] < pivot) {
            swap(arr, left, right)
            animations.push([left, right, true]);
            left++;
            right--;
            continue;
        }
        if (arr[left] <= pivot) {
            left++;
        }
        if (arr[right] >= pivot) {
            right--;
        }

    }

    swap(arr, left, lastIndex)
    animations.push([left, lastIndex, true])
    return left;

}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}




const {
    performance
} = require('perf_hooks');






var new_arr = []
for (var i = 0; i < 40000; i++) {
    new_arr.push(Math.floor(Math.random() * 1000 + 50))
}

benchmarks(new_arr)

function benchmarks(arr) {
    var arr3 = [...arr];
    var arr1 = [...arr];
    var arr2 = [...arr];
    var arr4 = [...arr];
    var arr5 = [...arr];



    var t6 = performance.now();
    merge_sort_bench(arr4);
    var t7 = performance.now();


    var t4 = performance.now();
    quicksort_bench(arr3, 0, arr3.length - 1);
    var t5 = performance.now();

    var t2 = performance.now();
    bubble_sort_bench(arr2);
    var t3 = performance.now();

    var t0 = performance.now();
    insertion_sort_bench(arr1);
    var t1 = performance.now();

    
    var t8 = performance.now()
    arr5.sort()
    var t9 = performance.now()



    console.log(t9 - t8);
    console.log();
    console.log(t7 - t6);
    console.log();
    console.log(t5 - t4);
    console.log();
    console.log(t3 - t2);
    console.log();
    console.log(t1 - t0);
    


}



/*-------------------------------------------------------------------------------*/


function quicksort_bench(arr, l, r) {
    if (l >= r) {
        return;
    }

    var m = partition_bench(arr, l, r);
    quicksort_bench(arr, l, m - 1);
    quicksort_bench(arr, m + 1, r);

}




function partition_bench(arr, l, r) {
    var pivotIdx = Math.floor(Math.random() * (r - l + 1)) + l;
    var lastIndex = r;
    var pivot = arr[pivotIdx];
    swap_bench(arr, lastIndex, pivotIdx);
    var left = l;
    var right = r - 1;
    while (left <= right) {
        if (arr[left] > pivot && arr[right] < pivot) {
            swap_bench(arr, left, right);
            left++;
            right--;
            continue;
        }
        if (arr[left] <= pivot) {
            left++;
        }
        if (arr[right] >= pivot) {
            right--;
        }

    }

    swap_bench(arr, left, lastIndex);
    return left;
}

function swap_bench(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/*-------------------------------------------------------------------------------*/
function merge_sort_bench(arr) {

    if (arr.length === 1 || arr.length === 0) { return arr; }
    var mid = Math.trunc(arr.length / 2);
    var left = [...arr.slice(0, mid)];
    var right = [...arr.slice(mid, arr.length)];
    return merge_bench(merge_sort_bench(left), merge_sort_bench(right));

}


function merge_bench(left, right) {

    var merged_arr = [];
    var i = 0
    var j = 0
    while (i <= left.length && j <= right.length) {
        if (i == left.length && j == right.length) { break; }

        if (i == left.length) {
            merged_arr.push(right[j]);
            j++;
            continue;
        }
        if (j == right.length) {
            merged_arr.push(left[i]);
            i++;
            continue;
        }

        if (left[i] <= right[j]) {
            merged_arr.push(left[i]);
            i++;
        } else {
            merged_arr.push(right[j]);
            j++;
        }

    }

    return merged_arr;
}




function bubble_sort_bench(a) {
    var unsorted = true;
    let n = a.length - 1;
    do {
        unsorted = false;
        for (let i = 0; i < n; i++) {
            if (a[i] > a[i + 1]) {
                [a[i], a[i + 1]] = [a[i + 1], a[i]];
                unsorted = true;
            }
        }
        n--;
    } while (unsorted);
}







function insertion_sort_bench(a) {
    var j;
    for (let i = 1; i < a.length; i++) {
        j = i;
        while (j > 0 && a[j - 1] > a[j]) {
            [a[j - 1], a[j]] = [a[j], a[j - 1]];
            j--;
        }
    }

}


