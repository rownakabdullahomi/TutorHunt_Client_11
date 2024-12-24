/* eslint-disable react/prop-types */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // console.log(user);

  const userRegister = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData).then(() => {
      const updatedUser = { ...auth.currentUser };
      setUser(updatedUser);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser?.email) {
        setUser(currentUser);
        // Fetch the token from the server
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          { email: currentUser?.email },
          { withCredentials: true }
        );

        console.log("Token:", data);
      }
      else{
        setUser(currentUser);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/logout`,
          { withCredentials: true }
        )
        console.log(data);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const userInfo = {
    user,
    setUser,
    loading,
    userRegister,
    userLogin,
    googleLogin,
    userLogout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
