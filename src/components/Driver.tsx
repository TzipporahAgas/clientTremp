import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import userService, { Iuser } from "../servise/UserService";
import Button from '@mui/material/Button';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import PassengersRequestsGrid from "./PassengersRequestsGrid";
import DriveFutureDrivesGrid from "./DriverFutureDrivesGrid";
import UpdateUserDetailsDialog from "./UpdateUserDetailsDialog";
import AddDriverAddvertisment from "./AddDriverAddvertisment"
import driverDriveAdvertismentService, { IdriveForDrive } from "../servise/DriverDriveAdvertismentService";
import passengerRequestsService from "../servise/PassengerRequestsService";
import "../Design/driver.css"
// import "../Design/logo.svg"
import { ReactComponent as Logo } from "../Design/Logo.svg"
import "bootstrap/dist/css/bootstrap.css";
import { Autocomplete, cardContentClasses, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SelectChangeEvent, TextField } from "@mui/material";

import { isDisabled } from "@testing-library/user-event/dist/utils";
import { json } from "stream/consumers";
import DriveFutureDrivesAcordion from "./DriveFutureDrivesAcordion";
import DriverMyDrives from "./DriverMyDrives";
import DriverDrivesHistory from "./DriverDrivesHistory";
import Cookies from "universal-cookie";
// import * as fs from "fs"

export default function Driver() {
  const [loading, setLoading] = useState(false);
  // const [selectedDate, setSelectedDate] = useState(null);
  const [activePassengerRequests, setActivePassengerRequests] = useState<IdriveForDrive[]>([]);

  const [date1, setDate1] = useState<string | Date | Date[] | undefined>(undefined);
  const [userDetails, setUserDetails] = useState<Iuser>();
  const [futureDrives, setFutureDrives] = useState<IdriveForDrive[]>([]);
  const [streets, setStreets] = useState<any[]>([]);
  // const citiesName:string[] =[];
  // const streetsName:string[] =[];

  const location = useLocation();
  const navigate = useNavigate();
  const [globalFilter, setGlobalFilter] = useState(null);
  // const [selectedStreet, setSelectedStreet] = useState("");
  // const [selectedCity, setSelectedCity] = useState("");
  const [flag2, setFlag2] = useState(false);
  const [flag3, setFlag3] = useState(true);
  const { userId } = location.state;

  // const [openAddDrive, setOpenAddDrive] = React.useState(false);
  const dt = useRef(null);
  const [userNewDetails,setUserNewDetails] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    userId: "",
    email: "",
    phoneNumber: "",
    genderId: 0,
    password: ""
  })
  const [openUserDetailsDialog, setOpenUserDetailsDialog] = React.useState(false);


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

  // var allCities = require('./Cities.json');

  // var clearCities = require('./ClearCities.json');

  const getFutureDrivesByDriverId=()=>{
    driverDriveAdvertismentService.GetFutureDrivesByDriverId(userId).then(res => { setFutureDrives(res.data) }).catch((err)=>{
console.log(err);

    })
  
  }




  // const i = async () => {
  // console.log({citiesName});
  //  const newCityArr =await allCities.reduce((acc:any, curr:any) => {
  //       const cityName = curr.city_name;
  //     return {...acc, [cityName]: [...(acc[cityName] || []), curr.street_name] 
  //         };
  //         }, {} as {[city:string]:any[]});
  //         console.log("2");
  // setFlag(true);
  // console.log({clearCities});

  // console.log(JSON.stringify(newCityArr));
  // let city = "";
  //  allCities.map((e:any )=> {
  // if(city!=e.city_name){
  //   citiesName.push(e.city_name)
  //   city=e.city_name;
  // }

  // })




  // console.log({citiesName});

  // citiesName.map((e:any)=>{
  //   e=e.value
  // })

  // }


  // const handleClickOpenAddDrive = () => {
  //   setOpenAddDrive(true);
  // }
  const getPassenger=()=>{
    passengerRequestsService.getPassengerRequest().then(res => { setActivePassengerRequests(res.data) });

}
  useEffect(() => {
    userService.getUserDetails(userId).then((res) => { setUserDetails(res.data) });

  }, []);
  useEffect(() => {
    userService.getUserDetails(userId).then((res) => { setUserDetails(res.data) });

  }, [userDetails]);
  // const driveHistory = async () => {

  //   navigate("../DriverDrivesHistory", { state: { driverId: userDetails?.userId } });

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
    userService.getUserDetails(userId).then((res) => { setUserDetails(res.data) });


  }
  const getUserDetails = () => {
  
    userService.getUserDetails(userId).then((res) => { setUserDetails(res.data) });


}
    const logOut = () => {
      const cookies = new Cookies();
      cookies.remove('password', { path: '/' });
      cookies.remove('email', { path: '/' });
     navigate("../");


  
  }


  return (
    <div >
        
        {userDetails &&<div className="name4">{userDetails?.firstName} {userDetails?.lastName}</div>}
      <button id="editUserName2" onClick={()=>editUserName()}>לעריכת פרופיל</button>



      <Link to={"../"}><Logo className="logo1"></Logo></Link>

      {userDetails &&<div id="PassengersRequestsGrid"><PassengersRequestsGrid getPassenger={getPassenger} activePassengerRequests={activePassengerRequests}  setFutureDrives={setFutureDrives} userDetails={userDetails} /></div>}
      {/* <DriveFutureDrivesGrid data={data} futureDrives={futureDrives} setFutureDrives={setFutureDrives} /> */}
      <UpdateUserDetailsDialog setUserNewDetails={setUserNewDetails} setOpenUserDetailsDialog={setOpenUserDetailsDialog} openUserDetailsDialog={openUserDetailsDialog} userDetails={userDetails} userNewDetails={userNewDetails} />
      {/* <AddDriverAddvertisment openAddDrive={openAddDrive} setOpenAddDrive={setOpenAddDrive} userDetails={userDetails} setFutureDrives={setFutureDrives} /> */}
      {userDetails &&<div id="DriverMyDrives"><DriverMyDrives getUserDetails={getUserDetails} getFutureDrivesByDriverId={getFutureDrivesByDriverId} getPassenger={getPassenger} activePassengerRequests={activePassengerRequests} setFlag3={setFlag3} setFlag2={setFlag2}
     flag3={flag3} flag2={flag2}  futureDrives={futureDrives} userDetails={userDetails} setFutureDrives={setFutureDrives} /></div>}
      {/* {flag2 && <DriverDrivesHistory driverId={userDetails?.userId} ></DriverDrivesHistory>} */}
      <button className="logoutDriver" onClick={()=>logOut()}>יציאה<LogoutOutlinedIcon></LogoutOutlinedIcon> </button>

    </div>


  )
}