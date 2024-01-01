import { ACTION, ActionType, UserType } from "./chatTypes";

export const changeUser = (user: UserType): ActionType => ({
  type: ACTION.CHANGE_USER,
  payload: user,
});
