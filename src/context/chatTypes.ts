export enum ACTION {
  CHANGE_USER = "CHANGE_USER",
}
export type ActionType = {
  type: ACTION.CHANGE_USER;
  payload: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
};

export type StateType = {
  user: {
    uid: string;
    displayName: string;
    photoURL: string;
  };
  chatId: string;
};
