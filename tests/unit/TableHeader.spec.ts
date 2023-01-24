import { shallowMount } from '@vue/test-utils'
import TableHeader from '@/components/TableHeader.vue'
import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue'
import ChevronUpIcon from '@/components/icons/ChevronUpIcon.vue'
import { TableColumn } from '@/interfaces'

describe('TableHeader', () => {
  let wrapper: any
  const columns: Array<TableColumn> =  [
    { id: 'name',
    label: 'Name',
      value: "name",
      sortable: true
    },
    {
      id: 'age',
      label: 'Age',
      value: 'age',
      sortable: true
    },
  ]

  beforeEach(() => {
    wrapper = shallowMount(TableHeader, {
      props: {
        columns,
        theme: 'light',
        hasRowActionBtns: true,
        sortQuery: {
          column: columns[0],
          order: 'asc'
        },
        bordered: true,
        stickyTop: true
      },
      components: {
        ChevronUpIcon,
        ChevronDownIcon
      }
    })
  })

  it('should render correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render columns correctly', () => {
    const ths = wrapper.findAll('th')
    expect(ths.length).toBe(3)
    expect(ths.at(0).text()).toBe('Name')
    expect(ths.at(1).text()).toBe('Age')
    expect(ths.at(2).text()).toBe('Actions')
  })

  it("should render correct theme color", async () => {
    await wrapper.setProps({ theme: "primary" });
    const tr = wrapper.find('tr');
    expect(tr.classes()).toContain('primary')
  })

  it('renders correctly with sticky top', () => {
    expect(wrapper.classes()).toContain('sticky')
    expect(wrapper.classes()).toContain('top-0')
  })

  it("should render correctly without sticky top", async () => {
    await wrapper.setProps({ stickyTop: false });
    expect(wrapper.classes().length).toBe(0);
  })

  it('renders correctly with bordered', () => {
    const th = wrapper.find('th');
    expect(th.classes()).toContain('border');
  })

  it("renders correctly without bordered", async () => {
    await wrapper.setProps({ bordered: false });
    const th = wrapper.find('th');
    expect(th.classes('border')).toBeFalsy()
  })

  it('should emit sort event when column is sortable and clicked', async () => {
    const th = wrapper.find('th')
    await th.trigger('click')
    expect(wrapper.emitted().sort).toBeTruthy()
    expect(wrapper.emitted().sort[0]).toEqual([columns[0]])
  })

  it('should not emit sort event when column is not sortable and clicked', async () => {
    await wrapper.setProps({ columns: [{...columns[0], sortable: false}] })
    const th = wrapper.find('th')
    await th.trigger('click')
    expect(wrapper.emitted().sort).toBeFalsy()
  })

  it('should render ChevronUpIcon and ChevronDownIcon correctly', () => {
    const chevronUpIcon = wrapper.findComponent(ChevronUpIcon)
    expect(chevronUpIcon.props().color).toBe('#332D2D')
    const chevronDownIcon = wrapper.findComponent(ChevronDownIcon)
    expect(chevronDownIcon.props().color).toBe('#9FA6B2')
  })

  it('should not render ChevronUpIcon and ChevronDownIcon when column is not sortable', async () => {
    await wrapper.setProps({ columns: [{ ...columns[0], sortable: false }]});
    const chevronUpIcon = wrapper.findComponent(ChevronUpIcon);
    expect(chevronUpIcon.exists()).toBeFalsy();
    const chevronDownIcon = wrapper.findComponent(ChevronDownIcon);
    expect(chevronDownIcon.exists()).toBeFalsy()
  })
})
