export enum ACTION {
  CHANGE_USER = "CHANGE_USER",
}

export type UserType = {
  uid: string;
  displayName: string;
  photoURL: string;
  isOnline: boolean;
};
export type ActionType = {
  type: ACTION.CHANGE_USER;
  payload: UserType;
};

export type StateType = {
  user: UserType;
  chatId: string;
};
