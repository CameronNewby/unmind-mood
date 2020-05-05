import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import MoodCheckIn from './index'

configure({ adapter: new Adapter() })

describe('Mood Check In', () => {
  let wrapper
  let mockFn = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<MoodCheckIn onCompleteCallback={mockFn} />)

    // Spy on the event handlers
    jest.spyOn(wrapper.instance(), 'onMoodCallback')
    jest.spyOn(wrapper.instance(), 'onFeelingCallback')
    jest.spyOn(wrapper.instance(), 'onCommentCallback')
  })

  it('on mood callback complete saves mood to state and processes next step', async (done) => {
    wrapper.instance().onMoodCallback(5)
    expect(wrapper.state().mood.value).toBe(5)
    expect(wrapper.state().mood.show).toBe(false)
    expect(wrapper.state().feeling.show).toBe(true)
    done()
  })

  it('on feeling callback complete saves mood to state and processes next step', async (done) => {
    wrapper.instance().onFeelingCallback(['Happy', 'Sad'])
    expect(wrapper.state().feeling.value[0]).toBe('Happy')
    expect(wrapper.state().feeling.value[1]).toBe('Sad')
    expect(wrapper.state().feeling.show).toBe(false)
    expect(wrapper.state().comment.show).toBe(true)
    done()
  })

  it('on comment callback complete saves mood to state and processes next step', async (done) => {
    wrapper.instance().onCommentCallback('a comment')
    expect(wrapper.state().comment.value).toBe('a comment')
    expect(wrapper.state().feeling.show).toBe(false)

    expect(mockFn).toHaveBeenCalled()
    expect(mockFn).toHaveBeenCalledTimes(1)
    expect(mockFn).toHaveBeenCalledWith({ comment: 'a comment', feelings: [], mood: 0, userId: 1 })
    done()
  })
})
