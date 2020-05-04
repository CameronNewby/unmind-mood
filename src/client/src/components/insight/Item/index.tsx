import React from 'react'
import moment from 'moment'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Component Imports
import Moody from '../../shared/Moody'
import Button from '../../shared/Button'
import { CheckInData } from '../../../containers/MoodCheckIn'

// Style Imports
import './Item.scss'

// Types & Interfaces
interface ItemProps {
  item: CheckInData
  idx: number
  expanded: number | boolean
  onChange(expandedPanel: number | boolean): void
}

export const Item: React.FC<ItemProps> = (props) => {
  const onPanelChange = (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    props.onChange(isExpanded ? props.idx : false)
  }

  return (
    <ExpansionPanel expanded={props.expanded === props.idx} onChange={onPanelChange}>
      <ExpansionPanelSummary expandIcon={<FontAwesomeIcon icon="angle-down" />}>
        <div className="dateMonth">{moment(props.item.createdAt).format('DD MMM')}</div>
        <div className="dateTime">{moment(props.item.createdAt).format('HH:mm')}</div>
        <div className="moodFace">
          <Moody moodRange={props.item.mood} />
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className="expandedContent">
          <div className="feelingsContainer">
            {props.item.feelings.map((feeling: string, idx: number) => (
              <Button key={idx} text={feeling} disabled={true} />
            ))}
          </div>
          <div className="commentsContainer">{props.item.comment}</div>
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

export default Item
