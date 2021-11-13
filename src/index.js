import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { connect, Provider, Store } from "./mini-redux";

const getRandomRGB = () => {
  const o = Math.round,
    r = Math.random,
    s = 255;
  return `rgb(${o(r() * s)},${o(r() * s)},${o(r() * s)})`;
};

const Scene = ({ children }) => (
  <div className="scene">
    <div className="sky" />
    <div className="ground" />
    {children}
  </div>
);

const RocketIcon = props => (
  <span {...props} className="rocket">
    <svg id="icon-rocket" viewBox="0 0 20 20">
      <path d="M14.607 18.456c0 0 0.209-1.258-1.082-2.793 1.257-3.526 1.431-6.736 1.431-6.736s2.583 0.594 2.583 3.141c-0.001 4.363-2.932 6.388-2.932 6.388zM7.487 16.924c0 0-1.73-5.552-1.73-7.855 0-1.036 0.117-1.958 0.299-2.795h7.881c0.183 0.838 0.301 1.76 0.301 2.796 0 2.268-1.725 7.854-1.725 7.854h-5.026zM9.994 7.543c-0.886 0-1.605 0.719-1.605 1.606s0.719 1.606 1.605 1.606c0.887 0 1.606-0.719 1.606-1.606s-0.719-1.606-1.606-1.606zM9.649 0.372v-2.186h0.625v2.131c0.714 0.52 2.648 2.174 3.522 5.359h-7.6c0.845-3.098 2.685-4.734 3.453-5.304zM5.393 18.456c0 0-2.932-2.025-2.932-6.388 0-2.547 2.583-3.141 2.583-3.141s0.174 3.211 1.431 6.736c-1.292 1.536-1.082 2.793-1.082 2.793zM11.057 18.778l-0.524-0.524-0.558 1.746-0.664-1.746-0.454 0.907-0.664-1.641h3.595l-0.732 1.258z" />
    </svg>
  </span>
);

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_COLOR":
      return {
        ...state,
        color: getRandomRGB()
      };
    default:
      return state;
  }
};

const initialState = {
  color: "red"
};

const store = new Store(reducer, initialState);

class RocketStation extends React.Component {
  render() {
    return (
      <div className="App">
        <Scene>
          <RocketIcon style={{ fill: this.props.color }} />
        </Scene>
        <button
          className="button button--navy"
          onClick={this.props.changeColor}
        >
          Change rocket color
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({ color: state.color });
const mapDispatchToProps = dispatch => ({
  changeColor: () => dispatch({ type: "CHANGE_COLOR" })
});

const ConnectedRocketStation = connect(
  mapStateToProps,
  mapDispatchToProps
)(RocketStation);

function App() {
  return (
    <Provider store={store}>
      <ConnectedRocketStation />
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
