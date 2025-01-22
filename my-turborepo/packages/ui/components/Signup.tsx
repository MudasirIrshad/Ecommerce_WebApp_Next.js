import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export function Signup(props: any) {
  const handleClick = () => {
    props.onClick(username, gmail, password, role);
    // console.log(role);
  };
  const [username, setUserName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [checkbox, setCheckbox] = useState(false);
  const adminKey = "admin-key";
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="section"
        sx={{
          p: 2,
          border: "1px dashed grey",
          width: "400px",
          margin: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Name"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Gmail"
          onChange={(e) => {
            setGmail(e.target.value);
          }}
        />
        <TextField
          required
          style={{ padding: "10px", width: "350px" }}
          id="outlined-required"
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="User"
            name="radio-buttons-group"
          >
            <div style={{ display: "flex" }}>
              <FormControlLabel
                value="User"
                control={<Radio />}
                label="User"
                onClick={() => {
                  setRole("User");
                  setCheckbox(false);
                }}
              />
              <FormControlLabel
                value="Admin"
                control={<Radio />}
                label="Admin"
                onClick={() => {
                  setCheckbox(true);
                }}
              />
            </div>
          </RadioGroup>
        </FormControl>
        {checkbox ? (
          <>
            <TextField
              required
              style={{ padding: "10px", width: "350px" }}
              id="outlined-required"
              label="Admin-Secret-Key"
              onChange={(e) => {
                if (e.target.value === adminKey) {
                  setRole("Admin");
                  console.log("admin key correct");
                }
              }}
            />
          </>
        ) : (
          <></>
        )}
        <Button
          sx={{ backgroundColor: "black", width: "350px", margin: "10px" }}
          variant="contained"
          onClick={handleClick}
        >
          Signup
        </Button>
      </Box>
    </div>
  );
}
