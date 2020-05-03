import React, { Component, Fragment }from 'react';
import axios from 'axios'
import logo from './unmindLogo.png';
import './App.scss';

import { API_ENDPOINT } from './config'

import MoodCheckIn, { CheckInData } from './containers/MoodCheckIn'

class App extends Component {
  constructor(props: any) {
    super(props)
  }

  _processAndSendCheckIn = async (data: CheckInData) => {
    try {
      await axios.post(`${API_ENDPOINT}/checkin`, data)
    } catch (err) {
      console.error(err)
    }
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
        <MoodCheckIn onCompleteCallback={this._processAndSendCheckIn}/>
      </Fragment>
    )
  }
}

export default App;
