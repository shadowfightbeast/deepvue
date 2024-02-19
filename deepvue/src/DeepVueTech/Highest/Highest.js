import React, { useState, useEffect } from "react";
import "./Highest.css";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Data from "../../Data/Data";
import  NavbarComponent from '../Navbar/Navbar'


// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const Highest = () => {
  const [dataTable, setDataTable] = useState([]);
  const [dataTableDebit,setDataTableDebit]=useState([]);
  const sortData=(data)=>{
          let array=[];
          data.sort( (a,b) => b.Amount - a.Amount );
          // console.log(data)
          for(let i=0;i<10;i++){
                    array.push(data[i]);
          }
          setDataTable(array);
  }
  const sortDataDebit=(data)=>{
          let array=[];
          data.sort( (a,b) => b.Amount - a.Amount );
          // console.log(data)
          for(let i=0;i<10;i++){
                    array.push(data[i]);
          }
          setDataTableDebit(array);
  }
  const getData = (users) => {
    let arr = [];
    users.map((user) => {
      let obj = {};
      obj["Date"] = user.Date;
      obj["Particular"] = user.Particular;
      obj["Classification"] = user.FirstLevelClassification;
      obj["Amount"] = user.Credit;
      arr.push(obj);
    });
    sortData(arr);
  };
  const getDataDebit = (users) => {
          let arr = [];
          users.map((user) => {
            let obj = {};
            obj["Date"] = user.Date;
            obj["Particular"] = user.Particular;
            obj["Classification"] = user.FirstLevelClassification;
            obj["Amount"] = user.Debit;
            arr.push(obj);
          });
          sortDataDebit(arr);
        };

  useEffect(() => {
    getData(Data.USERS[0].Data.Bank);
    getDataDebit(Data.USERS[0].Data.Bank);
  }, []);

  return (
          <>
          <NavbarComponent/>
<div className="parent">
          <div className="mains">
          <h3>Top 10 Highest Credit Transaction</h3>
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Narration</th>
          <th>Classification</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
       {
       dataTable?.map((user)=> 
        <tr>
          <td>{user.Date}</td>
          <td>{user.Particular}</td>
          <td>{user.Classification}</td>
          <td>{user.Amount}</td>
        </tr>)}
      </tbody>
    </Table>
    </div>
    <div className="mains">
          <h3>Top 10 Highest Debit Transaction</h3>
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Narration</th>
          <th>Classification</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
       {
       dataTableDebit?.map((user)=> 
        <tr>
          <td>{user.Date}</td>
          <td>{user.Particular}</td>
          <td>{user.Classification}</td>
          <td>{user.Amount}</td>
        </tr>)}
      </tbody>
    </Table>
    </div>
    </div>
    </>
  );
};

export default Highest;
