import { auth, googleAuthProvider, signInWithPopup, signOut } from '../firebase/firebase';

export const login = (uid) => ({
  type: 'LOGIN',
  uid
});

export const startLogin = () => {
  // we conform to redux-thunk specs
  return () => {
    return signInWithPopup(auth, googleAuthProvider); // we use return here to continue the promise chain
  };
};

export const logout = () => ({
  type: 'LOGOUT'
});

export const startLogout = () => {
  return () => {
    return signOut(auth);
  };
}
