// src/providers/CustomThemeProvider.js
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Helper to safely fetch CSS variables
const getCssVariable = (name, fallback) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(
    name
  );
  return value?.trim() || fallback;
};

const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState(null);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  useEffect(() => {
    const palette = {
      mode: isDark ? "dark" : "light",
      primary: {
        main: getCssVariable("--primary", "#e1b36d"),
      },
      secondary: {
        main: getCssVariable("--secondary", "#8a431b"),
      },
      background: {
        default: getCssVariable("--background", isDark ? "#121212" : "#fff8ee"),
      },
      text: {
        primary: getCssVariable("--text", isDark ? "#ffffff" : "#4f4538"),
      },
    };

    const dynamicTheme = createTheme({
      palette,
      typography: {
        allVariants: {
          color: palette.text.primary,
        },
        h3: {
          fontSize: "3rem",
          "@media (max-width:480px)": {
            fontSize: "1.75rem",
          },
        },
        h5: {
          fontSize: "1.5rem",
          "@media (max-width:480px)": {
            fontSize: "1rem",
          },
        },
      },
    });

    setTheme(dynamicTheme);
  }, [isDark]);

  if (!theme) return null; // Optional: show loader here

  return (
    <ThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ toggleDarkMode, isDark, theme }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a Provider");
  return context;
};

//--------------------------------------------------------------------------------------------//
// import { createContext, useCallback, useContext, useState } from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// const ThemeContext = createContext();

// export default function CustomThemeProvider({ children }) {
//   const [isDark, setIsDark] = useState(false);

//   const toggleDarkMode = useCallback(() => {
//     setIsDark((prev) => !prev);
//   }, []);

//   const theme = createTheme({
//     palette: {
//       mode: isDark ? "dark" : "light",
//     },
//     typography: {
//       h3: {
//         fontSize: "3rem",
//         "@media (max-width:480px)": {
//           fontSize: "1.75rem",
//         },
//       },
//       h5: {
//         fontSize: "1.5rem",
//         "@media (max-width:480px)": {
//           fontSize: "1rem",
//         },
//       },
//     },
//   });

//   return (
//     <ThemeProvider theme={theme}>
//       <ThemeContext.Provider value={{ toggleDarkMode, isDark }}>
//         {children}
//       </ThemeContext.Provider>
//     </ThemeProvider>
//   );
// }
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) throw new Error("useTheme must be used within a Provider");
//   return context;
// };
