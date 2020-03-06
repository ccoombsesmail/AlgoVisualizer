export function bubble_Sort(a) {
    var unsorted = true;
    let n = a.length - 1;
    var comparisons = [];
    do {
        unsorted = false;
        for (let i = 0; i < n; i++) {
            if (a[i] > a[i + 1]) {
                [a[i], a[i + 1]] = [a[i + 1], a[i]]
                comparisons.push([i, i + 1, true])
                unsorted = true;
            } else {
                comparisons.push([i, i + 1, false])
            }
        }
        n--;
    } while (unsorted);

    return comparisons

}


export function insertion_sort(a) {
    var animations = []
    var j;
    for (let i = 1; i < a.length; i++) {
        if (a[i] >= a[i - 1]) {
            animations.push([i - 1, i, false])
        } else {
            j = i
            while (j > 0 && a[j - 1] > a[j]) {
                [a[j - 1], a[j]] = [a[j], a[j - 1]]
                animations.push([j - 1, j, true])
                j--
            }
        }

    }
    return animations
}



// export function insertion_sort2(a) {
//     var animations = []
//     for (let i = 1; i < a.length; i++) {
//         var j = 0
//         while (j < i) {
//             if (a[0] > a[i]) {
//                 animations.push([0, i, true])
//                 a.unshift(a[i])
//                 a.splice(i + 1, 1)
//                 break
//             } else { 
//                 if (a[i] < a[j + 1] && a[i] >= a[j]) {
//                     var temp = a[i]
//                     a.splice(i, 1)
//                     a.splice(j + 1, 0, temp)
//                     animations.push([i, j, true])
//                     break
//                 }else{
//                     animations.push([i, j, false])
//                 }
//             }
//             j++


//         }

//     }
//     return animations
// }

export function quicksort(arr, l, r, animations) {
    //console.log(arr)
    if (l === r) {
        return 
    }
    if (l - r === 1) {
        if (arr[l] > arr[r]) {
            [arr[l], arr[r]] = [arr[r], arr[l]]
            animations.push([l, r, true])
        } else {
            animations.push([l, r, false])
        }
        return 
    }

    var m = partition(arr, l, r, animations)
    if (m === r || m === r - 1) {
        quicksort(arr, l, r - 1, animations)
    } else if (m === l) {
        quicksort(arr, l + 1, r, animations)
    } else {
        quicksort(arr, l, m - 1, animations)
        quicksort(arr, m + 1, r, animations)
    }

}




export function partition(arr, l, r, animations) {
    var pivotIdx = l + Math.floor((r - l + 1) / 2);
    var lastIndex = r;
    var pivot = arr[pivotIdx];
    [arr[lastIndex], arr[pivotIdx]] = [arr[pivotIdx], arr[lastIndex]];
    animations.push([lastIndex, pivotIdx, true])
    var left = l;
    var right = r - 1;
    while (left < right) {
        animations.push([left, lastIndex, false])
        animations.push([right, lastIndex, false])
        if (arr[left] > pivot && arr[right] < pivot) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
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
    if (left === right) {
        if (arr[left] > pivot) {
            [arr[left], arr[lastIndex]] = [arr[lastIndex], arr[left]]
        } else {
            [arr[left + 1], arr[lastIndex]] = [arr[lastIndex], arr[left + 1]];
            animations.push([left+1, lastIndex, true])
            return left + 1
        }
    } else {

        [arr[left], arr[lastIndex]] = [arr[lastIndex], arr[left]];
    }
    animations.push([left, lastIndex, true])
    return left;

}




// export function mergeSort(arr, l, r, animations) {

//     if (arr.length === 1 || arr.length === 0) { return arr; }
//     var mid = Math.trunc(arr.length / 2);
//     var mid_track = l + mid
//     var left = [...arr.slice(0, mid)];
//     var right = [...arr.slice(mid, arr.length)];
//     return merge(mergeSort(left, l, mid_track-1 , animations), mergeSort(right, mid_track, r, animations), l, mid_track, animations);

// }
// export function merge(left, right, l, mid, animations) {

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
//         if (i == left.length && j == right.length) { break; }

//         if (i == left.length) {
//             merge_animations.push([mid + j, next_empty_pos, true])
//             next_empty_pos++
//             merged_arr.push(right[j]);
//             j++;
//             continue;
//         }
//         if (j == right.length) {
//             // merge_animations.push([mid + i, next_empty_pos, true])
//             merge_animations.push([left_queue.shift(), next_empty_pos, true])

//             next_empty_pos++
//             merged_arr.push(left[i]);
//             i++;
//             continue;
//         }

//         animations.push([l + i, mid + j, false])
//         if (left[i] <= right[j]) {
//             if (left_queue.length == 0) {
//                 merge_animations.push([l + i, next_empty_pos, true])
//             } else {
//                 if (left_queue[left_queue.length - 1] == left_queue[0]) {
//                     left_queue[left_queue.length - 1] = left_queue[0]
//                 }
//                 merge_animations.push([left_queue.shift(), next_empty_pos, true])
//             }
//             next_empty_pos++
//             merged_arr.push(left[i]);
//             i++;
//         } else {
//             left_queue.push(mid + j)
//             merge_animations.push([mid + j, next_empty_pos, true])
//             next_empty_pos++
//             merged_arr.push(right[j]);
//             j++;
//         }

//     }
//     // var arr = [43, 23, 1, 3, 19, 24, 13, 12, 8, 4, 7, 5, 77, 3, 2, 1]

//     // console.log(merged_arr.concat(left).concat(right))
//     // console.log(merge_animations)
//     animations.push(...merge_animations);
//     // console.log(left,right)

//     // console.log(animations);
//     return merged_arr;
//     // .concat(left.slice(i)).concat(right.slice(j));

// }




// export function mergeSort(arr, l, r, animations) {

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


// export function merge(left, right, l, mid, animations) {

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
//             if (left_queue.length == 0) {
//                 merge_animations.push([l + i, next_empty_pos, true])
//             } else if (next_empty_pos == left_queue[left_queue.length - 1]) {
//                 left_queue[left_queue.length - 1] = left_queue[0]
//                 merge_animations.push([left_queue.shift(), next_empty_pos, true])
//             } else if (next_empty_pos == left_queue[0]) {
//                 left_queue.push(left_queue[0])
//                 merge_animations.push([left_queue.shift(), next_empty_pos, true])
//             }else {
//                 // left_queue.push(left_queue[0])
//                 merge_animations.push([left_queue.shift(), next_empty_pos, true])
//             }
//             next_empty_pos++
//             merged_arr.push(left[i]);
//             i++;
//         } else {
//             if (next_empty_pos == left_queue[left_queue.length - 1]) {
//                 left_queue[left_queue.length - 1] = mid + j
//             } else if (next_empty_pos == left_queue[0]) {
//                 left_queue[0]= (mid + j)
//             }
//              else {
//                 left_queue.push(mid + j)
//             }
//             merge_animations.push([mid + j, next_empty_pos, true])
//             next_empty_pos++
//             merged_arr.push(right[j]);
//             j++;
//         }

//     }
//     // var arr = [43, 23, 1, 3, 19, 24, 13, 12, 8, 4, 7, 5, 77, 3, 2, 1]
//     // console.log(merged_arr.concat(left).concat(right))
//     // console.log(merge_animations)
//     animations.push(...merge_animations);
//     // console.log(left, right)
//     left_queue = [];
//     // console.log(animations);
//     return merged_arr;
//     // .concat(left.slice(i)).concat(right.slice(j));

// }



export function mergeSort(arr, l, r, animations) {

    if (arr.length === 1 || arr.length === 0) { return arr; }
    var mid = Math.trunc(arr.length / 2);
    var mid_track = l + mid
    var left = [...arr.slice(0, mid)];
    var right = [...arr.slice(mid, arr.length)];
    return merge(mergeSort(left, l, mid_track - 1, animations), mergeSort(right, mid_track, r, animations), l, mid_track, animations);

}


export function merge(left, right, l, mid, animations) {
    var left_nodes = []
    for (let i = 0; i < left.length; i++) {
        left_nodes.push({ val: left[i], index: l + i, type: "left" })
    }
    var right_nodes = []
    for (let i = 0; i < right.length; i++) {
        right_nodes.push({ val: right[i], index: mid + i, type: "right" })
    }
    var nodes = left_nodes.concat(right_nodes)
    var left_queue = [];
    var merge_animations = []
    var merged_arr = [];
    var i = 0
    var j = 0
    var next_empty_pos = l;

    while (i <= left.length && j <= right.length) {
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
                nodes[next_empty_pos - l].index = left_queue[0].index
                left_queue.push(nodes[next_empty_pos - l])
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
            } else {
                var in_queue_idx = getIndexIfValInQueue(left_queue, next_empty_pos)
                if (next_empty_pos == left_queue[0].index) {
                    merge_animations.push([left_queue.shift().index, next_empty_pos, true])
                } else if (in_queue_idx == -1) {
                    nodes[next_empty_pos - l].index = left_queue[0].index
                    left_queue.push(nodes[next_empty_pos - l])
                    merge_animations.push([left_queue.shift().index, next_empty_pos, true])
                } else {
                    left_queue[in_queue_idx].index = left_queue[0].index
                    merge_animations.push([left_queue.shift().index, next_empty_pos, true])

                }
            }


            next_empty_pos++
            merged_arr.push(left[i]);
            i++;
        } else {
            var in_queue_idx = getIndexIfValInQueue(left_queue, next_empty_pos)
            if (mid + j == next_empty_pos) {
                merge_animations.push([mid + j, next_empty_pos, true])
            } else if (in_queue_idx == -1) {
                nodes[next_empty_pos - l].index = mid + j
                left_queue.push(nodes[next_empty_pos - l])
                merge_animations.push([mid + j, next_empty_pos, true])
            } else {
                left_queue[in_queue_idx].index = mid + j
                merge_animations.push([mid + j, next_empty_pos, true])
            }
            next_empty_pos++
            merged_arr.push(right[j]);
            j++;
        }

    }

    animations.push(...merge_animations);  
    left_queue = [];
    return merged_arr;
}


export function getIndexIfValInQueue(queue, next_pos) {

    for (var i = 0; i < queue.length; i++) {
        if (queue[i].index == next_pos) {
            return i
        }
    }
    return -1

}