import React from "react";

import PieChart from "./DeepVueTech/PieChart/PieChart";
import BarChart from "./DeepVueTech/AverageEOD/AverageEOD";
import Highest from "./DeepVueTech/Highest/Highest";
import Summary from "./DeepVueTech/Summary/Summary";
import Saving from "./DeepVueTech/SavingAnalysis/Saving";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Bar } from "react-chartjs-2";

const App = () => {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          {/* <Route path='/' element={<NavbarComponent/>}/> */}
          <Route path="/saving" element={<Saving />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/highest" element={<Highest />} />
          <Route path="/pie" element={<PieChart />} />
          <Route path="/bar" element={<BarChart />} />
        </Routes>
      </BrowserRouter>
      {/* <Saving/> */}
      {/* <Summary/> */}
      {/* <Highest/> */}
      {/* <PieChart/> */}
      {/* <BarChart/> */}
    </>
  );
};

export default App;
