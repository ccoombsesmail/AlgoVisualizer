import React, {Component} from 'react';
import BarNode from '../BarNode'
import styles from './BarSort.module.css';
import {bubble_Sort, insertion_sort, quicksort, mergeSort} from "../SortingAlgos/SortingAlgos.js"
import SliderBar from "../SliderBar"
require('../SortingAlgos/SortingAlgos')

class BarSort extends Component {

    constructor(props) {
        super(props);
        this.resetRef = React.createRef();
        this.sortRef = React.createRef();

        this.state = {
            arr: [19, 3, 22, 14, 4, 5, 6, 12, 14, 1, 2, 19, 22, 18,1,21, 1,15,17],
            size: 20,
            speed: 71
        }
    }
    

 resetArr(new_size) {
    var new_arr = []
    for (var i = 0; i < new_size; i++) {
        new_arr.push(Math.floor(Math.random() * 50 + 1))
    }
    this.setState(() => { return  {arr: new_arr, size: new_size} })
    //  this.setState({ arr: new_arr, size: size })


}



sortMerge(){

    //Use array to keep track of bar heights. Set to initial bar height values
    var heights = new Array(this.state.arr.length);
    for (var j = 0; j < heights.length; j++) {  
        heights[j] = document.getElementById(j).style['height'];
    }
  
    // Get animations from #mergeSort
    var animations = [];
    mergeSort(this.state.arr,0, this.state.arr.length-1, animations)

    //Disable reset and sort buttons while animating
    this.resetRef.current.setAttribute("disabled", "disabled")
    this.sortRef.current.setAttribute("disabled", "disabled")


    var i = 0;
    var interval = setInterval(() => {
       
        var k = i
        document.getElementById(animations[i][0].toString()).style['background'] = 'red';
        document.getElementById(animations[i][1].toString()).style['background'] = 'red';
      
        if (animations[i][2] == true) {
         
            var h = heights[animations[i][0]];
            document.getElementById(animations[i][1].toString()).style['height'] = h;
            [heights[animations[i][1]], heights[animations[i][0]]] = [heights[animations[i][0]], heights[animations[i][1]]];
            // console.log(heights.slice(0))

        }

        setTimeout(() => {
            document.getElementById(animations[k][0].toString()).style['background'] = 'black';
            document.getElementById(animations[k][1].toString()).style['background'] = 'black';
        }, this.state.speed * 2.3);

        
        i+=1
        if (i === animations.length - 1) {
        this.resetRef.current.removeAttribute("disabled")
        this.sortRef.current.removeAttribute("disabled")
        clearInterval(interval);
        }

    
    },  this.state.speed);


        setTimeout(() => { this.resetRef.current.removeAttribute("disabled") }, animations.length * this.state.speed + this.state.speed * 3);
        setTimeout(() => { this.sortRef.current.removeAttribute("disabled") }, animations.length * this.state.speed + this.state.speed * 3);
   
}





    sortQuick() {
        var animations = [];
        quicksort(this.state.arr, 0, this.state.arr.length - 1, animations);
        this.resetRef.current.setAttribute("disabled", "disabled")
        this.sortRef.current.setAttribute("disabled", "disabled")
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
                }, this.state.speed*.8);

            if (i === animations.length-1) {
                this.resetRef.current.removeAttribute("disabled")
                this.sortRef.current.removeAttribute("disabled")
                clearInterval(interval);
            }
        },  this.state.speed);
        
    }

    sort() {
    if (this.props.algoToUse === "quicksort"){
        this.sortQuick()
    } else if (this.props.algoToUse === "mergesort") {
        this.sortMerge();
    }else { 
        var animations;
        if (this.props.algoToUse === "insertion"){
             animations = insertion_sort(this.state.arr)
        } else if (this.props.algoToUse === "bubble") {
         animations = bubble_Sort(this.state.arr)
        }
    
        this.resetRef.current.setAttribute("disabled", "disabled")
        this.sortRef.current.setAttribute("disabled", "disabled")

    for (let i = 0; i < animations.length; i++) {
        setTimeout(() => {
                document.getElementById(animations[i][0].toString()).style['background'] = 'red';
                document.getElementById(animations[i][1].toString()).style['background'] = 'red';
                if (animations[i][2] === true) {
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
        this.setState({speed: 1000/new_speed})
    }
    customButtonHandler(){
        this.resetArr(this.state.size)
    }



    render() {
        return (
            <div >
                <div className = {styles.inputWrapper}> 
                    <SliderBar className={styles.input} step = {1} max = {700} size = {true} sliderHandle={this.resetArr.bind(this)} /> 
                    <SliderBar className={styles.input} step = {.1} max={100} size = {false} speedHandle = {this.changeSpeed.bind(this)}   /> 
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