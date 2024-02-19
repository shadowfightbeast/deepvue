import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./AverageEOD.css";
import Data from "../../Data/Data";
import moment from "moment";
import NavbarComponent from "../Navbar/Navbar";

const BarChart = () => {
  const [dataEOD, setDataEOD] = useState([]);
  const filterdataEOD = (users) => {
    let Balance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    // console.log(moment("02-01-2024").format('YYYY'))
    users.map((user) => {
      Balance[parseInt(moment(user.Date).format("DD")) - 1] += parseInt(
        user.Balance
      );
    });
    for (let i = 0; i < 12; i++) {
      Balance[i] = Balance[i] / 30;
    }
    setDataEOD(Balance);
  };
  useEffect(() => {
    filterdataEOD(Data.USERS[0].Data.Bank);
  }, []);
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        backgroundColor: "#42cacd",
        borderColor: "#42cacd",
        data: dataEOD,
      },
    ],
  };
  const handleClick = (users, data) => {
    let DaysAgo = "";
    const currentDate = new Date();
    if (data == 7) {
      DaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (data == 30) {
      DaysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else if (data == 90) {
      DaysAgo = new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000);
    } else {
      DaysAgo = new Date(currentDate.getTime() - 180 * 24 * 60 * 60 * 1000);
    }
    let Balance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const day = moment(DaysAgo).format("MM-DD-YYYY");
    //     console.log(day.getTime())
    users.map((user) => {
      if (new Date(day) <= new Date(user.Date)) {
        Balance[parseInt(moment(user.Date).format("DD")) - 1] += parseInt(
          user.Balance
        );
      }
    });
    for (let i = 0; i < 12; i++) {
      Balance[i] = Balance[i] / 30;
    }
    setDataEOD(Balance);
  };
  return (
    <>
      <NavbarComponent />
      <div className="parent">
        <div className="main">
          <div className="heading">Average EOD Balance</div>
          <div className="capsules_eod">
            <div
              className="capsule"
              onClick={() => handleClick(Data.USERS[0].Data.Bank, 7)}
            >
              Last 7 Days
            </div>
            <div
              className="capsule"
              onClick={() => handleClick(Data.USERS[0].Data.Bank, 30)}
            >
              Last 30 Days
            </div>
            <div
              className="capsule"
              onClick={() => handleClick(Data.USERS[0].Data.Bank, 90)}
            >
              Last 3 Months
            </div>
            <div
              className="capsule"
              onClick={() => handleClick(Data.USERS[0].Data.Bank, 180)}
            >
              Last 6 Months
            </div>
          </div>
          <div className="BarChart">
            <Bar data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BarChart;
