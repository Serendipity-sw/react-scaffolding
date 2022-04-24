import React from 'react';
import {HashRouter, NavLink, Route} from 'react-router-dom';
import style from './index.pcss';
import nihaosdf from './images/login-bg.png';

class Index extends React.Component {
  state = {
    name: this.props.nihao,
    list: {
      name: '1aaaaaaaaaaaaaaaaaaaa23',
      sex: '男',
      age: 12,
      testList: [{name: 'ios', age: 12, sex: '男'}, {name: 'ios', age: 15, sex: '男'}]
    },
  };

  componentDidMount() {
    console.log(this.state.list?.testList.find(item => item.age === 15)?.name)
    console.log(this.props.nihao)
  }

  buttonClick = () => {
    debugger
    let {name, ...z} = this.state.list;
    console.log(z);
    this.setState({name: `name${new Date()}`, list: {...this.state.list, sex: '女wwww'}});
  };

  render() {
    return (
      <div className={style.home}>
        <span key={this.state.name}>{this.state.name}asdfa</span>
        <img src={nihaosdf} alt=""/>
        <div className={'sex'}>
          <span>3</span><span>3</span><span>3</span>
        </div>
        <span className={style.init}>asdf</span>
        <button {...this.state} onClick={this.buttonClick}>确定</button>

        <div className={style.iconDog}>321</div>
        <div className={style.iconTiger}>543</div>
        <div className={style.iconLien}>{JSON.stringify(this.state.list)}</div>
      </div>
    );
  }
}

export default Index;
