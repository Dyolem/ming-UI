import { mount } from '@vue/test-utils'
import { Button } from 'ming-UI'

describe('button', () => {
  /**
   * @description 测试type=primary
   */
  it('should work', () => {
    const wrapper = mount(<Button type="primary">test</Button>)
    const btnEl = wrapper.find('button')
    const hasPrimary = btnEl.element.classList.contains('ming-button--primary')
    expect(hasPrimary).toBe(true)
    wrapper.unmount()
  })

  /**
   * @description size=small
   */
  it('size', () => {
    const wrapper = mount(<Button size="small">test</Button>)
    const btnEl = wrapper.find('button')
    expect(btnEl.element.classList.contains('ming-button-size--small')).toBe(true)
    wrapper.unmount()
  })

  /**
   * @description 测试点击事件
   */
  it('click', () => {
    let clickState = false
    const handleClick = () => {
      clickState = true
    }
    const wrapper = mount(<Button onClick={handleClick}>test</Button>)
    wrapper.trigger('click')
    expect(clickState).toBe(true)
    wrapper.unmount()
  })
})
