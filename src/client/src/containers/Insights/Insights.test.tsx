import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import moment from 'moment'

import Insights from './index'

configure({ adapter: new Adapter() })

describe('Insights', () => {
  let wrapper, mock, checkInData

  mock = new MockAdapter(axios)

  beforeEach(() => {
    // Setup axios mocks
    checkInData = [
      {
        id: 1,
        userId: 1,
        mood: 1,
        feelings: ['Happy', 'Sad'],
        comment: 'Feeling mixed today',
        createdAt: '2020-04-01T14:16:30.000Z',
      },
      {
        id: 2,
        userId: 1,
        mood: 6,
        feelings: ['Anxious'],
        comment: '',
        createdAt: '2020-04-23T14:16:30.000Z',
      },
    ];

    mock.onGet('http://localhost:3001/checkin/1').reply(200, checkInData)

    wrapper = shallow(<Insights />)

    // Spy on the event handlers
    jest.spyOn(wrapper.instance(), 'onPanelChange')

    // Spy on the methods
    jest.spyOn(wrapper.instance(), '_sortCheckInsByDate')
  })

  it('component mounts and sets users check ins', async (done) => {
    await wrapper.instance().componentDidMount()
    expect(wrapper.state()).toHaveProperty('checkIns', [
      {
        comment: '',
        createdAt: '2020-04-23T14:16:30.000Z',
        feelings: ['Anxious'],
        id: 2,
        mood: 6,
        userId: 1,
      },
      {
        comment: 'Feeling mixed today',
        createdAt: '2020-04-01T14:16:30.000Z',
        feelings: ['Happy', 'Sad'],
        id: 1,
        mood: 1,
        userId: 1,
      },
    ])

    done()
  })

  it('simulate expansion panel change to match panel id', async () => {
    await wrapper.instance().componentDidMount()

    // Simulate appiontment type select click
    wrapper.instance().onPanelChange(1)
    expect(wrapper.state('expanded')).toBe(1)
  })

  it('simulate expansion panel change to match boolean none open', async () => {
    await wrapper.instance().componentDidMount()

    // Simulate appiontment type select click
    wrapper.instance().onPanelChange(false)
    expect(wrapper.state('expanded')).toBe(false)
  })

  it('it orders given check in array chronologically', async () => {
    await wrapper.instance().componentDidMount()
    let data = [...checkInData]
    let ordered = data.sort(wrapper.instance()._sortCheckInsByDate)
    expect(ordered[0].id).toBe(2)
  })
})
