import React, { Component, Fragment }from 'react';
import axios from 'axios'
import logo from './unmindLogo.png';
import './App.scss';

import { API_ENDPOINT } from './config'

import MoodCheckIn, { CheckInData } from './containers/MoodCheckIn'
import Insights from './containers/Insights'

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
            <img src={logo} className="appLogo" alt="Unmind" />
          </div>
        </div>
        <Insights />
      </Fragment>
    )
  }
}

export default App;
