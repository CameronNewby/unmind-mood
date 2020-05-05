import React from 'react'

// Component Imports
import Moody from '../../shared/Moody'
import Range from '../../shared/Range'
import Button from '../../shared/Button'

// Style Imports
import './Mood.scss'

// Types & Interfaces
interface Props {
  onCompleteCallback(mood: number): void
}

interface State {
  moodRange: number
}

export default class Mood extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      moodRange: 4,
    }
  }

  // Event Handlers
  onMoodRangeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ moodRange: parseInt(e.target.value) })
  }

  onNavigationClick = () => {
    this.props.onCompleteCallback(this.state.moodRange)
  }

  render() {
    return (
      <div className="moodContainer">
        <Moody moodRange={this.state.moodRange} />
        <div className="moodRange">
          <Range value={this.state.moodRange} min={1} max={7} onChange={this.onMoodRangeChange} />
        </div>
        <div className="navigationButtons">
          <Button text="Next" toggle={true} onClick={this.onNavigationClick} />
        </div>
      </div>
    )
  }
}
