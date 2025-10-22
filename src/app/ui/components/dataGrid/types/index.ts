type IVariant =
  | 'outlined'
  | 'plain'
  | 'filled'
  | 'underlined'
  | 'solo'
  | 'solo-inverted'
  | 'solo-filled'
  | undefined;
interface ISelect {
  text: string;
  value: string | number;
}

export interface IHeaders {
  title?: string;
  align?: string;
  sortable?: boolean;
  width?: string;
  key?: string;
  name?: string;
}

export interface IFilters {
  name?: string;
  model: string;
  label: string;
  type?: string;
  items?: ISelect[];
  placeholder?: string;
  col?: number;
  hint?: string;
  variant?: IVariant;
  disabled?: boolean;
}
