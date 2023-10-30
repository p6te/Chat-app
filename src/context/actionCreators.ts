import { ACTION, ActionType } from "./chatTypes";

export const changeUser = (user: {
  uid: string;
  displayName: string;
  photoURL: string;
}): ActionType => ({
  type: ACTION.CHANGE_USER,
  payload: user,
});
