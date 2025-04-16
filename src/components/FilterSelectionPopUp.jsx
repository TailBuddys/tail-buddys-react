// import { Alert, AlertTitle, Backdrop, Box, Button, Stack } from "@mui/material";
// import React, { useCallback, useState } from "react";

// function FilterSelectionPopUp() {
//   const [open, setOpen] = useState(false);
//   const [color, setColor] = useState("info");
//   const [title, setTitle] = useState("Info");
//   const [entityType, setEntityType] = useState("");
//   const [operation, setOperation] = useState(null);

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleOk = () => {
//     if (operation) operation();
//     handleClose();
//   };

//   const PopUpFilterSelection = useCallback(
//     (color, title, entityType, operation = null) => {
//       setOpen(true);
//       setColor(color);
//       setTitle(title);
//       setEntityType(entityType);
//       setOperation(() => operation);
//     },
//     []
//   );
//   return (
//     <Box>
//       <Backdrop open={open} sx={{ zIndex: 1 }}>
//         <Stack sx={{ width: 350, position: "reletive", zIndex: 2 }} spacing={2}>
//           <Alert severity={color} variant="filled">
//             <AlertTitle>{title}</AlertTitle>
//             Here you can optimize your {entityType} filters:
//             <br />
//             <br />
//             <Button
//               variant="outlined"
//               color="inherit"
//               size="small"
//               onClick={handleOk}
//             >
//               Save Filters
//             </Button>
//             <Button
//               variant="outlined"
//               color="inherit"
//               size="small"
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//           </Alert>
//         </Stack>
//       </Backdrop>
//     </Box>
//   );
// }

// export default FilterSelectionPopUp;
