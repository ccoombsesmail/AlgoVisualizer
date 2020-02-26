import React, {Component} from 'react';
import BarNode from '../BarNode'
import styles from './BarSort.module.css';
import {bubble_Sort, insertion_sort, quicksort} from "../SortingAlgos/SortingAlgos.js"
import SliderBar from "../SliderBar"
require('../SortingAlgos/SortingAlgos')

class BarSort extends Component {

    constructor(props) {
        super(props);
        this.resetRef = React.createRef();
        this.sortRef = React.createRef();

        this.state = {
            arr: [2, 12, 4, 15, 1, 9, 20, 13, 5, 3, 2, 12, 4, 15, 1, 9, 20, 13, 5, 3],
            size: 20,
            speed: 70
        }
    }
    

 resetArr(size) {
    var new_arr = []
    for (var i = 0; i < size; i++) {
        new_arr.push(Math.floor(Math.random() * 50))
    }
    this.setState({arr: new_arr, size:size})

}
    sortQuick() {
        var animations = [];
        quicksort(this.state.arr, 0, this.state.arr.length - 1, animations);
        this.resetRef.current.setAttribute("disabled", "disabled")
        this.sortRef.current.setAttribute("disabled", "disabled")
        var i = 0;
        var interval = setInterval(() => {
                var k = i
                if (animations[i][2] == true) {
                    document.getElementById(animations[i][0].toString()).style['background'] = 'red';
                    document.getElementById(animations[i][1].toString()).style['background'] = 'red';
                    var h1 = document.getElementById(animations[i][0].toString()).style['height'];
                    var h2 = document.getElementById(animations[i][1].toString()).style['height'];
                    document.getElementById(animations[i][0].toString()).style['height'] = h2;
                    document.getElementById(animations[i][1].toString()).style['height'] = h1;
                    i += 1;
                } else {
                    document.getElementById(animations[i][0].toString()).style['background'] = 'red';
                    document.getElementById(animations[i][1].toString()).style['background'] = 'red';
                    document.getElementById(animations[i + 1][0].toString()).style['background'] = 'red';
                    document.getElementById(animations[i + 1][1].toString()).style['background'] = 'red';
                    i += 2;
                }
                setTimeout(() => {
                document.getElementById(animations[k][0].toString()).style['background'] = 'black';
                document.getElementById(animations[k][1].toString()).style['background'] = 'black';
                document.getElementById(animations[k + 1][0].toString()).style['background'] = 'black';
                document.getElementById(animations[k + 1][1].toString()).style['background'] = 'black';
                console.log(k)
                }, this.state.speed*.8);

            if (i == animations.length-1) {
                this.resetRef.current.removeAttribute("disabled")
                this.sortRef.current.removeAttribute("disabled")
                clearInterval(interval);
            }
        },  this.state.speed);
        
    }

    sort() {
    if (this.props.algoToUse == "quicksort"){
        this.sortQuick()
    }else {
        if (this.props.algoToUse == "insertion"){
            var animations = insertion_sort(this.state.arr)
        } else if (this.props.algoToUse == "bubble") {
        var animations = bubble_Sort(this.state.arr)
        }
        this.resetRef.current.setAttribute("disabled", "disabled")
        this.sortRef.current.setAttribute("disabled", "disabled")

    for (let i = 0; i < animations.length; i++) {
        setTimeout(() => {
                document.getElementById(animations[i][0].toString()).style['background'] = 'red';
                document.getElementById(animations[i][1].toString()).style['background'] = 'red';
                if (animations[i][2] == true) {
                    var h1 = document.getElementById(animations[i][0].toString()).style['height']
                    var h2 = document.getElementById(animations[i][1].toString()).style['height']
                    document.getElementById(animations[i][0].toString()).style['height'] = h2
                    document.getElementById(animations[i][1].toString()).style['height'] = h1
                }
                setTimeout(() => {
                    document.getElementById(animations[i][0].toString()).style['background'] = 'black';
                    document.getElementById(animations[i][1].toString()).style['background'] = 'black';
                }, this.state.speed *.8);
            
        }, i * this.state.speed);
     } 
    
        setTimeout(() => { this.resetRef.current.removeAttribute("disabled")}, animations.length * this.state.speed + this.state.speed * 3 );
        setTimeout(() => { this.sortRef.current.removeAttribute("disabled") }, animations.length * this.state.speed + this.state.speed * 3);
        }
    }


     changeSpeed(new_speed) {
        this.setState({speed: new_speed})
    }
    customButtonHandler(){
        this.resetArr(this.state.size)
    }



    render() {
        return (
            <div >
                <div className = {styles.inputWrapper}> 
                    <SliderBar className={styles.input} step = {1} max = {700} size = {true} sliderHandle={this.resetArr.bind(this)} /> 
                    <SliderBar className={styles.input} step = {.1} max={200} size = {false} speedHandle = {this.changeSpeed.bind(this)}   /> 
                    <button ref = {this.resetRef} className={styles.input, styles.button} onClick={() => this.resetArr(this.state.size)} >  Reset </button>
                    <button ref={this.sortRef}  className={styles.input, styles.button} onClick={() => this.sort(this.state.arr)} >  Sort </button>
                </div>
                <div className = {styles.barWrapper} > 
                    {this.state.arr.map((num, index) => <BarNode className={styles.bar} idName={index.toString()} key={index + 1} height={(num * 15).toString() + "px"} width= {800/this.state.size +"px"} backgroundColor="black" />)}
                </div>
            </div>
        )
    }


}


export default BarSort;