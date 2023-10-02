"use client";

import { Provider } from "react-redux";
import { useState } from "react";
import { ThemeContext } from "@app/app/contexts/theme.context";
import { AppButton } from "./app-button";
import { store } from "@app/store/store";
import { AppFirebase } from "./app-firebase";

export const AppProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            return;
        }
        setTheme("light");
    };


    return (
        <Provider store={store}>
            <AppFirebase>
        <ThemeContext.Provider value={theme}>
            <div>abc</div>
            <AppButton className="w-20" color="white" onClick={toggleTheme}>
                Toggle theme
            </AppButton>
            {children}
        </ThemeContext.Provider>
        </AppFirebase>
        </Provider>
    )
}