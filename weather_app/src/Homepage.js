import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Homepage({
  textRef,
  textChanged,
  btnDisabled,
  country,
  getCountryDetails,
}) {
  let navigate = useNavigate();
  const redirectToCountry = () => {
    getCountryDetails();
    navigate("/country");
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <TextField
        helperText=""
        inputRef={textRef}
        onChange={textChanged}
        id="demo-helper-text-misaligned"
        label="Enter country"
        value={country}
      />
      <Button
        variant="contained"
        onClick={redirectToCountry}
        disabled={btnDisabled}
      >
        Submit
      </Button>
    </Box>
  );
}

export default Homepage;
