export type sortType = "asc" | "desc" | "none";
export type TableRow = Record<string, any>;

export interface TableColumn {
  id: string,
  label: string;
  value: string | ((row: TableRow) => any);
  exportable?: boolean;
  initialSort?: boolean;
  sortable?: boolean;
  initialSortOrder?: sortType;
  sortCaseSensitive?: boolean;
  drillable?: boolean;
  slotName?: string;
  preSort?: (value: any) => any;
  align?: "left" | "right" | "center";
}

export interface SortQuery {
  column: TableColumn;
  order: sortType;
}

export interface TableConfig {
  serverMode?: boolean;
  searchable?: boolean;
  autoFilter?: boolean;
  refreshable?: boolean;
  paginate?: boolean;
  indexedRows?: boolean;
  theme?: "primary" | "secondary" | "tertiary" | "success" | "warning" | "danger" | "light" | "dark" | "medium" | "custom";
}

export interface PaginationBtn {
  url: null | string,
  label: string;
  active: boolean;
}

export interface ApiDataCollection {
  'current_page': number;
  "path": string;
  "per_page": number;
  "from": number;
  "to": number;
  "total": number;
  "data": Array<Record<string, any>>;
  "last_page": number;
  "links": Array<PaginationBtn>;
  "first_page_url": string | null;
  "last_page_url": string | null;
  "prev_page_url": null | string;
  "next_page_url": string | null;
}