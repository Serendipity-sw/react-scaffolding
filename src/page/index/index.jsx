import React from 'react';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import './index.pcss';
import style from './index.pcss.json';

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
        <div className={ style.home }>
          <span key={ this.state.name }>{ this.state.name }</span>
          <div className={ 'sex' }>
            <span>3</span><span>3</span><span>3</span>
          </div>
          <span className={ style.init }>asdf</span>
          <button onClick={ this.buttonClick }>确定</button>

          <div className={ style.iconDog }>321</div>
          <div className={ style.iconTiger }>543</div>
          <div className={ style.iconLien }>9887</div>
        </div>
      </HashRouter>
    );
  }
}

export default Index;
