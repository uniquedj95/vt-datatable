import { shallowMount } from '@vue/test-utils'
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue'

describe('ChevronUpIcon', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ChevronDownIcon)
    expect(wrapper.element).toMatchSnapshot()
  })
  
  it('has the correct class', () => {
    const wrapper = shallowMount(ChevronDownIcon)
    expect(wrapper.classes()).toContain('rotate-180')
  })
})