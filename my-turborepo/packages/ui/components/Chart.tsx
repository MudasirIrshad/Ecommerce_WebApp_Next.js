import axios from "axios";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Chart() {
  const [chartData, setChartData] = useState({
    countCustomer: 0,
    countProduct: 0,
    countPublishedProducts: 0,
    countUnPublishedProducts: 0,
  });
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    axios
      .get("/api/admin/chart")
      .then((response) => {
        setChartData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after request is done
      });
  }, []);

  // Prepare data for the pie chart
  const data = {
    labels: [
      "Customers",
      "Total Products",
      "Published Products",
      "Unpublished Products",
    ],
    datasets: [
      {
        label: "Count",
        data: [
          chartData.countCustomer,
          chartData.countProduct,
          chartData.countPublishedProducts,
          chartData.countUnPublishedProducts,
        ],
        backgroundColor: [
          "rgb(255, 99, 132)", // Red
          "rgb(54, 162, 235)", // Blue
          "rgb(75, 192, 192)", // Green
          "rgb(255, 205, 86)", // Yellow
        ],
        hoverOffset: 4,
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "100%", height: "auto", maxWidth: "400px" }}>
        <Doughnut data={data} options={{ responsive: true }} />
      </div>
    </div>
  );
}
