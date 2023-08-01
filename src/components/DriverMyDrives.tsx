import { Alert, Button, Pagination, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import driverDriveAdvertismentService, { IdriveForDrive } from "../servise/DriverDriveAdvertismentService";
import { variables } from "../Variables";
import DriverHistoryList from "./DriverHistoryList";
import PassengerHistoryList from "./PassengerHistoryList";
import Register from "./Register";
import "../StyleHomePage.css";
import DriveFutureDrivesAcordion from "./DriveFutureDrivesAcordion";
import AddDriverAddvertisment from "./AddDriverAddvertisment";
import DriverDrivesHistory from "./DriverDrivesHistory";
import "../Design/driver.css"
import "../Design/driverHistory.css"

export default function DriverMyDrives(props: any) {
  // let size = 1;

  // const [futureDrives, setFutureDrives] = useState<IdriveForDrive[]>([]);
  const [openAddDrive, setOpenAddDrive] = React.useState(false);
  const [size1, setSize1] = useState(1);
  const countOfLfs = 4;
  const location = useLocation();
  const [smallAd, setSmallAd] = useState(props.futureDrives.slice(0, countOfLfs));


// const getFutureDrivesByDriverId=()=>{
//   driverDriveAdvertismentService.GetFutureDrivesByDriverId(props.data).then(res => { props.setFutureDrives(res.data) })

// }
useEffect(() => {
props.getUserDetails();
props.getFutureDrivesByDriverId();

}, [props.userDetails]);
  useEffect(() => {
    props.getFutureDrivesByDriverId();
  }, [])
  // useEffect(() => {
  //   driverDriveAdvertismentService.GetFutureDrivesByDriverId(props.data).then(res => { props.setFutureDrives(res.data) })
  // }, [props.futureDrives])
  useEffect(() => {
    setSmallAd(props.futureDrives.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
  },[])
  useEffect(() => {

    setSmallAd(props.futureDrives.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
  }, [props.futureDrives])
  useEffect(() => {
    debugger
   if(smallAd.length===0 && props.futureDrives.length!=0)
   handleChangePagination(null,size1-1)
}, [smallAd])
  const handleChangePagination = (event: any, value: any) => {
    setSize1(value)
    let x = props.futureDrives.slice((value - 1) * countOfLfs, value * countOfLfs);
    setSmallAd(x);
  };



  const handleClickOpenAddDrive = () => {
    setOpenAddDrive(true);
  }

  const driveHistory = async () => {
    // navigate("../DriverDrivesHistory", { state: { driverId: props.userDetails?.userId } });
    // <div className="DriverMyDrives"><DriverDrivesHistory driverId={ props.userDetails?.userId}> </DriverDrivesHistory></div>
    props.setFlag3(false);
    props.setFlag2(true);
  }
  const myDrive = async () => {
    // navigate("../DriverDrivesHistory", { state: { driverId: props.userDetails?.userId } });
    // <div className="DriverMyDrives"><DriverDrivesHistory driverId={ props.userDetails?.userId}> </DriverDrivesHistory></div>
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
    {!props.flag3 &&<button className="driveHistoryButton1" onClick={myDrive}>
       חזרה לנסיעות שלי
    </button>}
    {props.flag3 && <div className="myDrivesTitle" dir="rtl">הנסיעות שלי</div>}
    {!props.flag3 && <div className="myDrivesTitle" dir="rtl">הסטורית נסיעות</div>}

    <h1 id="day" dir="rtl">יום {day}, {new Date().toLocaleDateString()}</h1>


    {props.flag3 && <div>
    {smallAd.length > 0 ? (

      smallAd.map((data: IdriveForDrive) => (
        <DriveFutureDrivesAcordion getPassenger={props.getPassenger} getFutureDrivesByDriverId={props.getFutureDrivesByDriverId}obj={data}></DriveFutureDrivesAcordion>
      ))
    ) : (
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">אין פריטים מתאימים לחיפוש</Alert>
      </Stack>
    )}


    <Stack id="stackHistory2">
      <Pagination id=""
        count={Math.ceil(props.futureDrives.length / countOfLfs)}
        color="standard"
        onChange={handleChangePagination}
      />
    </Stack></div>}
    <AddDriverAddvertisment getFutureDrivesByDriverId={props.getFutureDrivesByDriverId}  openAddDrive={openAddDrive} setOpenAddDrive={setOpenAddDrive} userDetails={props.userDetails} setSmallAd={setSmallAd} smallAd={smallAd} setFutureDrives={props.setFutureDrives} />
    {props.flag2 && <DriverDrivesHistory getUserDetails={props.getUserDetails} driverId={props.userDetails.userId} ></DriverDrivesHistory>}

  </div>

  )

}