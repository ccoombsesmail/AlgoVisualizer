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
    if (l == r) {
        return 
    }
    if (l - r == 1) {
        if (arr[l] > arr[r]) {
            [arr[l], arr[r]] = [arr[r], arr[l]]
            animations.push([l, r, true])
        } else {
            animations.push([l, r, false])
        }
        return 
    }

    var m = partition(arr, l, r, animations)
    if (m == r || m == r - 1) {
        quicksort(arr, l, r - 1, animations)
    } else if (m == l) {
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
    if (left == right) {
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