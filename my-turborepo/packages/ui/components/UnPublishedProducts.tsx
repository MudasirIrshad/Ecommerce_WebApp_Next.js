import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UnPublishedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/admin/unpublishedproducts")
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography color="red" variant="h5" textAlign="center" gutterBottom>
        Unpublished Products
      </Typography>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: "15px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.imageLink}
                alt={product.title}
                sx={{ borderRadius: "15px 15px 0 0" }}
              />
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description}
                </Typography>
                <Typography variant="h5" color="primary" fontWeight="bold">
                  ${product.price}
                </Typography>

                <Typography>Published</Typography>
                <FormControl>
                  <RadioGroup>
                    <div style={{ display: "flex" }}>
                      <FormControlLabel
                        value="True"
                        control={<Radio />}
                        label="True"
                        onChange={async () => {
                          let publish = prompt(
                            "Do you want to publish this product? (yes/no)"
                          );
                          if (publish?.toLowerCase() === "yes") {
                            try {
                              await axios.post("/api/admin/publishproduct", {
                                productId: product._id,
                                published: true,
                              });
                              alert("Product published successfully");
                              setProducts((prev) =>
                                prev.filter((p) => p._id !== product._id)
                              );
                            } catch (error) {
                              console.error("Error publishing product:", error);
                            }
                          }
                        }}
                      />
                    </div>
                  </RadioGroup>
                </FormControl>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={async () => {
                    try {
                      await axios.delete("api/admin/deleteproduct", {
                        params: {
                          productId: product._id,
                        },
                      });
                      alert("Deleted product successfully");
                      setProducts((prev) =>
                        prev.filter((p) => p._id !== product._id)
                      );
                    } catch (error) {
                      console.log("error");
                    }
                  }}
                  sx={{
                    marginTop: 2,
                    borderRadius: "30px",
                    backgroundColor: "red",
                  }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
