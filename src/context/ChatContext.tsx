import { useContext, useReducer, createContext, Dispatch } from "react";
import { AuthContext } from "./AuthContext";
import { ACTION, ActionType, StateType } from "./chatTypes";

const initialState: StateType = {
  user: {
    uid: "",
    displayName: "",
    photoURL: "",
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
  const { currentUser } = useContext(AuthContext);

  const chatReducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
      case ACTION.CHANGE_USER:
        return {
          user: action.payload,
          chatId: currentUser
            ? currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid
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
