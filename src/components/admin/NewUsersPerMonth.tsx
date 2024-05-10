import React, { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const userServiceBaseUrl = import.meta.env.VITE_USER_SERVICE_BASEURL;

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const UsersPerMonth = () => {
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`${userServiceBaseUrl}/user-chart-data`, {
        withCredentials: true,
      })
      .then((res) => {
        const data = res.data.usersPerMonth;

        const filledChartData = Array.from({ length: 12 }, (_, i) => {
          const monthData = data.find(
            (item: { x: number }) => item.x === i + 1
          );
          return { label: getMonthName(i + 1), y: monthData ? monthData.y : 0 };
        });
        setChartData(filledChartData);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
        localStorage.removeItem("adminAccessToken");
        navigate("/admin/login");
      });
  }, [navigate]);

  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1",
    title: {
      text: "Users Per Month",
    },
    axisY: {
      includeZero: true,
    },
    axisX: {
      title: "Month",
      interval: 1,
    },
    data: [
      {
        type: "column",
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: chartData,
      },
    ],
  };

  // Helper function to get month name based on month number
  const getMonthName = (monthNumber: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthNumber - 1];
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default UsersPerMonth;
