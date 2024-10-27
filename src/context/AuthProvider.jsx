import axiosInstance from "@/services/api";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import app from "./firebaseInit";

const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  // // Monitor the Firebase auth state and set the user
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     setUser(user);
  //     setLoading(false);
  //   });
  //   return unsubscribe;
  // }, []);

  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGmail = async (provider) => {
    console.log("google login");
    return await signInWithPopup(auth, provider);
  };

  const updateUserProfile = async (name, photoURL) => {
    return await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const userLogOut = async () => {
    return await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        axiosInstance.get(`users/user/${currentUser?.email}`).then((res) => {
          const retriveduser = res.data.user;
          console.log("retrived:", retriveduser);
          setUser(retriveduser);
          setLoading(false);
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // const user1 = {name: "Sub", dist: "Kushtia"}

  return (
    <AuthContext.Provider
      value={{
        user: user,
        createUser,
        loginWithGmail,
        signIn,
        userLogOut,
        updateUserProfile,
      }}
    >
      {!loading && children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
