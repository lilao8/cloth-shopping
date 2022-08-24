import { createContext, useEffect, useReducer } from 'react';
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
}

const userReducer = (state:any, action:any) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      }
    default:
      throw new Error(`Unhandeled type ${type} in userReducer`);
  }
}

const INITIAL_STATE = {
  currentUser: null,
}

export const UserProvider = ({ children }:any) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = (user:any) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  }
  const value = { currentUser, setCurrentUser };

  // @ts-ignore
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  },[]);


  // @ts-ignore
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
