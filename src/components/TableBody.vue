<script lang="ts">
import { TableColumn, TableRow } from '@/interfaces';
import { getColumnValue } from '@/utils';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: "TableBody",
  props: {
    columns: {
      type: Array as PropType<Array<TableColumn>>,
      required: true
    },
    rows: {
      type: Array as PropType<Array<TableRow>>,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    return {
      getColumnValue
    }
  },
})
</script>

<template>
  <tbody class="bg-white">
    <tr v-for="(row, index) of rows" :key="index" :class="{'bg-gray-100': striped && index % 2 === 1 }">
      <td 
        v-for="column in columns" 
        :key="column.id"
        class="px-6 py-4 whitespace-no-wrap text-gray-700 td-cell"
        :class="{
          'text-right': column.align === 'end',
          'text-left': column.align === 'start',
          'text-center': column.align === 'center',
          'border border-gray-200': bordered
        }"
      >
        <slot :name="column.slotName" v-if="column.slotName" :value="getColumnValue(column, row)">{{ getColumnValue(column, row) }}</slot>
        <span v-else>{{ getColumnValue(column, row) }}</span>
      </td>
    </tr>
    <tr v-if="rows.length === 0 && !loading || rows.length === 0 && loading" key="empty">
      <td :colspan="columns.length" class="text-center py-5 text-gray-500 text-lg td-cell">
        <slot name="empty">
          <span v-if="!loading">No Data</span>
          <span v-else-if="rows.length === 0 && loading">
            <i class="el-icon el-icon-loading"></i>
            Loading...
          </span>
        </slot>
      </td>
    </tr>
  </tbody>
</template>
