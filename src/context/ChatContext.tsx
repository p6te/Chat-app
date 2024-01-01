import { useContext, useReducer, createContext, Dispatch } from "react";
import { AuthContext } from "./AuthContext";
import { ACTION, ActionType, StateType } from "./chatTypes";

const initialState: StateType = {
  user: {
    uid: "",
    displayName: "",
    photoURL: "",
    isOnline: false,
  },
  chatId: "",
};

type ContextType = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};

type Props = {
  children: JSX.Element;
};

export const ChatContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => {},
});

export const ChatContextProvider = ({ children }: Props) => {
  const { loggedUser } = useContext(AuthContext);

  const chatReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
      case ACTION.CHANGE_USER:
        return {
          user: action.payload,
          chatId: loggedUser
            ? loggedUser.uid > action.payload.uid
              ? loggedUser.uid + action.payload.uid
              : action.payload.uid + loggedUser.uid
            : "",
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
