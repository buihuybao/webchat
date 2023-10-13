import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [User, setUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (User) => {
            setUser(User);
        });
        // console.log(User);

        return () => {
            unsub();
        };
    }, []);


    return (
        <AuthContext.Provider value={{ User }}>
            {children}
        </AuthContext.Provider>
    );
}