import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import "./Piechart.css";
import Data from "../../Data/Data";
import moment from "moment";
import NavbarComponent from "../Navbar/Navbar";

// const labels = ["January", "February", "March", "April", "May", "June"];

const PieChart = () => {
  // const [data,setdata]=useState([]);
  const [salary, setSalary] = useState(0);
  const [Rent, setRent] = useState(0);
  const [Deposit, setDeposit] = useState(0);
  const [With, setWith] = useState(0);
  const filterdata = (users) => {
    let num_Salary = 0;
    let Rent = 0;
    let DepositR = 0;
    let With = 0;
    users?.map((user) => {
      if (
        user.FirstLevelClassification == "Salary" &&
        user.Particular == "Salary"
      ) {
        num_Salary += parseInt(user.Credit);
      } else if ((user.Particular = "Rent")) {
        Rent += parseInt(user.Debit);
      }
    });
    users.map((user) => {
      if (user.FirstLevelClassification == "Cash Deposit") {
        DepositR += parseInt(user.Credit);
      } else if (user.FirstLevelClassification == "Cash Withdrawal") {
        With += parseInt(user.Debit);
      }
    });
    setSalary(num_Salary);
    setRent(Rent);
    setDeposit(DepositR);
    setWith(With);
  };
  const data = {
    datasets: [
      {
        label: "Our Detailed Breakdown",
        backgroundColor: "#7B66FF",
        borderColor: "#83A2FF",
        data: [salary, Rent, Deposit, With],
      },
    ],
  };
  const handleClick = (data) => {
    let users = Data.USERS[0].Data.Bank;
    // const date = new Date(entry.Date);
    let num_Salary = 0;
    let Rent = 0;
    let DepositR = 0;
    let With = 0;
    const currentDate = new Date();
    let DaysAgo = "";
    if (data == 7) {
      DaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (data == 30) {
      DaysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    } else {
      DaysAgo = new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000);
    }
    const day = moment(DaysAgo).format("MM-DD-YYYY").toString();
    users?.map((user) => {
      if (
        new Date(day) <= new Date(user.Date) &&
        user.FirstLevelClassification == "Salary" &&
        user.Particular == "Salary"
      ) {
        num_Salary += parseInt(user.Credit);
      } else if (
        new Date(day) <= new Date(user.Date) &&
        user.Particular == "Rent"
      ) {
        Rent += parseInt(user.Debit);
      }
    });
    users.map((user) => {
      if (
        new Date(day) <= new Date(user.Date) &&
        user.FirstLevelClassification == "Cash Deposit"
      ) {
        DepositR += parseInt(user.Credit);
      } else if (
        new Date(day) <= new Date(user.Date) &&
        user.FirstLevelClassification == "Cash Withdrawal"
      ) {
        With += parseInt(user.Debit);
      }
    });
    setSalary(num_Salary);
    setRent(Rent);
    setDeposit(DepositR);
    setWith(With);
  };
  useEffect(() => {
    filterdata(Data.USERS[0].Data.Bank);
  }, [Data]);
  return (
    <>
      <NavbarComponent />
      <div className="Piechart">
        <div className="Module">
          <div className="header">
            <h3 className="statement">Statement Summary</h3>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div className="analytics">See analytics for</div>
              <div className="capsules">
                <div className="capsule" onClick={() => handleClick(7)}>
                  Last 7 Days
                </div>
                <div className="capsule" onClick={() => handleClick(30)}>
                  Last 30 Days
                </div>
                <div className="capsule" onClick={() => handleClick(90)}>
                  Last 3 Months
                </div>
                {/* <div className="capsule">Last 7 Days</div> */}
              </div>
            </div>
          </div>
          <div className="lower">
            <div className="Pie">
              <div style={{ width: "100%", padding: "20px" }}>
                <Pie data={data} />
              </div>
            </div>
            <div className="Details">
              <h3> Detailed breakDown of Income</h3>
              <div className="Small_Cards">
                <div className="Cards">
                  <div style={{ color: "#7B66FF" }}>Salary</div>
                  <div style={{ paddingTop: "10px", color: "#7B66FF" }}>
                    {salary}
                  </div>
                </div>
                <div className="Cards">
                  <div style={{ color: "#7B66FF" }}>Rent</div>
                  <div style={{ paddingTop: "10px", color: "#7B66FF" }}>
                    {Rent}
                  </div>
                </div>
              </div>
              <div className="Small_Cards">
                <div className="Cards">
                  <div style={{ color: "#7B66FF" }}>Deposit</div>
                  <div style={{ paddingTop: "10px", color: "#7B66FF" }}>
                    {Deposit}
                  </div>
                </div>
                <div className="Cards">
                  <div style={{ color: "#7B66FF" }}>Withdrawal</div>
                  <div style={{ paddingTop: "10px", color: "#7B66FF" }}>
                    {With}
                  </div>
                </div>
              </div>
              <div>
                {/* <div className="Cards"></div>
                    <div className="cards"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PieChart;
