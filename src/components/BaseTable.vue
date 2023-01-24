<script lang="ts">
import { SortQuery, TableColumn, TableConfig, TableRow } from '@/interfaces';
import { sortRows } from '@/utils';
import { computed, defineComponent, onMounted, PropType, reactive, ref, watch } from 'vue'
import TableBody from './TableBody.vue';
import TableHeader from './TableHeader.vue';

export default defineComponent({
  name: "BaseTable",
  props: {
    rows: {
      type: Array as PropType<Array<TableRow>>,
      default: () => []
    },
    asyncRows: {
      type: Function as PropType<() => Promise<Array<TableRow>>>
    },
    columns: {
      type: Array as PropType<Array<TableColumn>>,
      required: true
    },
    config: {
      type: Object as PropType<TableConfig>
    }
  },
  components: {
    TableHeader,
    TableBody,
  },
  setup(props) {
    const sortQuery = reactive({} as SortQuery);
    const activeRows = ref<Array<TableRow>>([]);
    const tableRows = ref<Array<TableRow>>([]);
    const isLoading = ref(false);

    const tableColumns = computed<Array<TableColumn>>(() => props.config?.indexedRows 
      ? [{ id: "index", value: "index", label: "#", initialSort: true, initialSortOrder: "asc"}, ...props.columns] 
      : props.columns
    );

    const updateSortQuery = (column: TableColumn) => {
      if(sortQuery?.column?.id === column.id) {
        sortQuery.order = sortQuery.order === "asc" ? "desc" : "asc"
      } else {
        sortQuery.column = column;
        sortQuery.order = "asc";
      }
    }

    const initializeSortQuery = () => {
      const defaultSortColumn = props.columns.find(column => column.initialSort);
      if (!defaultSortColumn) return
      sortQuery.column = defaultSortColumn
      sortQuery.order = defaultSortColumn.initialSortOrder || "asc"
    }

    const initializeTableRows = async () => {
      if (typeof props.asyncRows === "function") {
        isLoading.value = true;
        tableRows.value = await props.asyncRows();
        isLoading.value = false
      } else {
        tableRows.value = props.rows
      }
      if(props.config?.indexedRows) {
        tableRows.value = tableRows.value.map((row, i) => ({...row, index: i + 1}))
      }
    }

    watch(sortQuery, () => activeRows.value = sortRows(activeRows.value, sortQuery), {
      deep: true, 
      immediate: true
    });

    onMounted(async () => {
      initializeSortQuery();
      await initializeTableRows();
      activeRows.value = tableRows.value;
    })

    return {
      tableColumns,
      activeRows,
      sortQuery,
      updateSortQuery,
    }
  },
})
</script>

<template>
  <table class="table w-full table-auto">
    <table-header :columns="tableColumns" :sortQuery="sortQuery" :theme="config?.theme" @sort="updateSortQuery" />
    <table-body :columns="tableColumns" :rows="activeRows "/>
  </table>
</template>