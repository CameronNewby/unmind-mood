import React from 'react'
import axios from 'axios'
import moment from 'moment'

import { API_ENDPOINT } from '../../config'

// Component Imports
import { CheckInData } from '../MoodCheckIn'
import Item from '../../components/insight/Item'
import Header from '../../components/insight/Header'

// Style Imports
import './Insights.scss'

// Types & Interfaces
interface State {
  userId: number
  checkIns: CheckInData[]
  expanded: number | boolean
}

export default class Insights extends React.Component<{}, State> {
  constructor(props: {}) {
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
      this.setState({ checkIns: checkIns.data })
    } catch (err) {
      console.error(err)
    }
  }

  // Event Handlers
  onPanelChange = (expandedPanel: number | boolean): void => {
    this.setState({ expanded: expandedPanel })
  }

  // Private Methods
  _sortCheckInsByDate = (a: CheckInData, b: CheckInData): number => {
    return moment(b.createdAt).diff(moment(a.createdAt))
  }

  render() {
    return (
      <div className="insightContainer">
        <div className="chartContainer">
          <Header checkIns={this.state.checkIns}></Header>
        </div>
        <div className="listContainer">
          {this.state.checkIns.sort(this._sortCheckInsByDate).map((item, idx) => (
            <Item key={idx} item={item} idx={idx} expanded={this.state.expanded} onChange={this.onPanelChange} />
          ))}
        </div>
      </div>
    )
  }
}
