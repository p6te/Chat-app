export enum ACTION {
  CHANGE_USER = "CHANGE_USER",
}
export type ActionType = {
  type: ACTION.CHANGE_USER;
  payload: {
    uid: string;
    displayName: string;
    photoURL: string;
    isOnline: boolean;
  };
};

export type StateType = {
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
    isOnline: boolean;
  };
  chatId: string;
};
