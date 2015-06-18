import React from 'react';
import {Ease, Chain} from './src';

let styles = {};

styles.app = {
  box: {
    width: 100,
    height: 100,
    left: 0,
    top: 0,
    position: 'absolute',
    backgroundColor: 'red'
  }
};

export const App = React.createClass({
  render() {
    return (
      <div>
        <Ease from={{top: 0, left: 0}} to={{top: 400, left: 400}} ease='easeOutElastic' duration={3000}>
          {val => <div style={{...styles.app.box, ...val}}></div>}
        </Ease>
        <Chained/>
      </div>
    );
  }
});

styles.chained = {
  box: {
    width: 100,
    height: 100,
    left: 0,
    top: 0,
    position: 'absolute',
    backgroundColor: 'blue'
  }
};


export const Chained = React.createClass({
  render() {
    return (
      <div>
        <Chain sequence={[
          {from: {left: 0, top: 0, opacity: 1}, to: {left: 100, top: 100}},
          {from: {left: 50}, to: {top: 50}, ease: 'easeOutCubic'},
          {to: {opacity: 0}, duration: 500, delay: 400},
          {to: {opacity: 0.8}}]} repeat={3}>
            {(val, done) => <div style={val}>sweet! {done ? 'done!' : 'running...'}</div>}
        </Chain>
      </div>
    );
  }
});



// export const path = [
//   '10',
//   '5',
//   '5',
//   '3',
//   '2'
// ];

// function toXY(i){
//   return {
//     start: {},
//     end: {},
//     duration:
//   }
// }

// path.map( (p, i) => {
//   let pt = toXY(i);
//   <Chain sequence={[
//     {from: {}}
//   ]}>

//   </Chain>
// });





