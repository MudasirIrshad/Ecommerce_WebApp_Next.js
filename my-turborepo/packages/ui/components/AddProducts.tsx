import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
export default function AddProducts(props: any) {
  const handleClick = () => {
    props.onClick(title, price, description, imageLink, published);
  };
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(true);

  return (
    <>
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
            label="Product Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            required
            style={{ padding: "10px", width: "350px" }}
            id="outlined-required"
            label="Product Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            required
            style={{ padding: "10px", width: "350px" }}
            id="outlined-required"
            label="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            style={{ padding: "10px", width: "350px" }}
            id="outlined-required"
            label="Product Image URL"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
          />
          <Typography>Published</Typography>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="User"
              name="radio-buttons-group"
            >
              <div style={{ display: "flex" }}>
                <FormControlLabel
                  value="True"
                  control={<Radio checked={published === true} />}
                  label="True"
                  onClick={() => {
                    setPublished(true);
                  }}
                />
                <FormControlLabel
                  value="False"
                  control={<Radio />}
                  label="False"
                  onClick={() => {
                    setPublished(false);
                  }}
                />
              </div>
            </RadioGroup>
          </FormControl>
          <Button
            sx={{ backgroundColor: "black", width: "350px", margin: "10px" }}
            variant="contained"
            onClick={handleClick}
          >
            Add Product
          </Button>
        </Box>
      </div>
    </>
  );
}
