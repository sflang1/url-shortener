import { User } from '../interfaces/models/user';
import { setRecoilExternalState } from './RecoilExternalWrapper';
import { AlertColor } from "@mui/material";
import { atom } from "recoil";

export const snackbarSeverityState = atom<AlertColor>({
  key: 'snackbarSeverity',
  default: 'success' as AlertColor
});

export const snackbarMessageState = atom<string>({
  key: 'snackbarMessage',
  default: ''
});

export const snackbarOpenState = atom<boolean>({
  key: 'snackbarOpen',
  default: false
});

export const currentUserState = atom<User>({
  key: 'currentUser',
  default: null
});

export const showSnackbarMessage = (message: string, severity: AlertColor = 'success'): void => {
  setRecoilExternalState(snackbarSeverityState, severity);
  setRecoilExternalState(snackbarMessageState, message);
  setRecoilExternalState(snackbarOpenState, true);
}