import React, { useState, useEffect } from "react";
import "./Summary.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Data from "../../Data/Data";
import NavbarComponent from "../Navbar/Navbar";

const Summary = () => {
  const [CashDeposit, setCashDeposit] = useState(0);
  const [CashWithdrawal, setCashWithdrawal] = useState(0);
  const [RTGS, setRTGS] = useState(0);
  const [Total, setTotal] = useState(0);

  const getData = (users) => {
    let cash_deposit = 0,
      cash_withdrawal = 0,
      rtgs = 0;
    users.map((user) => {
      if (
        user.FirstLevelClassification == "Cash Deposit" &&
        parseInt(user.Credit) >= 50000
      ) {
        cash_deposit++;
      } else if (
        user.FirstLevelClassification == "Cash Withdrawal" &&
        parseInt(user.Debit) >= 50000
      ) {
        cash_withdrawal++;
      } else if (
        user.FirstLevelClassification == "RTGS Receipt" &&
        (parseInt(user.Debit) <= 200000 || parseInt(user.Credit) <= 200000)
      ) {
        rtgs++;
      }
    });
    setCashDeposit(cash_deposit);
    setCashWithdrawal(cash_withdrawal);
    setRTGS(rtgs);
    setTotal(0);
  };
  useEffect(() => {
    getData(Data.USERS[0].Data.Bank);
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="parent">
        <div className="mains">
          <h3>Summary of Exceptional Transactions</h3>
          <Table striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>Particular</th>
                <th>Debit</th>
                <th>Credit</th>
              </tr>
              <tr>
                {/* <th></th> */}
                <th style={{ color: "blue" }}>Category</th>
                <th></th>
                {/* <th></th> */}
                <th style={{ color: "blue" }}>Number</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="align-middle">Cash Deposit &gt;= 50000</td>
                <td>{CashDeposit}</td>
              </tr>
              <tr>
                <td>Cash Withdrawal &gt;=50000</td>
                <td>{CashWithdrawal}</td>
              </tr>
              <tr>
                <td>Cash Deposit &gt;=50% of Average Income</td>
                <td>56</td>
              </tr>
              <tr>
                <td>Cash Withdrawal &gt;= 50% of Average Income</td>
                <td>56</td>
              </tr>
              <tr>
                <td>Cash Deposit &gt; Average Income</td>
                <td>56</td>
              </tr>
              <tr>
                <td>High Value Transactions</td>
                <td>56</td>
              </tr>
              <tr>
                <td>ATM WIthdrawal Not in Multiples of 100</td>
                <td>56</td>
              </tr>
              <tr>
                <td>RTGS Payments less than 2 Lakhs</td>
                <td>{RTGS}</td>
              </tr>
              <tr>
                <td>Transactions on Sunday</td>
                <td>56</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>56</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Summary;
