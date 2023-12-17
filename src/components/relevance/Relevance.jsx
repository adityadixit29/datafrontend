import ReactApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../main";

const Relevance = () => {
  const [chartData, setChartData] = useState({
    xaxisCategories: [],
    usageData: [],
  });

  // Filter state variables
  const [selectedDate, setSelectedDate] = useState("2022-10-04");
  const [selectedAge, setSelectedAge] = useState();
  const [selectedGender, setSelectedGender] = useState();
  const [endDate, setEndDate] = useState("2022-10-08");

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
    

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleAgeChange = (event) => {
    setSelectedAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  useEffect(() => {
    // Construct the API request URL with filters
    let apiUrl = `${server}/alldata`;

    // Add filters to the API request URL
    if (selectedDate) {
      apiUrl += `?date=${selectedDate}`;
    }
    if (endDate) {
      apiUrl += `&endDate=${endDate}`;
    }
    if (selectedAge) {
      apiUrl += `&age=${selectedAge}`;
    }

    if (selectedGender) {
      apiUrl += `&gender=${selectedGender}`;
    }

    // Extracting grouped data for chart
    axios.get(apiUrl)
      .then(response => {
        const usage = response.data.totalUsage; // Assuming there's only one result

        // Extracting features (A, B, C, D, E, F) and their values
        const xaxisCategories = Object.keys(usage);
        const usageData = Object.values(usage);

        setChartData({
          xaxisCategories,
          usageData,
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, [selectedDate, selectedAge, selectedGender, endDate]);

  return (
    <>
      <h2>Usage of Features</h2>
      <span>Filters:</span>
            {/* Filter components */}
      <div className="filters">
        <label>Date:</label>
        <input type="date" onChange={handleDateChange} value={selectedDate} />
        <label> to </label>
        <input type="date" onChange={handleEndDateChange} value={endDate} />
        <label>Age:</label>
        <select onChange={handleAgeChange} value={selectedAge || ''}>
          <option value="">select</option>
          <option value="15-25">15-25</option>
          <option value=">25">&gt;25</option>
          {/* Add more options as needed */}
        </select>

        <label>Gender:</label>
        <select onChange={handleGenderChange} value={selectedGender || ''}>
          <option value="">select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          {/* Add more options as needed */}
        </select>
      </div>
      
      <div className="container" style={{ padding: "30px" }}>
        <div className="chart">
          <ReactApexChart
            options={{
              chart: {
                id: "basic-bar",
                toolbar: {
                  show: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              xaxis: {
                categories: chartData.xaxisCategories,
                labels: {
                  style: {
                    colors: "white",
                  },
                },
              },
              yaxis: {
                labels: {
                  style: {
                    colors: "white",
                  },
                },
              },
              tooltip: {
                theme: "dark",
                x: {
                  show: true,
                },
                y: {
                  show: true,
                },
              },
            }}
            series={[
              {
                name: "usage",
                data: chartData.usageData,
              },
            ]}
            type="bar"
            width="900"
            height="400"
          />
        </div>
      </div>
      
    </>
    
  );
}

export default Relevance;
