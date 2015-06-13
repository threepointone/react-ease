'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var React;
try {
  React = require('react-native');
} catch (e) {
  React = require('react');
}
// the above bit should get better after https://github.com/facebook/react/issues/3220

// pick up raf
var root = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : undefined;
var raf = root.requestAnimationFrame || root.webkitRequestAnimationFrame || root.mozRequestAnimationFrame || root.msRequestAnimationFrame || function (fn) {
  return setTimeout(fn, 10);
};

exports.raf = raf;
var noop = function noop() {};

// penner's easing equations
var easings = {
  'default': 'easeOutQuad',
  swing: function swing(t, b, c, d) {
    return easings[easings['default']](t, b, c, d);
  },
  easeInQuad: function easeInQuad(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function easeOutQuad(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function easeInOutQuad(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t + b;
    }
    return -c / 2 * (--t * (t - 2) - 1) + b;
  },
  easeInCubic: function easeInCubic(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function easeOutCubic(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function easeInOutCubic(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart: function easeInQuart(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function easeOutQuart(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t + b;
    }
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint: function easeInQuint(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function easeOutQuint(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function easeInOutQuint(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return c / 2 * t * t * t * t * t + b;
    }
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine: function easeInSine(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function easeOutSine(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: function easeInOutSine(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo: function easeInExpo(t, b, c, d) {
    return t === 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function easeOutExpo(t, b, c, d) {
    return t === d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo: function easeInOutExpo(t, b, c, d) {
    if (t === 0) {
      return b;
    }
    if (t === d) {
      return b + c;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    }
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function easeInCirc(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function easeOutCirc(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function easeInOutCirc(t, b, c, d) {
    if ((t /= d / 2) < 1) {
      return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    }
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: function easeInElastic(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t === 0) {
      return b;
    }
    if ((t /= d) === 1) {
      return b + c;
    }
    if (!p) {
      p = d * 0.3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic: function easeOutElastic(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t === 0) {
      return b;
    }
    if ((t /= d) === 1) {
      return b + c;
    }
    if (!p) {
      p = d * 0.3;
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic: function easeInOutElastic(t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t === 0) {
      return b;
    }
    if ((t /= d / 2) === 2) {
      return b + c;
    }
    if (!p) {
      p = d * (0.3 * 1.5);
    }
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    if (t < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    }
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
  },
  easeInBack: function easeInBack(t, b, c, d, s) {
    if (s === undefined) {
      s = 1.70158;
    }
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function easeOutBack(t, b, c, d, s) {
    if (s === undefined) {
      s = 1.70158;
    }
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function easeInOutBack(t, b, c, d, s) {
    if (s === undefined) {
      s = 1.70158;
    }
    if ((t /= d / 2) < 1) {
      return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    }
    return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  },
  easeInBounce: function easeInBounce(t, b, c, d) {
    return c - easings.easeOutBounce(d - t, 0, c, d) + b;
  },
  easeOutBounce: function easeOutBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },
  easeInOutBounce: function easeInOutBounce(t, b, c, d) {
    if (t < d / 2) {
      return easings.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
    }
    return easings.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
  }
};

exports.easings = easings;
var defaults = {
  from: 0,
  to: 0,
  duration: 1000,
  ease: easings[easings['default']],
  repeat: 1,
  onProgress: noop,
  delay: 0
};

exports.defaults = defaults;
// to avoid an assign polyfill
function assign(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

// animation class
// - from: *number*/*object*
// - to: *number*/*object*
// - duration: *number* (ms)
// - ease: *string*/*function* `./src.js` has a list of available easing functions, or pass in your own
// - delay: *number* (ms)
// - onProgress: *function* - optional callback called on every 'movement'. 'returns' the current value, and a `done` flag

var Easing = (function () {
  function Easing(config) {
    var _this = this;

    _classCallCheck(this, Easing);

    assign(this, _extends({}, defaults, config));
    this.easing = typeof this.ease === 'function' ? this.ease : easings[this.ease || easings['default']];

    this.update = typeof this.from === 'object' ? this.loopProperties : this.directUpdate;

    this.start = Date.now() + this.delay;
    this.end = this.start + this.duration;
    this.canceled = false;
    this.progress = this.progress.bind(this);

    if (this.delay) {
      setTimeout(function () {
        return raf(_this.progress);
      }, this.delay);
    } else {
      raf(this.progress);
    }
  }

  _createClass(Easing, [{
    key: 'directUpdate',
    value: function directUpdate(from, to, easing, current, duration) {
      return easing(current, from, to - from, duration);
    }
  }, {
    key: 'loopProperties',
    value: function loopProperties(from, to, easing, current, duration) {
      var k,
          o = {};
      for (k in from) {
        o[k] = easing(current, from[k], to[k] - from[k], duration);
      }
      return o;
    }
  }, {
    key: 'progress',
    value: function progress() {
      if (this.canceled) {
        return;
      }
      this.time = Date.now();
      if (this.end <= this.time) {
        this.onProgress(this.to, true);
      } else {
        this.onProgress(this.update(this.from, this.to, this.easing, this.time - this.start, this.duration));
        raf(this.progress);
      }
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.canceled = true;
    }
  }]);

  return Easing;
})();

exports.Easing = Easing;
var Ease = React.createClass({
  displayName: 'Ease',

  propTypes: {
    // from: React.PropTypes.number,
    // to: React.PropTypes.number,
    duration: React.PropTypes.number,
    // ease: easings[easings.default],
    repeat: React.PropTypes.number,
    onProgress: React.PropTypes.func,
    delay: React.PropTypes.number,
    children: React.PropTypes.func
  },
  getDefaultProps: function getDefaultProps() {
    return defaults;
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
    var _this2 = this;

    this.ease = new Easing(_extends({}, this.props, { onProgress: function onProgress(value, done) {
        _this2.setState({ value: value, done: done });
        _this2.props.onProgress(value, done);
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

exports.Ease = Ease;
var Chain = React.createClass({
  displayName: 'Chain',

  getDefaultProps: function getDefaultProps() {
    return {
      onProgress: noop
    };
  },
  propTypes: {
    sequence: React.PropTypes.array,
    children: React.PropTypes.func,
    onProgress: React.PropTypes.func
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
      var allDone = this.state.index === this.props.sequence.length - 1;
      var props = this.props.sequence[this.state.index + 1] || {};
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
    var _this3 = this;

    var props = this.props.sequence[this.state.index];
    var fn = function fn(val) {
      return _this3.props.children(val, _this3.state.done);
    };
    return this.state.done ? fn(this.state.value, true) : React.createElement(
      Ease,
      _extends({}, props, { key: this.state.index, onProgress: this.onProgress, from: this.state.from, to: this.state.to }),
      fn
    );
  }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
exports.Chain = Chain;
