import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
function Country({ countryData, getCapitalDetails, navigateToVar }) {
  let navigateTo = useNavigate();
  const goForCapital = () => {
    getCapitalDetails();
  };
  useEffect(() => {
    navigateTo(navigateToVar);
  }, [navigateToVar]);
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Country Name
                </TableCell>
                <TableCell align="right">{countryData.name}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Capital
                </TableCell>
                <TableCell align="right">{countryData.capital}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Population
                </TableCell>
                <TableCell align="right">{countryData.population}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Lattitude
                </TableCell>
                <TableCell align="right">{countryData.lat}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Longitude
                </TableCell>
                <TableCell align="right">{countryData.lng}</TableCell>
              </TableRow>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Flag
                </TableCell>
                <TableCell align="right">
                  <img src={countryData.flag} alt="country flag" />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Button variant="contained" onClick={goForCapital}>
        Capital Weather
      </Button>
    </Container>
  );
}

export default Country;
