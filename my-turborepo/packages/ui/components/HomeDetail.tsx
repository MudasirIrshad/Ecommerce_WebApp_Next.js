import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function HomeDetail() {
  const [proudcts, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usertoken, setUserToken] = useState(false);
  const { data, status } = useSession();
  console.log(data);

  useEffect(() => {
    if (data?.user?.role === "user" && status === "authenticated") {
      setUserToken(true);
    }
  }, [data, status]);
  useEffect(() => {
    axios
      .get("/api/getproducts")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h3" textAlign="center" gutterBottom>
        Our Products
      </Typography>
      <Grid container spacing={4}>
        {proudcts.map((product) => (
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
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: 2, borderRadius: "30px" }}
                  onClick={async () => {
                    if (usertoken) {
                      try {
                        let response = await axios.post("api/user/addtocart", {
                          productId: product._id,
                        });
                        console.log(response.data);
                        alert("Product added to cart successfully");
                      } catch (error) {
                        console.log(error);
                      }
                    } else {
                      alert(
                        "Please sign in to add products to cart." + product._id
                      );
                    }
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
