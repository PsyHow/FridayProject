export interface NewPasswordInterface {
  onChange: (value: string) => void;
  password: string;
  error: string | null;
  onSubmit: () => void;
  isFetching: boolean;
  confirmPass: string;
  onChangeConfirmPass: (value: string) => void;
  setNewPassword: boolean;
}
