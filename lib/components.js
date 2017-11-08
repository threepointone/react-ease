'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = components;

var _ease = require('./ease');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var noop = function noop() {};

function components(React) {

  var Ease = createReactClass({
    displayName: 'Ease',

    propTypes: {
      // from: PropTypes.number,
      // to: PropTypes.number,
      duration: PropTypes.number,
      // ease: easings[easings.default],
      repeat: PropTypes.number,
      onProgress: PropTypes.func,
      delay: PropTypes.number,
      children: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
      return _ease.defaults;
    },
    shouldComponentUpdate: function shouldComponentUpdate() {
      return true;
    },

    getInitialState: function getInitialState() {
      return {
        value: this.props.from,
        done: false
      };
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      this.ease = new _ease.Easing(_extends({}, this.props, { onProgress: function onProgress(value, done) {
          _this.setState({ value: value, done: done });
          _this.props.onProgress(value, done);
        } }));
    },
    componentWillUnmount: function componentWillUnmount() {
      this.ease.cancel();
      delete this.ease;
    },
    render: function render() {
      return this.props.children(this.state.value, this.state.done);
    }
  });

  var Chain = createReactClass({
    displayName: 'Chain',

    getDefaultProps: function getDefaultProps() {
      return {
        onProgress: noop,
        repeat: 1
      };
    },
    propTypes: {
      sequence: PropTypes.array,
      children: PropTypes.func,
      onProgress: PropTypes.func
    },
    getInitialState: function getInitialState() {
      var props = this.props.sequence[0];
      return {
        index: 0,
        done: false,
        value: props.from,
        from: props.from,
        to: typeof props.to === 'number' ? props.to : _extends({}, props.from, props.to)
      };
    },

    shouldComponentUpdate: function shouldComponentUpdate() {
      return true;
    },
    onProgress: function onProgress(value, done) {
      this.props.onProgress(this.state.index, value, done);

      if (done) {
        var _length = this.props.repeat * this.props.sequence.length;
        var allDone = this.state.index === _length - 1;
        var props = this.props.sequence[(this.state.index + 1) % this.props.sequence.length] || {};
        var mergeable = typeof value !== 'number' && !allDone;
        this.setState({
          index: allDone ? this.state.index : this.state.index + 1,
          done: allDone,
          value: value,
          from: mergeable ? _extends({}, value, props.from || {}) : props.from !== undefined ? props.from : value,
          to: mergeable ? _extends({}, value, props.to || {}) : props.to
        });
      }
    },
    render: function render() {
      var _this2 = this;

      var props = this.props.sequence[this.state.index % this.props.sequence.length];
      var fn = function fn(val) {
        return _this2.props.children(val, _this2.state.done);
      };
      return this.state.done ? fn(this.state.value, true) : React.createElement(
        Ease,
        _extends({}, props, { key: this.state.index, onProgress: this.onProgress, from: this.state.from, to: this.state.to }),
        fn
      );
    }
  });

  return { Ease: Ease, Chain: Chain };
}

module.exports = exports['default'];