import React, { useState, createContext, useContext, useLayoutEffect } from 'react';
import classNames from "classnames";
import { Outlet } from 'react-router-dom';

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme(){
    return useContext(ThemeContext);
}

export function useThemeUpdate(){
  return useContext(ThemeUpdateContext);
}

const todaysDate = new Date()

const ThemeProvider = ({...props}) => {
  
  const defaultTheme = {
    sidebar: "dark", //other value can be passed "light"
    header: "light", //other value can be passed "dark"
    skin: "light", //other value can be passed "dark"
    direction: "ltr", //other value can be passed "rtl"
  }
    const [theme, setTheme] = useState(defaultTheme);

    const themeUpdate = {
      sidebar : function(value){
        setTheme({...theme, sidebar : value})
      },
      header : function(value){
        setTheme({...theme, header : value})
      },
      skin : function(value){
        setTheme({...theme, skin : value})
      },
      direction : function(value){
        setTheme({...theme, direction : value})
      },
    }

    const bodyClass = classNames({
      "bg-gray-50 dark:bg-gray-1000 font-body text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-normal min-w-[320px]": true,
    });

    let date = todaysDate.getDate();
    function setLocalStorage() {
      localStorage.setItem("dashwindReact-demo1", JSON.stringify({ style: theme, date: date }));
    };

    useLayoutEffect(() => {
      document.body.className = bodyClass;
      document.body.setAttribute("dir", theme.direction);
      setLocalStorage();
    });

    useLayoutEffect(() => {
      let storageStyle = localStorage.getItem("dashwindReact-demo1");
      if (storageStyle) {
        let styleObject = JSON.parse(storageStyle);
        if (styleObject.date === date) {
          setTheme(styleObject.style);
        }
      }
    }, [date]);

  return (
    <ThemeContext.Provider value={theme} >
      <ThemeUpdateContext.Provider value={themeUpdate}>
        <Outlet />
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;
