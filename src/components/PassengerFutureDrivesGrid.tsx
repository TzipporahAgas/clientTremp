
import { Alert, Button, Pagination, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import driverDriveAdvertismentService, { IdriveForDrive } from "../servise/DriverDriveAdvertismentService";
import { variables } from "../Variables";
import "../StyleHomePage.css";
import "../Design/driverHistory.css"
import passengerRequestsService from "../servise/PassengerRequestsService";
import PassengerFutureDrivesList from "./PassengerFutureDrivesList";
import AddPassengerRequstDialog from "./AddPassengerRequstDialog";
import PassengerDrivesHistory from "./PassengerDrivesHistory";

export default function 
PassengerFutureDrivesGrid(props:any) {
  const [size1, setSize1] = useState(1);
  const countOfLfs = 4;
  const [smallAd, setSmallAd] = useState(props.passengerFutureDrives.slice(0, countOfLfs));
  const navigate = useNavigate();
  const [openAddPassengerRequest, setOpenAddPassengerRequest] = React.useState(false);

  useEffect(() => {
    debugger
   if(smallAd.length===0 && props.passengerFutureDrives.length!=0)
   handleChangePagination(null,size1-1)
}, [smallAd])
  useEffect(() => {
 props.GetPassengerFutureDrives();

    console.log("driverId", props.driverId);
  }, [])

  useEffect(() => {
    props.getUserDetails();
    props.GetPassengerFutureDrives();

    }, [props.userDetails]);
  useEffect(() => {
    setSmallAd(props.passengerFutureDrives.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
  },[])
  useEffect(() => {

    setSmallAd(props.passengerFutureDrives.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
  }, [props.passengerFutureDrives])

  const handleChangePagination = (event: any, value: any) => {

   setSize1(value);
    let x = props.passengerFutureDrives.slice((value - 1) * countOfLfs, value * countOfLfs);
    setSmallAd(x);
  };

  const handleClickOpenAddDrive = () => {
    setOpenAddPassengerRequest(true);
  }


 const driveHistory = async () => {
    props.setFlag3(false);
    props.setFlag2(true);
  }
  const myDrive = async () => {

    props.setFlag3(true);
    props.setFlag2(false);
  }
  var days = ["ראשון", "שני", " שלישי", "רביעי", "חמישי", "שישי"];

  var day = days[new Date().getDay()];
  return (<div>
     <button id="AddDriveButton" onClick={handleClickOpenAddDrive}>
      הוספת נסיעה
    </button>
    {props.flag3 && <button className="driveHistoryButton" onClick={driveHistory}>
      הסטורית נסיעות
    </button>}
    {!props.flag3 && <button className="driveHistoryButton1" onClick={myDrive}>
       חזרה לנסיעות שלי
    </button>}
    {props.flag3 && <div className="myDrivesTitle" dir="rtl">הנסיעות שלי</div>}
    {!props.flag3 && <div className="myDrivesTitle" dir="rtl">הסטורית נסיעות</div>}
    <h1 id="day2" dir="rtl">יום {day}, {new Date().toLocaleDateString()}</h1>
    {props.flag3 && <div>
{smallAd.length > 0 ? (
     smallAd.map((data:any) => (
        <PassengerFutureDrivesList GetPassengerFutureDrives={props.GetPassengerFutureDrives} getActiveDrives={props.getActiveDrives} userDetails={props.userDetails} obj={data}></PassengerFutureDrivesList>
    ))
): (
  <Stack sx={{ width: "100%" }} spacing={2}>
    <Alert severity="error">אין פריטים מתאימים לחיפוש</Alert>
  </Stack>
)}

    <Stack id="stackHistory2">
      <Pagination 
        count={Math.ceil(props.passengerFutureDrives.length / countOfLfs)}
        color="standard"
        onChange={handleChangePagination}
      />
    </Stack></div>}
    <AddPassengerRequstDialog setOpenAddPassengerRequest={setOpenAddPassengerRequest} openAddPassengerRequest={openAddPassengerRequest} userDetails={props.userDetails}></AddPassengerRequstDialog>
    {props.flag2 && <PassengerDrivesHistory getUserDetails={props.getUserDetails} passengerId= {props.userDetails?.userId}></PassengerDrivesHistory>}

  </div>

  )

}