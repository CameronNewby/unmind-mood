import React from 'react'

// Component Imports
import Mood from '../../components/form/Mood'
import Feeling from '../../components/form/Feeling'
import Comment from '../../components/form/Comment'

// Style Imports
import './MoodCheckIn.scss'

// Types & Interfaces
export interface CheckInData {
  userId: number
  mood: number
  feelings: string[]
  comment: string
  id?: number
  createdAt?: string
}

interface FormSteps {
  show: boolean
}

interface MoodStep extends FormSteps {
  value: number
}

interface FeelingStep extends FormSteps {
  value: string[]
}

interface CommentStep extends FormSteps {
  value: string
}

interface State {
  mood: MoodStep
  feeling: FeelingStep
  comment: CommentStep
}

interface Props {
  onCompleteCallback(data: CheckInData): void
}

export default class MoodCheckIn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      mood: {
        value: 0,
        show: true,
      },
      feeling: {
        value: [],
        show: false,
      },
      comment: {
        value: '',
        show: false,
      },
    }
  }

  // Event Handlers
  onMoodCallback = (mood: number): void => {
    this.setState({ ...this.state, mood: { value: mood, show: false }, feeling: { ...this.state.feeling, show: true } })
  }

  onFeelingCallback = (feelings: string[]): void => {
    this.setState({
      ...this.state,
      feeling: { value: feelings, show: false },
      comment: { ...this.state.comment, show: true },
    })
  }

  onCommentCallback = async (comment: string) => {
    const finalState = { ...this.state, comment: { value: comment, show: false } }
    this.setState(finalState)

    const data: CheckInData = {
      userId: 1,
      mood: finalState.mood.value,
      feelings: finalState.feeling.value,
      comment: finalState.comment.value,
    }

    this.props.onCompleteCallback(data)
  }

  render() {
    return (
      <div className="widgetContainer">
        {this.state.mood.show && <Mood onCompleteCallback={this.onMoodCallback} />}
        {this.state.feeling.show && <Feeling onCompleteCallback={this.onFeelingCallback} />}
        {this.state.comment.show && <Comment onCompleteCallback={this.onCommentCallback} />}
      </div>
    )
  }
}
