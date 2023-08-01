
import React, { Component, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';

import Login from './components/Login';
import Driver from './components/Driver';
import Passenger from './components/Passenger';
import PassengerDrivesHistory from './components/PassengerDrivesHistory';
import DriverDrivesHistory from './components/DriverDrivesHistory';
import NewPassword from './components/NewPassword';
import ForgetPassword from './components/ForgetPassword';

const App: React.FunctionComponent = () => {


  return (
    <div>    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {/* <Route path="/Login" element={<Login />} /> */}
          <Route path="/Driver" element={<Driver />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />

          <Route path="/Passenger" element={<Passenger />} />
          <Route path="/PassengerDrivesHistory" element={<PassengerDrivesHistory />} />
          <Route path="/DriverDrivesHistory" element={<DriverDrivesHistory />} />
          <Route path="/newPassword/:email" element={<NewPassword />} />
        </ Routes>
      </BrowserRouter>
     </div>
  )
}

export default App;
