import React, { Fragment } from 'react'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleDown, faBars } from '@fortawesome/free-solid-svg-icons'
import Typist from 'react-typist'
import logo from './unmindLogo.png'

import { API_ENDPOINT } from './config'

// Style Imports
import './App.scss'

// Container Imports
import MoodCheckIn, { CheckInData } from './containers/MoodCheckIn'
import Insights from './containers/Insights'

// Component Imports
import Button from './components/shared/Button'

library.add(faAngleDown, faBars)

interface State {
  checkIn: boolean
  insights: boolean
}
class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { checkIn: false, insights: false }
  }

  // Event Handlers
  _processAndSendCheckIn = async (data: CheckInData) => {
    try {
      await axios.post(`${API_ENDPOINT}/checkin`, data)
      this._clearState()
    } catch (err) {
      console.error(err)
    }
  }

  _clearState = (): void => {
    this.setState({ ...this.state, checkIn: false, insights: false })
  }

  _checkIn = (): void => {
    this.setState({ ...this.state, checkIn: true, insights: false })
  }

  _insights = (): void => {
    this.setState({ ...this.state, insights: true, checkIn: false })
  }

  render() {
    const _renderSplashScreen = () => {
      if (!this.state.checkIn && !this.state.insights) {
        return (
          <div className="splashScreenContainer">
            <div className="typewriter">
              <Typist cursor={{ element: '' }}>
                <h1>Take some time to reflect upon how you are feeling today.</h1>
              </Typist>
            </div>
          </div>
        )
      } else {
        return
      }
    }

    return (
      <Fragment>
        <div className="navBar">
          <div className="navBarContent">
            <img src={logo} className="appLogo" alt="Unmind" onClick={this._clearState} />
            {!this.state.checkIn && <Button text="Check In Mood" onClick={this._checkIn} />}
            {!this.state.insights && <Button text="Insights" onClick={this._insights} />}
          </div>
        </div>

        {this.state.checkIn && <MoodCheckIn onCompleteCallback={this._processAndSendCheckIn} />}
        {this.state.insights && <Insights />}

        {_renderSplashScreen()}
      </Fragment>
    )
  }
}

export default App
