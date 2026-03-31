export interface IBaseFieldProps {
  errorMessage?: string;
  label?: string;
  isRequired?: boolean;
  isTouched?: boolean;
}

export interface IOption<T> {
  label: string;
  value: T;
}
