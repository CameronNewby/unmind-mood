import React, { Component, Fragment }from 'react';
import logo from './unmindLogo.png';
import './App.scss';

class App extends Component {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <Fragment>
        <div className="navBar">
          <div className="navBarContent">
            <i className="fa fa-bars"></i>
            <img src={logo} className="appLogo" alt="Unmind" />
          </div>
        </div>
      </Fragment>
    )
  }
}

export default App;
