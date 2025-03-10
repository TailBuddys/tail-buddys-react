import { Alert, AlertTitle, Backdrop, Box, Button, Stack } from "@mui/material";
import React, { createContext, useCallback, useContext, useState } from "react";
// import { CopyToClipboard } from "react-copy-to-clipboard";
// import { useSnackbar } from "./SnackbarProvider";

const AlertContext = createContext();

export default function AlertProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("info");
  const [title, setTitle] = useState("Info");
  const [message, setMessage] = useState("");
  const [operation, setOperation] = useState(null);
  // const { snackbarActivation } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    if (operation) operation();
    handleClose();
  };

  // const handleCopyToClipboard = () => {
  //   handleClose();
  //   snackbarActivation("info", "copied to Clipboard");
  // };

  const alertActivation = useCallback(
    (color, title, message, operation = null) => {
      setOpen(true);
      setColor(color);
      setTitle(title);
      setMessage(message);
      setOperation(() => operation);
    },
    []
  );

  return (
    <Box>
      <AlertContext.Provider value={{ alertActivation }}>
        {children}
      </AlertContext.Provider>

      <Backdrop open={open} sx={{ zIndex: 1 }}>
        <Stack sx={{ width: 350, position: "reletive", zIndex: 2 }} spacing={2}>
          <Alert severity={color} variant="filled">
            <AlertTitle>{title}</AlertTitle>
            {message}
            <br />
            <br />
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              {
                // operation ? (
                <Button
                  variant="outlined"
                  color="inherit"
                  size="small"
                  onClick={handleOk}
                >
                  OK
                </Button>
                // ) : (<CopyToClipboard text={message} onCopy={handleCopyToClipboard}>
                //     <Button variant="outlined" color="inherit" size="small">
                //       Copy
                //     </Button>
                //   </CopyToClipboard>)
              }
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                {!operation ? "ok" : "cancel"}
              </Button>
            </Box>
          </Alert>
        </Stack>
      </Backdrop>
    </Box>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useSnackbar must be used within a Provider");
  return context;
};
