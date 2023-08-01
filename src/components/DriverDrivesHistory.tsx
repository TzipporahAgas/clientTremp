import { Alert, Button, Pagination, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import driverDriveAdvertismentService, { IdriveForDrive } from "../servise/DriverDriveAdvertismentService";
import { variables } from "../Variables";
import DriverHistoryList from "./DriverHistoryList";
import PassengerHistoryList from "./PassengerHistoryList";
import Register from "./Register";
import "../Design/driverHistory.css"

export default function DriverDrivesHistory(props:any) {
  const countOfLfs = 5;

  const [driverDriveHistory, setDriverDriveHistory] = useState<IdriveForDrive[]>([]);
  const [smallAd, setSmallAd] = useState(driverDriveHistory.slice(0, countOfLfs));
  const [size1, setSize1] = useState(1);

  useEffect(() => {
    console.log("driverId", props.driverId);

    driverDriveAdvertismentService.GetDriveHistoryByDriverId(props.driverId).then(res => { setDriverDriveHistory(res.data); console.log("res", res); });
  }, [])
  useEffect(() => {
    props.getUserDetails();
    driverDriveAdvertismentService.GetDriveHistoryByDriverId(props.driverId).then(res => { setDriverDriveHistory(res.data); console.log("res", res); });

    }, [props.userDetails]);
  useEffect(() => {
    driverDriveAdvertismentService.GetDriveHistoryByDriverId(props.driverId).then(res => { setDriverDriveHistory(res.data) })
    setSmallAd(driverDriveHistory.slice(size1 - 1, size1 + countOfLfs - 1));
  }, [driverDriveHistory])

  const handleChangePagination = (event: any, value: any) => {
    setSize1(value);
    let x = driverDriveHistory.slice((size1 - 1) * countOfLfs, size1 * countOfLfs);
    setSmallAd(x);
  };
  useEffect(() => {
    setSmallAd(driverDriveHistory.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
  },[])
  useEffect(() => {

    setSmallAd(driverDriveHistory.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
  }, [driverDriveHistory])

  // const home=()=>{
  //   navigate("../");
  // }
  return (<div>

    

{smallAd.length > 0 ? (
     smallAd.map((data) => (
      <div id="homepage">
        <DriverHistoryList obj={data}></DriverHistoryList></div>
    ))
): (
  <Stack sx={{ width: "100%" }} spacing={2}>
    <Alert severity="error">אין פריטים מתאימים לחיפוש</Alert>
  </Stack>
)}

    <Stack id="stackHistory33">
      <Pagination 
        count={Math.ceil(driverDriveHistory.length / countOfLfs)}
        color="standard"
        onChange={handleChangePagination}
      />
    </Stack>
  </div>

  )

}