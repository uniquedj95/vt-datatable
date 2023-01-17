<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
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
      defualt: "custom"
    },
    hasRowActionBtns: {
      type: Boolean,
      default: false
    },
    sortQuery: {
      type: Object as PropType<SortQuery>,
      default: () => ({})
    }
  },
  emits: ["sort"],
  setup(props) {
    const refreshKey = ref(Math.random());
    const activeIconColor = "#0275d8"; // blue
    const defaultIconColor = "#343434" // gray
    watch(() => props.sortQuery, () => refreshKey.value++, { deep: true });

    return {
      refreshKey,
      activeIconColor,
      defaultIconColor
    }
  }
})
</script>

<template>
  <thead :class="theme" :key="refreshKey">
    <tr>
      <th v-for="column in columns" :key="column.id" class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
        <div class="flex items-center th-cell" :class="{
          'cursor-pointer select-none': column.sortable !== false,
          'justify-end': column.align === 'right',
          'justify-start': column.align === 'left',
          'justify-center': column.align === 'center',
        }" @click="column.sortable !== false ? $emit('sort', column) : null">
          <span>{{ column.label }}</span>
          <div v-if="column.sortable !== false" class="flex flex-col ml-1">
            <ChevronUpIcon class="w-3 h-3 -mb-1" stroke-width="5" :color="column.id === sortQuery?.column?.id && sortQuery.order === 'asc' ? activeIconColor : defaultIconColor" />
            <ChevronDownIcon class="w-3 h-3" stroke-width="5" :color="column.id === sortQuery?.column?.id && sortQuery.order === 'desc'? activeIconColor : defaultIconColor" />
          </div>
        </div>
      </th>
      <th v-if="hasRowActionBtns" class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
    </tr>
  </thead>
</template>
