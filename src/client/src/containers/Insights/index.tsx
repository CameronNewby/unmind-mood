import React from 'react'
import axios from 'axios'

import { API_ENDPOINT } from '../../config'

// Component Imports
import { CheckInData } from '../MoodCheckIn'
import Item from '../../components/insight/Item'
import Header from '../../components/insight/Header'

// Style Imports
import './Insights.scss'

// Types & Interfaces
interface Props {}
interface State {
  userId: number
  checkIns: CheckInData[]
  expanded: number | boolean
}

export default class Insights extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      userId: 1,
      checkIns: [],
      expanded: false,
    }
  }

  // Lifecycle Hooks
  async componentDidMount() {
    try {
      const checkIns = await axios.get<CheckInData[]>(`${API_ENDPOINT}/checkin/${this.state.userId}`)
      console.log(checkIns)
      this.setState({ checkIns: checkIns.data })
    } catch (err) {
      console.error(err)
    }
  }

  // Event Handlers
  onPanelChange = (expandedPanel: number | boolean) => {
    this.setState({ expanded: expandedPanel })
  }

  render() {
    return (
      <div className="insightContainer">
        <div className="chartContainer">
          <Header checkIns={this.state.checkIns}></Header>
        </div>
        {this.state.checkIns.map((item, idx) => (
          <Item item={item} idx={idx} expanded={this.state.expanded} onChange={this.onPanelChange} />
        ))}
      </div>
    )
  }
}
