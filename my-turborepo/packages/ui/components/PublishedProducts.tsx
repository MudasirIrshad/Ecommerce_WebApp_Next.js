import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PublishedProducts() {
  const [proudcts, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/api/getproducts")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {proudcts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
