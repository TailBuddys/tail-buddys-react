import React, { useEffect, useRef, useState } from "react";
import DogDetailsComponent from "../../dogs/pages/DogDetailsComponent";
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
import DogProfileMenu from "../../dogs/pages/DogProfileMenu";

function CardBody({ data }) {
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);
  const anchorRef = useRef();

  useEffect(() => {
    setAnchor(anchorRef.current);
  }, []);

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
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <>
                    <IconButton
                      sx={{ p: 0, display: "inline-flex", marginLeft: 1 }}
                      onClick={() => window.history.back()} // או לדף בית
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>
                  </>
                  {!data.distance && (
                    <>
                      <IconButton
                        sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
                        onClick={() => setMenuOpen(true)}
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
                  <>
                    <IconButton
                      sx={{ p: 0, display: "inline-flex", marginLeft: 1 }}
                      onClick={() => window.history.back()} // או לדף בית
                    >
                      <ArrowBackIosNewIcon />
                    </IconButton>
                  </>
                  for parks
                  <>
                    <IconButton
                      sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
                      onClick={() => setMenuOpen(true)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </>
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
