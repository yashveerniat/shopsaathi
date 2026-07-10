import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

// 1. Create the context (the "global store")
const AuthContext = createContext();

// 2. A custom hook so other files can easily do: const { currentUser } = useAuth();
export function useAuth() {
  return useContext(AuthContext);
}

// 3. The Provider — wraps the whole app, holds the actual logic/state
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null); // Firebase auth user object
  const [userRole, setUserRole] = useState(null);        // "owner" or "worker"
  const [loading, setLoading] = useState(true);           // true while we check login state

  // Sign up a brand new user
  async function signup(email, password, role, name, phone) {
    // Step 1: create the account in Firebase Authentication
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Step 2: create their profile document in Firestore (users collection)
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email,
      role,
      name,
      phone,
      createdAt: new Date().toISOString(),
    });

    setUserRole(role);
    return user;
  }

  // Log in an existing user
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Log out
  function logout() {
    return signOut(auth);
  }

  // This runs whenever the login state changes (login, logout, or page refresh)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // fetch their role from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUserRole(null);
      }

      setLoading(false);
    });

    return unsubscribe; // cleanup when component unmounts
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout,
  };

  // Don't render the app until we know if someone's logged in or not
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}