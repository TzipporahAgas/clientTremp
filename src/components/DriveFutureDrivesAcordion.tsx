import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Pagination, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Design/driverFutureDrives.css"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import driverDriveAdvertismentService, { IdriveForDrive, IdriverDriveAdvertisment } from "../servise/DriverDriveAdvertismentService";
import UpdateDriveDetailsDialog from "./UpdateDriveDetailsDialog";
import { ReactComponent as Line9 } from "../Design/Line9.svg";
import { ReactComponent as LineUp } from "../Design/LineUp.svg";
import DriverDriveAdvertismentService from "../servise/DriverDriveAdvertismentService";
export default function DriverHistoryList(props: any) {
  const [open, setOpen] = React.useState(false);
  const [driveNewDetails,setDriveNewDetails] = useState<IdriverDriveAdvertisment>({
    id: 0,
    driverId: 0,
    date: new Date(),
    sourceCity: "",
    destinationCity: "",
    sourceStreet: "",
    destinationStreet: "",
    genderId: 0,
    amountOfseats: 0,
    amonntOfAvailableSeats: 0,
    price: 0,
    isChosen: false,
    comments: "",
    hour: 0,
    minuts: 0
  })
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };

  const DeleteDriveByid = async(driveToDelete: IdriveForDrive) => {
    debugger
    if (driveToDelete.status == 1) {

     await DriverDriveAdvertismentService.DeleteDriveByid(driveToDelete.idFromPassengerRequst, driveToDelete.status)
    }

    if (driveToDelete.status == 2) {

      await DriverDriveAdvertismentService.DeleteDriveByid(driveToDelete.idFromDriverAdvertisment, driveToDelete.status)
    }
    if (driveToDelete.status == 0) {

      await DriverDriveAdvertismentService.DeleteDriveByid(driveToDelete.idFromDriverAdvertisment, driveToDelete.status)
    }
    props.getFutureDrivesByDriverId();
    props.getPassenger() 
    
    

  }
  const UpdateDriverDetailsById = (driveToUpdate: IdriveForDrive) => {
    if (driveToUpdate.isChosen == true)
      alert("לנסיעה זו רשומים נוסעים, אם ברצונך לערוך שינויים צור איתם קשר")
    else {
      if (driveToUpdate.idFromDriverAdvertisment != 0) {
        setDriveNewDetails({
          ...driveToUpdate,
          id:driveToUpdate.idFromDriverAdvertisment
      })
        // driveNewDetails.id = driveToUpdate.idFromDriverAdvertisment != null ? driveToUpdate.idFromDriverAdvertisment : 0;
      }

      else {
        setDriveNewDetails({
          ...driveToUpdate,
          id:driveToUpdate.idFromPassengerRequst})
        // driveNewDetails.id = driveToUpdate.idFromPassengerRequst != null ? driveToUpdate.idFromPassengerRequst : 0;
      }

      // driveNewDetails.driverId = driveToUpdate.driverId != null ? driveToUpdate.driverId : 0;
      // driveNewDetails.date = driveToUpdate.date != null ? driveToUpdate.date : new Date();
      // driveNewDetails.sourceCity = driveToUpdate.sourceCity != null ? driveToUpdate.sourceCity : "";
      // driveNewDetails.destinationCity = driveToUpdate.destinationCity != null ? driveToUpdate.destinationCity : "";
      // driveNewDetails.sourceStreet = driveToUpdate.sourceStreet != null ? driveToUpdate.sourceStreet : "";
      // driveNewDetails.destinationStreet = driveToUpdate.destinationStreet != null ? driveToUpdate.destinationStreet : "";
      // driveNewDetails.genderId = driveToUpdate.genderId != null ? driveToUpdate.genderId : 0;
      // driveNewDetails.amountOfseats = driveToUpdate.amountOfseats != null ? driveToUpdate.amountOfseats : 0;
      // driveNewDetails.amonntOfAvailableSeats = driveToUpdate.amonntOfAvailableSeats != null ? driveToUpdate.amonntOfAvailableSeats : 0;
      // driveNewDetails.price = driveToUpdate.price != null ? driveToUpdate.price : 0;
      // driveNewDetails.comments = driveToUpdate.comments != null ? driveToUpdate.comments : "";
      // driveNewDetails.hour = driveToUpdate.hour != null ? driveToUpdate.hour : 0;
      // driveNewDetails.minuts = driveToUpdate.minuts != null ? driveToUpdate.minuts : 0;
     
     

      setOpen(true);

    }
    // driverDriveAdvertismentService.GetFutureDrivesByDriverId(props.data).then(res => { props.setFutureDrives(res.data) })

  }

  return (




    <div className="futureDrive" dir="rtl">

      <br></br>
      <div id="first_lastName2">{props.obj.firstName} {props.obj.lastName} </div>
      <div id="sourse2">רח' {props.obj.sourceStreet} - {props.obj.sourceCity} </div>
      <div id="date_time2">{new Date(props.obj.date).toLocaleDateString()} {props.obj.hour}:{props.obj.minuts} </div>
      <div id="destination2">רח' {props.obj.destinationStreet} - {props.obj.destinationCity} </div>
      <div id="phone2"><LocalPhoneIcon id="i" ></LocalPhoneIcon> {props.obj.phoneNumber} </div>
      <div id="email2"><MailOutlineIcon ></MailOutlineIcon> {props.obj.userId} </div>
      {/* <div id="phoneIcon2"></div>
            <div id="emailIcon2"></div> */}
      {/* <Line id="line2"></Line> */}
      <Line9 id="line45"></Line9>
      <Button id="DeleteDriveButton" onClick={() => DeleteDriveByid(props.obj)} >ביטול נסיעה</Button>
      <LineUp id="lineUp"></LineUp>
      <Button id="UpdateDriverDetailsButton" onClick={() => UpdateDriverDetailsById(props.obj)} >עדכון פרטי נסיעה</Button>
      <UpdateDriveDetailsDialog getFutureDrivesByDriverId={props.getFutureDrivesByDriverId}  setDriveNewDetails={setDriveNewDetails}  setOpen={setOpen} open={open} driveNewDetails={driveNewDetails} />


    </div>

  )
}


