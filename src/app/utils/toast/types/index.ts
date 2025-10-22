export interface IToast {
  timeout?: number;
  id?: string;
  counter?: number;
  withClose?: boolean;
  withCounter?: boolean;
  message?: string;
  position?: string;
  type?: 'warning' | 'info' | 'success' | 'error';
}

export interface IToastInstance {
  show: (toast: IToast, position?: string) => void;
}
