import { Accordion, AccordionDetails, AccordionSummary, IconButton, Pagination, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "../Design/driverHistory.css"
import "../Design/driver.css"
import { ReactComponent as Line } from "../Design/Line.svg"

export default function DriverHistoryList(props: any) {

    const [expanded, setExpanded] = React.useState(false);

    // const handleChange = (panel: any) => (event: any, isExpanded: any) => {
    //     setExpanded(isExpanded ? panel : false);
    // };
  

    return (

         
 <div id="historyDrive33" dir="rtl">

<br></br>
<div id="first_lastName33">{props.obj.firstName} {props.obj.lastName} </div>
<div id="sourse33">רח' {props.obj.sourceStreet} - {props.obj.sourceCity} </div>
<div id="date_time33">{new Date(props.obj.date).toLocaleDateString()} {props.obj.hour}:{props.obj.minuts} </div>
<Line id="line33"></Line>
<div id="destination33">רח' {props.obj.destinationStreet} - {props.obj.destinationCity} </div>
<div id="phone33"><LocalPhoneIcon ></LocalPhoneIcon> {props.obj.phoneNumber} </div>
<div id="email33"><MailOutlineIcon ></MailOutlineIcon> {props.obj.userId} </div>
</div>
    //   <Button id="DeleteDriveButton"  >ביטול נסיעה</Button>
    //   <Button id="UpdateDriverDetailsButton"  >עדכון פרטי נסיעה</Button>
      )
}