import React from 'react';
import {getMergeSortAnimations, bubbleSort,  quickSort} from '../sortingAlgorithm/SortingAlgorithms.js';
import './SortingVisualizer.css';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';
//const Terinary_color = 'blue';
export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
      numberOfBars: 30,
      AnimationSpeed: 5,
      primary_color: 'pink'
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i <this.state.numberOfBars; i++) {
      array.push(randomIntFromInterval(5, 600));
    }
    this.setState({array});

    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.display = 'inline-block';
  }
}

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : this.state.primary_color;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * this.state.AnimationSpeed);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * this.state.AnimationSpeed);
      }
    }
  }

  // heapSort() {
  //   const animations = heapSort(this.state.array);
  //   for (let i = 0; i < animations.length; i++) {
  //     const [firstIndex, secondIndex] = animations[i];
  //     setTimeout(() => {
  //       // Implement animation logic using firstIndex and secondIndex
  //       // For example, update state to highlight elements at indices firstIndex and secondIndex
  //     }, i * this.state.AnimationSpeed);
  //   }
  // }
  
  quickSort() {
    const animations = quickSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        
        setTimeout(() => {
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
            setTimeout(() => {
                barOneStyle.height = `${barTwoHeight}px`;
                barTwoStyle.height = `${barOneHeight}px`;
                barOneStyle.backgroundColor = this.state.primary_color;
                barTwoStyle.backgroundColor = this.state.primary_color;
            }, this.state.AnimationSpeed / 2);
        }, i * this.state.AnimationSpeed);
    }
}


  bubbleSort() {
    const animations = bubbleSort(this.state.array);
    for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        const [barOneIdx, barTwoIdx, barOneHeight, barTwoHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        
        setTimeout(() => {
            // Highlight bars being compared with secondary color
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;
            
            // After a delay, revert back to primary color
            setTimeout(() => {
                barOneStyle.height = `${barTwoHeight}px`;
                barTwoStyle.height = `${barOneHeight}px`;
                barOneStyle.backgroundColor = this.state.primary_color;
                barTwoStyle.backgroundColor = this.state.primary_color;
            }, this.state.AnimationSpeed / 2); // Adjust timing as needed
        }, i * this.state.AnimationSpeed);
    }
}



  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  handleChangeNumberOfBars = (event) => {
    const numberOfBars = parseInt(event.target.value);
    this.setState({numberOfBars});
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.display = 'none';
    }
}
  handleAnimationSpeed = (event) => {
    const AnimationSpeed = parseInt(event.target.value);
    this.setState({AnimationSpeed});
  }

  handleColor = (event) => {
    // Show color picker and set the selected array-bar index
    const primary_color = event.target.value;
    this.setState({primary_color});
  }

  colorpicker = (event) => {
    const colorpicker = document.getElementsByClassName('colorpicker');
    colorpicker.style.display = 'block';
  }


  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        <div className='buttons'>
            <button onClick={() => this.resetArray()}>Generate New Array</button>
            <button onClick={() => this.mergeSort()}>Merge Sort</button>
            <button onClick={() => this.quickSort()}>Quick Sort</button>
            <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <label htmlFor='arraybars'>No of Bars - {this.state.numberOfBars}</label>
            <input type="range" id ='arraybars' name='NO OF BARS' min='5' max='200' value={this.state.numberOfBars} onChange={this.handleChangeNumberOfBars} />
            
            <label htmlFor='animationspeed'>Animation speed {this.state.AnimationSpeed}ms</label> 
            <input type="range" id ='animationspeed' name='Animation speed' min='5' max='200' value={this.state.AnimationSpeed} onChange={this.handleAnimationSpeed} />
            
        </div>

        <div>
            
        </div>
        
      <div className='array-bar-container'>
        <input className='colorpicker' type="color" value={this.state.primary_color} onChange={this.handleColor} />
        {array.map((value, idx) => (
          <div
            className="array-bar" onClick={this.colorpicker}
            key={idx}
            style={{
              backgroundColor: this.state.primary_color,
              height: `${value}px`,
            }}></div>
        ))}
        </div>
        
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}