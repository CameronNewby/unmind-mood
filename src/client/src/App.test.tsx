import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import moment from 'moment'

import App  from './App'

configure({ adapter: new Adapter() })

describe('App Base', () => {
  let wrapper, mock, postSpy

  mock = new MockAdapter(axios)

  beforeEach(() => {
    // Setup axios mocks
    mock.onPost('http://localhost:3001/checkin').reply(200)

    postSpy = jest.spyOn(axios, 'post')

    wrapper = shallow(<App />)

    // Spy on the event handlers
    jest.spyOn(wrapper.instance(), '_processAndSendCheckIn')
    jest.spyOn(wrapper.instance(), '_clearState')
    jest.spyOn(wrapper.instance(), '_checkIn')
    jest.spyOn(wrapper.instance(), '_insights')
  })

  it('should send post request on book button click', async (done) => {
    // Simulate book button click
    await wrapper.instance()._processAndSendCheckIn({})
    expect(postSpy).toHaveBeenCalledTimes(1)
    done()
  })
})
