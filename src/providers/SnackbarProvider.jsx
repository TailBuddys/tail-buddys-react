import { Alert, Box, Snackbar } from "@mui/material";
import React, { createContext, useCallback, useContext, useState } from "react";

const SnackbarContext = createContext();

export default function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("primary");
  const [type, setType] = useState("filled");
  const [message, setMessage] = useState("");

  const snackbarActivation = useCallback((color, message, type = "filled") => {
    setColor(color);
    setType(type);
    setMessage(message);
    setOpen(true);
  }, []);

  const handleClose = useCallback((reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  }, []);

  return (
    <Box>
      <SnackbarContext.Provider value={{ snackbarActivation }}>
        {children}
      </SnackbarContext.Provider>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={color}
          variant={type}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error("useSnackbar must be used within a Provider");
  return context;
};
