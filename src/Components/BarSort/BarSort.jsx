import React, {Component} from 'react';
import BarNode from '../BarNode'
import styles from './BarSort.module.css';
import {benchmarks} from "../SortingAlgos/SortingAlgos.js"
import {execute_quicksort_animations, execute_mergesort_animations, execute_simplesort_animations} from "../SortingAlgos/SortingAlgoAnimations.js"
import SliderBar from "../SliderBar"
import BenchmarkTable from '../BenchmarkTable';
require('../SortingAlgos/SortingAlgos')

class BarSort extends Component {

    constructor(props) {
        super(props);
        this.resetRef = React.createRef();
        this.sortRef = React.createRef();

        this.state = {
            arr: [190, 300, 222, 900, 400, 500, 600, 120, 140, 100, 200, 190, 70, 800, 700, 550, 650, 150, 90],
            size: 20,
            speed: 71,
            benchmark_times: [],
            button_toggle: false
        }
    }
    


    


    resetArr(new_size) {
        var new_arr = []
        for (var i = 0; i < new_size; i++) {
            new_arr.push(Math.floor(Math.random() * 1000 + 50))
        }
        this.setState(() => { return  {arr: new_arr, size: new_size} })
    }



    animate_merge_sort(){
        execute_mergesort_animations(this.state.arr, this.state.speed, this.resetRef, this.sortRef, this.bench.bind(this))
    }

    animate_quicksort() {
        execute_quicksort_animations(this.state.arr, this.state.speed, this.resetRef, this.sortRef, this.bench.bind(this))
    }

    animate_insertionsort(type) {
        execute_simplesort_animations(this.state.arr, this.state.speed, this.resetRef, this.sortRef, type, this.bench.bind(this))
    }

    animate_bubblesort(type) {
        execute_simplesort_animations(this.state.arr, this.state.speed, this.resetRef, this.sortRef, type, this.bench.bind(this))
    }


    sort() {

        switch(this.props.algoToUse) {
            case "mergesort":
                this.animate_merge_sort();
                break;
            case "quicksort":
                this.animate_quicksort()
                break;
            case "insertionsort":
                this.animate_insertionsort("insertion")
                break;
            case "bubblesort":
                this.animate_bubblesort("bubble")
                break;
            }      
    }

    bench(arr) {
        var benches = benchmarks(arr)
        this.setState({benchmark_times: benches})
    }


    
 

    changeSpeed(new_speed) {
        this.setState({speed: 1000/new_speed})
    }

    customButtonHandler(){
        this.resetArr(this.state.size)
    }


    render() {
        var benches1 = <div></div>
        if (this.state.benchmark_times.length != 0 ){
            var benches = this.state.benchmark_times
            benches1 = <BenchmarkTable built_in={benches[0].toFixed(4)} merge_sort={benches[1].toFixed(4)} 
                quick_sort={benches[2].toFixed(4)} bubble_sort={benches[3].toFixed(4)} insertion_sort={benches[3].toFixed(4)} />
        }

        return (
            <div >

                <div className = {styles.inputWrapper}> 
                    {benches1}
                    <div className = {styles.buttonSliderWrapper}>
                        <div className = {styles.buttons}>
                            <button ref = {this.resetRef} className={styles.input, styles.button} onClick={() => this.resetArr(this.state.size)} >  Reset </button>
                            <button ref={this.sortRef}className={styles.input, styles.button} onClick={() => this.sort(this.state.arr)} >  Sort </button>
                            <button className={styles.input, styles.button} onClick={() => this.bench(this.state.arr)} >  Benchmark </button>
                        </div>
                        <div className = {styles.sliders}>
                            <SliderBar styling={styles.input} step = {1} max = {800} size = {true} sliderHandle={this.resetArr.bind(this)} /> 
                            <SliderBar  styling={styles.input} step = {.1} max={300} size = {false} speedHandle = {this.changeSpeed.bind(this)} /> 
                        </div>
                    </div>
                </div>
                <div className = {styles.barWrapper} > 
                    {this.state.arr.map((num, index) => <BarNode className={styles.bar} idName={index.toString()} key={index + 1} height={(num * .7).toString() + "px"} width={2800 / this.state.size + "px"} backgroundColor = "black" />)}
                </div>
            </div>
        )
    }


}


export default BarSort;