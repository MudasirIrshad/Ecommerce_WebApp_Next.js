import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    axios
      .get("api/admin/viewcustomers")
      .then((res) => {
        setCustomers(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Grid container spacing={4}>
        {customers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={customer.id}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: "15px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  Name
                  <p style={{ color: "blue", fontSize: "30px" }}>
                    {customer.username}
                  </p>
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Gmail: {customer.gmail}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={async () => {
                    try {
                      await axios.delete("api/admin/deletecustomer", {
                        params: {
                          user_gmail: customer.gmail,
                        },
                      });
                      alert(customer.gmail);
                      setCustomers((prevCustomers) =>
                        prevCustomers.filter((c) => c.gmail !== customer.gmail)
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
    </div>
  );
}
