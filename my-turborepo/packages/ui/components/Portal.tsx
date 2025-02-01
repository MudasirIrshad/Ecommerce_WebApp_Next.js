import { useState } from "react";
import ProductionQuantityLimitsTwoToneIcon from "@mui/icons-material/ProductionQuantityLimitsTwoTone";
import ManageAccountsTwoToneIcon from "@mui/icons-material/ManageAccountsTwoTone";
import InventoryTwoToneIcon from "@mui/icons-material/InventoryTwoTone";
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
      <div
        style={{ display: "flex", justifyContent: "center", margin: "40px" }}
      >
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
            marginRight: 3,
          }}
        >
          <ProductionQuantityLimitsTwoToneIcon
            sx={{ fontSize: 150, color: "#1976d2" }}
          />
          <Link
            style={{ color: "black", textDecoration: "none" }}
            href={props.link.addProducts}
          >
            <Button variant="outlined">Add Product</Button>
          </Link>
        </Card>
        {/* VIEW CUSTOMER COMPONENT */}
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
            marginRight: 3,
          }}
        >
          <ManageAccountsTwoToneIcon sx={{ fontSize: 150, color: "#1976d2" }} />
          <Link
            style={{ color: "black", textDecoration: "none" }}
            href={props.link.viewCustomers}
          >
            <Button variant="outlined">View Customers</Button>
          </Link>
        </Card>
        {/* VIEW PUBLISHED PRODUCTS */}
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
            marginRight: 3,
          }}
        >
          <InventoryTwoToneIcon sx={{ fontSize: 150, color: "#1976d2" }} />
          <Link
            style={{ color: "black", textDecoration: "none" }}
            href={props.link.publishdedProducts}
          >
            <Button variant="outlined">Active Prod</Button>
          </Link>
        </Card>
        {/* VIEW UN PUBLISHED PRODUCTS */}
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
            marginRight: 3,
          }}
        >
          <InventoryTwoToneIcon sx={{ fontSize: 150, color: "red" }} />
          <Link
            style={{ color: "black", textDecoration: "none" }}
            href={props.link.unpublishdedProducts}
          >
            <Button variant="outlined">Inactive Prod</Button>
          </Link>
        </Card>
      </div>
    </>
  );
}
