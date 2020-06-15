
/*--------------------------------------------Bubble Sort---------------------------------------------------------------------------*/

export function bubble_sort(a) {
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

/*--------------------------------------------Insertion Sort---------------------------------------------------------------------------*/

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


/*--------------------------------------------Quicksort---------------------------------------------------------------------------*/

export function quicksort(arr, l, r, animations) {
    //console.log(arr)
    if (l >= r) {
        return
    }
   
    var m = partition(arr, l, r, animations)
    quicksort(arr, l, m - 1, animations)
    quicksort(arr, m + 1, r, animations)

}




export function partition(arr, l, r, animations) {
    var pivotIdx = Math.floor(Math.random()*(r-l+1)) + l
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

export function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}





/*--------------------------------------------MergeSort---------------------------------------------------------------------------*/


export function merge_sort(arr, l, r, animations) {

    if (arr.length === 1 || arr.length === 0) { return arr; }
    var mid = Math.trunc(arr.length / 2);
    var mid_track = l + mid
    var left = [...arr.slice(0, mid)];
    var right = [...arr.slice(mid, arr.length)];
    return merge(merge_sort(left, l, mid_track - 1, animations), merge_sort(right, mid_track, r, animations), l, mid_track, animations);

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
        if (i === left.length && j === right.length) { break; }

        if (i == left.length) {
            merge_animations.push([mid + j, next_empty_pos, true])
            next_empty_pos++
            merged_arr.push(right[j]);
            j++;
            continue;
        }
        if (j === right.length) {

            var in_queue_idx = getIndexIfValInQueue(left_queue, next_empty_pos)
            if (in_queue_idx === -1) {
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
            if (left_queue.length === 0) {
                merge_animations.push([l + i, next_empty_pos, true])
            } else {
                var in_queue_idx = getIndexIfValInQueue(left_queue, next_empty_pos)
                if (next_empty_pos === left_queue[0].index) {
                    merge_animations.push([left_queue.shift().index, next_empty_pos, true])
                } else if (in_queue_idx === -1) {
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
            if (mid + j === next_empty_pos) {
                merge_animations.push([mid + j, next_empty_pos, true])
            } else if (in_queue_idx === -1) {
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
        if (queue[i].index === next_pos) {
            return i
        }
    }
    return -1

}


/*--------------------------------------------------------------------------------Benchmarks---------------------------------------------------------------------*/

 export function benchmarks(arr) {
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


     return [t9 - t8, t7 - t6, t5 - t4, t3 - t2, t1 - t0]

}



/*-----------------------------------Sort Algos--------------------------------------------*/


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
        if (i === left.length && j === right.length) { break; }

        if (i === left.length) {
            merged_arr.push(right[j]);
            j++;
            continue;
        }
        if (j === right.length) {
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


