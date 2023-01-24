import { shallowMount } from '@vue/test-utils'
import TableBody from '@/components/TableBody.vue'
import { TableColumn, TableRow } from '@/interfaces'

describe('TableBody', () => {
  const columns: Array<TableColumn> = [
    { id: 'name', label: 'Name', value: "name" },
    { id: 'age', label: 'Age', value: "age" },
  ];

  const rows: Array<TableRow> = [
    { name: 'John Doe', age: 30 },
    { name: 'Jane Smith', age: 25 },
  ]

  it('renders correctly with rows', () => {
    const wrapper = shallowMount(TableBody, {
      props: { columns, rows }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with no rows', () => {
    const wrapper = shallowMount(TableBody, {
      props: { columns }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with loading', () => {
    const wrapper = shallowMount(TableBody, {
      props: { columns, loading: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with striped', () => {
    const wrapper = shallowMount(TableBody, {
      props: { columns, rows, striped: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders correctly with bordered', () => {
    const wrapper = shallowMount(TableBody, {
      props: { columns, rows, bordered: true }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
