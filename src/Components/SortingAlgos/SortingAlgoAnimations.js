import { bubble_sort, insertion_sort, quicksort, merge_sort, benchmarks } from "./SortingAlgos.js"


export function execute_quicksort_animations(arr, speed, resetRef, sortRef, callbenches) {
    var animations = [];
    var bench_arr = [...arr]
    quicksort(arr, 0, arr.length - 1, animations);
    resetRef.current.setAttribute("disabled", "disabled")
    sortRef.current.setAttribute("disabled", "disabled")
    var i = 0;
    var interval = setInterval(() => {
        var k = i
        if (animations[i][2] === true) {
            document.getElementById(animations[i][0].toString()).style['background'] = 'red';
            document.getElementById(animations[i][1].toString()).style['background'] = 'red';
            var h1 = document.getElementById(animations[i][0].toString()).style['height'];
            var h2 = document.getElementById(animations[i][1].toString()).style['height'];
            document.getElementById(animations[i][0].toString()).style['height'] = h2;
            document.getElementById(animations[i][1].toString()).style['height'] = h1;
            i += 1;
        } else {
            document.getElementById(animations[i][0].toString()).style['background'] = 'red';
            document.getElementById(animations[i][1].toString()).style['background'] = 'green';
            document.getElementById(animations[i + 1][0].toString()).style['background'] = 'red';
            // document.getElementById(animations[i + 1][1].toString()).style['background'] = 'green';
            i += 2;
        }
        setTimeout(() => {
            document.getElementById(animations[k][0].toString()).style['background'] = 'black';
            document.getElementById(animations[k][1].toString()).style['background'] = 'black';
            document.getElementById(animations[k + 1][0].toString()).style['background'] = 'black';
            document.getElementById(animations[k + 1][1].toString()).style['background'] = 'black';
        }, speed * .8);

        if (i === animations.length - 1) {
            resetRef.current.removeAttribute("disabled")
            sortRef.current.removeAttribute("disabled")
            callbenches(bench_arr)
            clearInterval(interval);
        }
    }, speed);


} 


export function execute_mergesort_animations(arr, speed, resetRef, sortRef, callbenches) {

    var bench_arr = [...arr]

    //Use array to keep track of bar heights. Set to initial bar height values
    var heights = new Array(arr.length);
    for (var j = 0; j < heights.length; j++) {
        heights[j] = document.getElementById(j).style['height'];
    }

    // Get animations from #mergeSort
    var animations = [];
    merge_sort(arr, 0, arr.length - 1, animations)

    //Disable reset and sort buttons while animating
    resetRef.current.setAttribute("disabled", "disabled")
    sortRef.current.setAttribute("disabled", "disabled")


    var i = 0;
    var interval = setInterval(() => {

        var k = i
        document.getElementById(animations[i][0].toString()).style['background'] = 'red';
        document.getElementById(animations[i][1].toString()).style['background'] = 'red';

        if (animations[i][2] == true) {

            var h = heights[animations[i][0]];
            document.getElementById(animations[i][1].toString()).style['height'] = h;
            [heights[animations[i][1]], heights[animations[i][0]]] = [heights[animations[i][0]], heights[animations[i][1]]];
        }

        setTimeout(() => {
            document.getElementById(animations[k][0].toString()).style['background'] = 'black';
            document.getElementById(animations[k][1].toString()).style['background'] = 'black';
        }, speed * .8);


        i += 1
        if (i === animations.length - 1) {
            resetRef.current.removeAttribute("disabled")
            sortRef.current.removeAttribute("disabled")
            callbenches(bench_arr)
            clearInterval(interval);
        }


    }, speed);



}



 //Simple sorting algos like bubble sort and insertion sort can be animated in the same way once receiving the animations  

export function execute_simplesort_animations(arr, speed, resetRef, sortRef, type, callbenches) {
    
    var bench_arr = [...arr]
    resetRef.current.setAttribute("disabled", "disabled");
    sortRef.current.setAttribute("disabled", "disabled");

    var animations;

    if (type === "insertion"){
        animations = insertion_sort(arr)
    } else if (type === "bubble") {
        animations = bubble_sort(arr)
    }

    var i = 0;
    var interval = setInterval(() => {
        var k = i

        document.getElementById(animations[i][0].toString()).style['background'] = 'red';
        document.getElementById(animations[i][1].toString()).style['background'] = 'red';
        if (animations[i][2] === true) {
            var h1 = document.getElementById(animations[i][0].toString()).style['height']
            var h2 = document.getElementById(animations[i][1].toString()).style['height']
            document.getElementById(animations[i][0].toString()).style['height'] = h2
            document.getElementById(animations[i][1].toString()).style['height'] = h1
        }
        setTimeout(() => {
            document.getElementById(animations[k][0].toString()).style['background'] = 'black';
            document.getElementById(animations[k][1].toString()).style['background'] = 'black';
        }, speed * .8);


        i += 1
        if (i === animations.length - 1) {
            resetRef.current.removeAttribute("disabled")
            sortRef.current.removeAttribute("disabled")
            callbenches(bench_arr)
            clearInterval(interval);
        }

    }, speed);



}
