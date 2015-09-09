import {Easing, defaults} from './ease';

let noop = () => {};

export default function components(React){

  const Ease = React.createClass({
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
    getDefaultProps() {
      return defaults;
    },
    shouldComponentUpdate() {
      return true;
    },

    getInitialState() {
      return {
        value: this.props.from,
        done: false
      };
    },
    componentDidMount() {
      this.ease = new Easing({...this.props, onProgress: (value, done) => {
        this.setState({value, done});
        this.props.onProgress(value, done);
      }});
    },
    componentWillUnmount() {
      this.ease.cancel();
      delete this.ease;
    },
    render() {
      return this.props.children(this.state.value, this.state.done);
    }
  });

  const Chain = React.createClass({
    getDefaultProps(){
      return {
        onProgress: noop,
        repeat: 1
      };
    },
    propTypes: {
      sequence: React.PropTypes.array,
      children: React.PropTypes.func,
      onProgress: React.PropTypes.func
    },
    getInitialState() {
      let props = this.props.sequence[0];
      return {
        index: 0,
        done: false,
        value: props.from,
        from: props.from,
        to: typeof props.to === 'number' ? props.to : {...props.from, ...props.to}
      };
    },

    shouldComponentUpdate(){
      return true;
    },
    onProgress(value, done){
      this.props.onProgress(this.state.index, value, done);

      if(done){
        let length = this.props.repeat * this.props.sequence.length;
        let allDone = this.state.index === (length - 1);
        let props = this.props.sequence[((this.state.index + 1) % this.props.sequence.length)] || {};
        let mergeable = ((typeof value !== 'number') && !allDone);
        this.setState({
          index: allDone ? this.state.index : this.state.index + 1,
          done: allDone,
          value: value,
          from: mergeable ? {...value, ...(props.from || {})} : (props.from !== undefined ? props.from : value),
          to: mergeable ? {...value, ...(props.to || {})} : props.to
        });
      }
    },
    render(){
      let props = this.props.sequence[this.state.index % this.props.sequence.length];
      let fn = val => this.props.children(val, this.state.done);
      return this.state.done ?
        fn(this.state.value, true) :
        <Ease {...props} key={this.state.index} onProgress={this.onProgress} from={this.state.from} to={this.state.to}>
          {fn}
        </Ease>;
    }
  });

  return {Ease, Chain};

}
