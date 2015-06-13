(work in progress, looking for feedback)

react-ease
---

back to first principles

`npm install react-ease react --save`

canned animations for [react](https://facebook.github.io/react/)/[react-native](https://facebook.github.io/react-native/)

```js
// output floats from 0 to 100 over 0.5 seconds
<Ease from={0} to={100} duration={500}>
  {val => <div>{val}</div>}     // yes, children is a function
</Ease>

// you can tell when it's done
<Ease from={0} to={100} duration={500} delay={500}>
  {(val, done) => <div>animation {done ? 'over!' : 'running...'}</div>}
</Ease>

// you can ease multiple values at once
<Ease from={{left: 0, top: 0}} to={{left: 100, top: 100}} ease='easeInElastic'>
  {val => <div style={val}>move it, move it</div>}
</Ease>

// or if you want more control over each value
<Ease from={0} to={100} duration={500}>
  {x =>
    <Ease from={0} to={100} duration={200} onProgress={::console.log}>
      {y =>
      <div style={{left: x, top: y}}>not bad!</div>}
    </Ease>}
</Ease>

// finally, you can chain a bunch of them together
<Chain sequence={[
  {from: {left: 0, top: 0, opacity: 1}, to: {left: 100, top: 100}},
  {from: {left: 50}, to: {top: 50}, ease: 'easeOutCubic'},
  {to: {opacity: 0}, duration: 500, delay: 200}]} onProgress={(i, val, done) => done && console.log('done!')}>
    {(val, done) => <div style={val}>sweet!</div>}
</Chain>


```

props
---

- from: *number*/*object*
- to: *number*/*object*
- duration: *number* (ms)
- ease: *string*/*function* `./src.js` has a list of available easing functions, or pass in your own
- delay: *number* (ms)
- onProgress: *function* - optional callback called on every 'movement'. 'returns' the current value, and a `done` flag
- TODO - repeat: *number*

thanks
---
- [ease-sential](https://github.com/WebReflection/ease-sential), of which react-ease contains a tweaked port

