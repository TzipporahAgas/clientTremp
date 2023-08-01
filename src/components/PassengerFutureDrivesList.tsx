import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, CircularProgress, IconButton, Snackbar, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactComponent as Line } from "../Design/Line.svg"
import "../Design/driverHistory.css"
import "../Design/driver.css"
import "../Design/passengerFutureDrives.css"
import { ReactComponent as Line9 } from "../Design/Line9.svg";

import passengerRequestsService from "../servise/PassengerRequestsService";
import driverDriveAdvertismentService from "../servise/DriverDriveAdvertismentService";

export default function PassengerFutureDrivesList(props: any) {
    const [loader, setLoader] = useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel: any) => (event: any, isExpanded: any) => {
        setExpanded(isExpanded ? panel : false);
    };

    const cancelDrive = async (driveToDelete: any) => {
        console.log("driveToDelete", driveToDelete)
        if (driveToDelete.status == 1) {
            console.log(driveToDelete.idFromPassengerRequst, "driveToDelete.hhhhhhhhhhhhhhhhhhhhhh")
           setOpenAlert(true)
            setLoader(true);
            await passengerRequestsService.DeletePassengerRequest(driveToDelete.idFromPassengerRequst, driveToDelete.status, props.userDetails.id)
            setLoader(false);
            setOpenAlert(false)

        }

        if (driveToDelete.status == 2) {
            console.log(driveToDelete.idFromPassengerRequst, "driveToDelete.yyyyyyy")
            setOpenAlert(true)

            setLoader(true);
            await passengerRequestsService.DeletePassengerRequest(driveToDelete.idFromDriverAdvertisment, driveToDelete.status, props.userDetails.id)
            setLoader(false);
            setOpenAlert(false)

        }
        props.getActiveDrives();
        props.GetPassengerFutureDrives();
    }

    return (
        <div>
            <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }} open={openAlert} autoHideDuration={6000} >
                <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
                    הביטול מתבצע  ונשלח מייל לנהג על ביטול הנסיעה!                    </Alert>
            </Snackbar>
            <div id="passengerfutureDrives7" dir="rtl">
                {loader && <CircularProgress className="loaderCancel" />}
                <br></br>
                <div id="first_lastName7">{props.obj.firstName} {props.obj.lastName} </div>
                <div id="sourse7">רח' {props.obj.sourceStreet} - {props.obj.sourceCity} </div>
                <div id="date_time7">{new Date(props.obj.date).toLocaleDateString()} {props.obj.hour}:{props.obj.minuts} </div>
                <Line9 id="line75"></Line9>
                <div id="destination7">רח' {props.obj.destinationStreet} - {props.obj.destinationCity} </div>
                <div id="phone7"><LocalPhoneIcon ></LocalPhoneIcon> {props.obj.phoneNumber} </div>
                <div id="email7"><MailOutlineIcon ></MailOutlineIcon> {props.obj.userId} </div>
                <div id="numOfSeets7">הזמנת {props.obj.amountOfseats} מקומות</div>
                <Button className={loader ? "notAllowedCancel" : "cancelbutton7"} disabled={loader} onClick={() => cancelDrive(props.obj)}>ביטול נסיעה</Button>


            </div>
        </div>
    )
}