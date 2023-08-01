//לבדוק שיש מספיק מקומות ברכב לפי מה שביקש
import React, { useEffect, useState } from "react";

import driverDriveAdvertismentService, { IdriveForDrive, IdriverDriveAdvertisment } from "../servise/DriverDriveAdvertismentService";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import userService, { Iuser } from "../servise/UserService";
import { useLocation } from "react-router";
import UpdateUserDetailsDialog from "./UpdateUserDetailsDialog";
import PassengerFutureDrivesGrid from "./PassengerFutureDrivesGrid";
import { Link, useNavigate } from "react-router-dom";
import "../Design/passenger.css"
import PassengerHistoryList from "./PassengerHistoryList";
import PassengerDrivesHistory from "./PassengerDrivesHistory";
import { ReactComponent as Logo } from "../Design/Logo.svg"
import DriverAdvertismentGrid2 from "./DriverAdvertismentGrid2";
import passengerRequestsService from "../servise/PassengerRequestsService";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Cookies from "universal-cookie";

export default function Passenger(props: any) {
  const {state} = useLocation();
  const { userId } = state;

  const [passengerFutureDrives, setPassengerFutureDrives] = useState<IdriveForDrive[]>([]);


  const [userDetails, setUserDetails] = useState<Iuser>();
  const [activeDriverAdvertisment, setActiveDriverAdvertisment] = useState<IdriveForDrive[]>([]);
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(true);
  const [open, setOpen] = React.useState(false);
  const [openAddPassengerRequest, setOpenAddPassengerRequest] = React.useState(false);
  const [openUserDetailsDialog, setOpenUserDetailsDialog] = React.useState(false);
  const navigate = useNavigate();

  const [userNewDetails,setUserNewDetails] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    userId: "",
    phoneNumber: "",
    genderId: 0,
    password: ""
  })

  const handleClickOpen = () => {
    userNewDetails.id = userDetails?.id != null ? userDetails.id : 0;
    userNewDetails.firstName = userDetails?.firstName != null ? userDetails.firstName : "";
    userNewDetails.lastName = userDetails?.lastName != null ? userDetails.lastName : "";
    userNewDetails.userId = userDetails?.userId != null ? userDetails.userId : "";
    userNewDetails.phoneNumber = userDetails?.phoneNumber != null ? userDetails.phoneNumber : "";
    userNewDetails.genderId = userDetails?.genderId != null ? userDetails.genderId : 0;
    userNewDetails.password = userDetails?.password != null ? userDetails.password : "";
    setOpenUserDetailsDialog(true);
  };


  
  const amountOfAvailableSeats = (rowData: any) => {
    return <span>{rowData.amonntOfAvailableSeats}/{rowData.amountOfseats}</span>
  }
  const filterDate = (value: any, filter: string | null | undefined) => {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return true;
    }
  }

  const getActiveDrives = () => {
    driverDriveAdvertismentService.GetActiveDrives().then(res => { setActiveDriverAdvertisment(res.data); });
  }

  const handleOpenAddPassengerRequest = () => {


    setOpenAddPassengerRequest(true);
  }


  useEffect(() => {
    userService.getUserDetails(userId).then((res) => { setUserDetails(res.data) });

  }, []
  );
  /////////////////////////////////////////////////change
  useEffect(() => {
    userService.getUserDetails(userId).then((res) => { setUserDetails(res.data) });

  }, [userDetails]
  );


  const driverDetails = (rowData: any) => {
    return (
      <>
        <span>{rowData.firstName} {rowData.lastName}</span><br></br>
        <span>{rowData.phoneNumber}</span><br></br> <span>{rowData.userId}</span></>
    )

  }
  const gender = (rowData: any) => {
    let gender: string = "";
    if (rowData.genderId == 1)
      gender = "זכר"
    if (rowData.genderId == 2)
      gender = "נקבה"
    if (rowData.genderId == 3)
      gender = "ללא הגבלה"

    return (
      <span>{gender}</span>
    )

  }
  // const history = () => {
  //   navigate("../PassengerDrivesHistory", { state: { passengerId: userDetails?.userId } });
  // }

  // const driverAdvertismentGrid = () => {
  //   if (userDetails)
  //     return (
  //       <DriverAdvertismentGrid setOpen={setOpen} idOfUserDetails={userDetails.id} />
  //     )
  // }
  // const passengerFutureDrivesGrid = () => {
  //   if (userDetails)
  //     return (
  //       <PassengerFutureDrivesGrid userDetails={userDetails} />

  //     )
  // }

  const editUserName = () => {
    userNewDetails.id = userDetails?.id != null ? userDetails.id : 0;
    userNewDetails.firstName = userDetails?.firstName != null ? userDetails.firstName : "";
    userNewDetails.lastName = userDetails?.lastName != null ? userDetails.lastName : "";
    userNewDetails.userId = userDetails?.userId != null ? userDetails.userId : "";
    userNewDetails.phoneNumber = userDetails?.phoneNumber != null ? userDetails.phoneNumber : "";
    userNewDetails.genderId = userDetails?.genderId != null ? userDetails.genderId : 0;
    userNewDetails.password = userDetails?.password != null ? userDetails.password : "";
    setOpenUserDetailsDialog(true);
  }


  const GetPassengerFutureDrives=()=>{
    if(userDetails)
    passengerRequestsService.GetPassengerFutureDrives(userDetails.userId).then(res => { setPassengerFutureDrives(res.data);  });
  
    

  }
  const getUserDetails = () => {

    userService.getUserDetails(userId).then((res) => { setUserDetails(res.data) });



}
  const logOut = () => {
    const cookies = new Cookies();
    cookies.remove('password', { path: '/' });
    cookies.remove('email', { path: '/' });
   navigate("/");



}
  return (
    <div >

{userDetails && <div className="namePassenger">{userDetails.firstName} {userDetails.lastName}</div>}
     <button id="editUserName" onClick={()=>editUserName()}>לעריכת פרופיל</button>
      <Link to={"/"}><Logo className="logoPassenger"></Logo></Link>

   
      <UpdateUserDetailsDialog setUserNewDetails={setUserNewDetails} setOpenUserDetailsDialog={setOpenUserDetailsDialog} openUserDetailsDialog={openUserDetailsDialog} userDetails={userDetails} userNewDetails={userNewDetails} />

      {userDetails && <div id="DriverAdvertismentGrid1"><DriverAdvertismentGrid2 GetPassengerFutureDrives={GetPassengerFutureDrives}  getActiveDrives={getActiveDrives} 
      activeDriverAdvertisment={activeDriverAdvertisment} setOpen={setOpen} idOfUserDetails={userDetails.id} />
      </div>}
      {userDetails &&<div id="PassengerFutureDrivesGrid1"><PassengerFutureDrivesGrid getUserDetails={getUserDetails} GetPassengerFutureDrives={GetPassengerFutureDrives} setPassengerFutureDrives={setPassengerFutureDrives}
       passengerFutureDrives={passengerFutureDrives} getActiveDrives={getActiveDrives} setFlag3={setFlag3} flag2={flag2} setFlag2={setFlag2} flag3={flag3} userDetails={userDetails} /></div>}
                <button className="logout" onClick={()=>logOut()}>יציאה<LogoutOutlinedIcon></LogoutOutlinedIcon> </button>

    </div>


  )
}