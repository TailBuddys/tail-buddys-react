import React, { useEffect, useState } from "react";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { getUser } from "../../services/localStorageService";
import ParkDetailsComponent from "../../parks/components/ParkDetailsComponent";
import ParkProfileMenu from "../../parks/components/ParkProfileMenu";
import DogProfileMenu from "../../dogs/components/DogProfileMenu";
import DogDetailsComponent from "../../dogs/components/DogDetailsComponent";
import "../../styles/card.css";

function CardBody({ data, loginDog, handleLikeUnlikePark }) {
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);
  const user = getUser();

  useEffect(() => {
    setMenuOpen(false);
  }, [screenSize]);

  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      {data.vaccinated !== undefined ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  height: 2,
                  "& td, & th": { borderBottom: "none" },
                }}
              >
                <TableCell
                  className="card-responsive-container"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {!data.distance && (
                    <>
                      <IconButton
                        sx={{ p: 0, display: "inline-flex", marginLeft: 1 }}
                        onClick={() => window.history.back()} // או לדף בית
                      >
                        <ArrowBackIosNewIcon />
                      </IconButton>
                    </>
                  )}

                  {!data.distance && data.address && (
                    <>
                      <IconButton
                        sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
                        onClick={(event) => {
                          setAnchor(event.currentTarget);
                          setMenuOpen(true);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <DogProfileMenu
                        anchorEl={anchorEL}
                        isOpen={isMenuOpen}
                        onClose={() => setMenuOpen(false)}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>
                  <DogDetailsComponent dogData={data} />
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {!data.distance && data.address && (
                    <>
                      <IconButton
                        sx={{ p: 0, display: "inline-flex", marginLeft: 1 }}
                        onClick={() => window.history.back()} // או לדף בית
                      >
                        <ArrowBackIosNewIcon />
                      </IconButton>
                    </>
                  )}
                  <>
                    {user && user.IsAdmin === "True" && (
                      <>
                        <IconButton
                          sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
                          onClick={(event) => {
                            setAnchor(event.currentTarget);
                            setMenuOpen(true);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <ParkProfileMenu
                          data={data}
                          anchorEl={anchorEL}
                          isOpen={isMenuOpen}
                          onClose={() => setMenuOpen(false)}
                        />
                      </>
                    )}
                  </>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ borderBottom: "none" }}>
                  <ParkDetailsComponent
                    parkData={data}
                    loginDog={loginDog}
                    handleLikeUnlikePark={handleLikeUnlikePark}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default CardBody;
