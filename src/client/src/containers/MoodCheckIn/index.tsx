import React from 'react'
import axios from 'axios'

import { API_ENDPOINT } from '../../config'

// Component Imports
import Mood from '../../components/form/Mood'
import Feeling from '../../components/form/Feeling'
import Comment from '../../components/form/Comment'

// Style Imports
import './MoodCheckIn.scss'

// Types & Interfaces
interface Props {
  onCompleteCallback(): void
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

  onMoodCallback = (mood: number) => {
    this.setState({ ...this.state, mood: { value: mood, show: false }, feeling: { ...this.state.feeling, show: true } })
  }

  onFeelingCallback = (feelings: string[]) => {
    this.setState({
      ...this.state,
      feeling: { value: feelings, show: false },
      comment: { ...this.state.comment, show: true },
    })
  }

  onCommentCallback = (comment: string) => {
    let finalState = { ...this.state, comment: { value: comment, show: false } }
    this.setState(finalState)

    console.log('Finish', finalState)
    this._processAndSendCheckIn(finalState)
    this.props.onCompleteCallback()
  }

  _processAndSendCheckIn = async (state: State) => {
    interface CheckInData {
      userId: number
      mood: number
      feelings: string[]
      comment: string
    }

    const data: CheckInData = {
      userId: 1,
      mood: state.mood.value,
      feelings: state.feeling.value,
      comment: state.comment.value
    }

    try {
      await axios.post(`${API_ENDPOINT}/checkin`, data)
    } catch (err) {
      console.error(err)
    }
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
