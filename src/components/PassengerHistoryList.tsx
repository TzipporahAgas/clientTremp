import { Accordion, AccordionDetails, AccordionSummary, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ReactComponent as Line } from "../Design/Line.svg"
import "../Design/passengerHistory.css"
import "../Design/driver.css"

export default function PassengerHistoryList(props: any) {

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel: any) => (event: any, isExpanded: any) => {
        setExpanded(isExpanded ? panel : false);
    };
    
    return (
        <div>
<div id="historyDrive85" dir="rtl">
<br></br>
<div id="first_lastName85">{props.obj.firstName} {props.obj.lastName} </div>
<div id="sourse85">רח' {props.obj.sourceStreet} - {props.obj.sourceCity} </div>
<div id="date_time85">{new Date(props.obj.date).toLocaleDateString()} {props.obj.hour}:{props.obj.minuts} </div>
<Line id="line85"></Line>
<div id="destination85">רח' {props.obj.destinationStreet} - {props.obj.destinationCity} </div>
<div id="phone85"><LocalPhoneIcon ></LocalPhoneIcon> {props.obj.phoneNumber} </div>
<div id="email85"><MailOutlineIcon ></MailOutlineIcon> {props.obj.userId} </div>
</div></div>
       )
}