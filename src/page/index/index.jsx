import React from 'react';
import { HashRouter, NavLink, Route } from 'react-router-dom';

class Index extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      name: 'props.name'
    };
  }

  buttonClick = () => {
    this.setState({ name: `name${ new Date() }` });
  };

  render () {
    return (
      <HashRouter>
        <div>
          <span key={ this.state.name }>{ this.state.name }</span>
          <button onClick={ this.buttonClick }>确定</button>
        </div>
      </HashRouter>
    );
  }
}

export default Index;
