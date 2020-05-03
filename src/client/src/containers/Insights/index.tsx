import React from 'react'

// Component Imports
import Mood from '../../components/form/Mood'

// Style Imports
import './Insights.scss'

// Types & Interfaces
interface Props {}
interface State {}

export default class Insights extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="insightContainer"></div>
    )
  }
}
