import { shallowMount } from '@vue/test-utils'
import ChevronUpIcon from '@/components/icons/ChevronUpIcon.vue'

describe('ChevronUpIcon', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ChevronUpIcon)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('has the correct default props', () => {
    const wrapper = shallowMount(ChevronUpIcon)
    expect(wrapper.props().color).toBe('#343434')
    expect(wrapper.props().size).toBe(26)
  })

  it('renders the correct color', () => {
    const wrapper = shallowMount(ChevronUpIcon, {
      props: { color: '#ff0000' }
    })
    expect(wrapper.find('path').attributes().fill).toBe('#ff0000')
  })

  it('renders the correct size', () => {
    const wrapper = shallowMount(ChevronUpIcon, {
      props: { size: 50 }
    })
    expect(wrapper.find('svg').attributes().width).toBe('50')
    expect(wrapper.find('svg').attributes().height).toBe('50')
  })
})