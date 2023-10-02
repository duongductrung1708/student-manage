"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AppFirebase = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyAQ77izQQdK23R73KRsbUEzJJF1oPmI_3g",
            authDomain: "react-study-dab8a.firebaseapp.com",
            projectId: "react-study-dab8a",
            storageBucket: "react-study-dab8a.appspot.com",
            messagingSenderId: "53893605672",
            appId: "1:53893605672:web:eb2423af361b1d5435c81d",
            measurementId: "G-4NN3Q63978"
        };
        initializeApp(firebaseConfig);
        console.log("Firebase initialized");

        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // console.log(user);
            if (user) {
                dispatch.user.setUser({
                    id: user.uid,
                    email: user.email,
                    displayName: user.displayName || user.email,
                });
            } else {
                dispatch.user.setUser({
                    id: undefined,
                    email: undefined,
                    displayName: undefined,
                });
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);
    return <>{children}</>;
};