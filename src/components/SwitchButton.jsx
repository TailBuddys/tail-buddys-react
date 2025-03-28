import { styled, Switch } from "@mui/material";

const SwitchButton = styled(Switch)(({ theme, disabled }) => ({
  width: 70,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(2px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(35px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('/assets/images/parksIcon.png')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: disabled ? "#616161" : "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: disabled ? "#a19b90" : "#d7cfc0",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "90%",
      height: "90%",
      left: 1.5,
      top: 0,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('/assets/images/meetDogsIcon.png')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#fffff",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

export default SwitchButton;
