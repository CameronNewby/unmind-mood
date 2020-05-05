import React from 'react'

// Component Imports
import Button from '../../shared/Button'

// Style Imports
import './Feeling.scss'

// Types & Interfaces
interface Props {
  onCompleteCallback(feelings: string[]): void
}

interface State {
  selectedFeelings: string[]
}

// Constantants
const feelings = ['Depressed', 'Optimistic', 'Bored', 'Happy', 'Content', 'Anxious', 'Excited', 'Angry', 'Stressed']
const toggleFeeling = (list: string[], feeling: string) =>
  list.includes(feeling) ? list.filter((i: string) => i !== feeling) : [...list, feeling]

export default class Feeling extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedFeelings: [],
    }
  }

  // Event Handlers
  onFeelingButtonClick = (e: React.MouseEvent<HTMLButtonElement>, feeling: string): void => {
    this.setState({ selectedFeelings: toggleFeeling(this.state.selectedFeelings, feeling) })
  }

  onNavigationClick = () => {
    this.props.onCompleteCallback(this.state.selectedFeelings)
  }

  render() {
    return (
      <div className="feelingContainer">
        <div className="feelingList">
          {feelings.map((item: string, idx: number) => (
            <div key={idx}>
              <Button text={item} toggle={true} onClick={this.onFeelingButtonClick} />
            </div>
          ))}
        </div>
        <div className="navigationButtons">
          <Button text="Next" toggle={true} onClick={this.onNavigationClick} />
        </div>
      </div>
    )
  }
}
