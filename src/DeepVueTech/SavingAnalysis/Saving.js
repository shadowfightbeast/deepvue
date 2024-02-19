import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./Saving.css";
import Data from "../../Data/Data";
import moment from "moment";
import NavbarComponent from "../Navbar/Navbar";

const Saving = () => {
  const [Saving, setSaving] = useState([]);
  const [Expense, setExpense] = useState([]);
  const filterSaving = (users) => {
    let Balance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    users.map((user) => {
      Balance[parseInt(moment(user.Date).format("DD")) - 1] += parseInt(
        user.Balance
      );
    });
    for (let i = 0; i < 12; i++) {
      Balance[i] = Balance[i] % 100;
    }
    setSaving(Balance);
  };
  const filterExpense = (users) => {
    let Balance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    users.map((user) => {
      if (user.FirstLevelClassification == "Utility Expenses")
        Balance[parseInt(moment(user.Date).format("DD")) - 1] += parseInt(
          user.Debit
        );
    });
    for (let i = 0; i < 12; i++) {
      Balance[i] = Balance[i] % 100;
    }
    setExpense(Balance);
  };
  useEffect(() => {
    filterSaving(Data.USERS[0].Data.Bank);
    filterExpense(Data.USERS[0].Data.Bank);
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
        data: Saving,
      },
      {
        label: "",
        backgroundColor: "#ee7d31",
        borderColor: "#ee7d31",
        data: Expense,
      },
    ],
  };

  return (
    <>
      <NavbarComponent />
      <div className="parent">
        <div className="main">
          <div className="heading">Savings Analysis (In Percentage)</div>
          <div className="BarChart">
            <Bar data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Saving;
