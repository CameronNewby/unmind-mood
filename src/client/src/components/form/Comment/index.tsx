import React from 'react'

// Component Imports
import Button from '../../shared/Button'

// Style Imports
import './Comment.scss'

// Types & Interfaces
interface Props {
  onCompleteCallback(comment: string): void
}

interface State {
  comment: string
}

export default class Comment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      comment: '',
    }
  }

  // Event Handlers
  onNavigationClick = (e: React.MouseEvent<HTMLButtonElement>, text: string) => {
    console.log(text)
    console.log(this.state.comment)
    this.props.onCompleteCallback(this.state.comment)
  }

  onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ comment: e.target.value })
  }

  render() {
    return (
      <div className="commentContainer">
        <textarea
          rows={10}
          placeholder="Tell us more about how you are feeling today..."
          onChange={this.onTextChange}
        />
        <div className="navigationButtons">
          <Button text="Finish" toggle={true} onClick={this.onNavigationClick} />
        </div>
      </div>
    )
  }
}
