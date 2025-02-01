import { useState } from "react";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Link from "next/link";

export default function Portal(props: any) {
  return (
    <>
      <div>
        <Card
          sx={{
            width: 200,
            textAlign: "center",
            padding: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 3,
          }}
        >
          <ProductionQuantityLimitsTwoToneIcon
            sx={{ fontSize: 150, color: "#1976d2" }}
          />
          <Link
            style={{ color: "black", textDecoration: "none" }}
            href={props.link}
          >
            <Button variant="outlined">Add Product</Button>
          </Link>
        </Card>
      </div>
    </>
  );
}
