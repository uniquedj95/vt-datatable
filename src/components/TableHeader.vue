<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { SortQuery, TableColumn, TableConfig } from '../interfaces';
import ChevronDownIcon from './icons/ChevronDownIcon.vue'; 
import ChevronUpIcon from './icons/ChevronUpIcon.vue'; 

export default defineComponent({
  name: "TableHeader",
  components: {
    ChevronUpIcon,
    ChevronDownIcon,
  },
  props: {
    columns: {
      type: Array as PropType<Array<TableColumn>>,
      required: true,
    },
    theme: {
      type: String as PropType<TableConfig["theme"]>,
      defualt: "primary"
    },
    hasRowActionBtns: {
      type: Boolean,
      default: false
    },
    sortQuery: {
      type: Object as PropType<SortQuery>,
      default: () => ({})
    },
    bordered: {
      type: Boolean,
      default: true
    },
    stickyTop: {
      type: Boolean,
      default: true
    }
  },
  emits: ["sort"],
  setup(props) {
    const activeIconColor = computed(() => props.theme?.match('light') ? '#332D2D' : '#FBFBFB')
    const defaultIconColor = computed(() => props.theme?.match('light') ? '#9FA6B2' : '#332D2D')
    return {
      activeIconColor,
      defaultIconColor
    }
  }
})
</script>

<template>
  <thead :class="{ 'sticky top-0': stickyTop }">
    <tr :class="theme">
      <th v-for="column in columns" :key="column.id" class="px-6 py-3 border-b border-gray-200 text-left text-sm leading-5 font-medium uppercase tracking-wider" :class="{'border border-gray-200': bordered}">
        <div class="flex items-center th-cell" :class="{
          'cursor-pointer select-none': column.sortable !== false,
          'justify-end': column.align === 'end',
          'justify-start': column.align === 'start',
          'justify-center': column.align === 'center',
        }" @click="column.sortable !== false ? $emit('sort', column) : null">
          <span>{{ column.label }}</span>
          <div v-if="column.sortable !== false" class="flex flex-col ml-1">
            <ChevronUpIcon class="w-3 h-3 -mb-1" :color="column.id === sortQuery?.column?.id && sortQuery.order === 'asc' ? activeIconColor : defaultIconColor" />
            <ChevronDownIcon class="w-3 h-3" :color="column.id === sortQuery?.column?.id && sortQuery.order === 'desc'? activeIconColor : defaultIconColor" />
          </div>
        </div>
      </th>
      <th v-if="hasRowActionBtns" class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
    </tr>
  </thead>
</template>
