import { ACTION, ActionType } from "./chatTypes";

export const changeUser = (user: {
  uid: string;
  displayName: string;
  photoURL: string;
  isOnline: boolean;
}): ActionType => ({
  type: ACTION.CHANGE_USER,
  payload: user,
});
