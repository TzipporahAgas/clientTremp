import axios from "axios";
// import { Password } from "primereact/password";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService, { Iuser } from "../servise/UserService";
import { variables } from "../Variables";
import ForgetPassword from "./ForgetPassword"
import Register from "./Register";
// import { useCookies } from 'react-cookie';
import passengerRequestsService from "../servise/PassengerRequestsService";
import "../Design/login.css"
import { IdriveForDrive } from "../servise/DriverDriveAdvertismentService";
import CallIcon from '@mui/icons-material/Call';
import { Alert, Chip, Icon, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, Stack } from "@mui/material";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LocalTaxiTwoToneIcon from '@mui/icons-material/LocalTaxiTwoTone';
import { ReactComponent as Logo } from "../Design/Logo.svg"
import Passenger from "./Passenger";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import WavingHandIcon from '@mui/icons-material/WavingHand';
// import { Toast } from 'primereact/toast';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import { Cookies, useCookies } from "react-cookie";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

export default function Bar(props:any) {



    return(<>
     <div id="div">
        <Logo id="logoFirst"></Logo>
        
        <div id="div2">!טרמפיסטים ונהגים<br></br><br></br><br></br>
          ...מודעות שפורסמו בדיוק בשבילכם</div>
        <div id="txt3">מודעות שפורסמו ל-24 שעות </div>
      </div>
      {props.flagAdd && (<div>
        {/*  */}
        {props.all[0] && (<div>
          <div id="sqare1"><div id="driver"><div id="driverTxt">נהג</div><div id="source-dest">{props.all[0].sourceCity}-{props.all[0].destinationCity}</div><div id="time">{props.all[0].hour}:{props.all[0].minuts}</div>
            <div id="line"></div>
            <LocalPhoneIcon id="phoneIcon"></LocalPhoneIcon>
            <MailOutlineIcon id="emailIcon"></MailOutlineIcon>
          </div>
            <div id="phone">{props.all[0].phoneNumber}</div>
            <div id="email">{props.all[0].userId}</div>
          </div></div>)}
        {/*  */}
        {props.all[1] && (<div>
          <div id="sqare2"><div id="passenger"><div id="passengerTxt">נוסע</div><div id="source-dest">{props.all[1].sourceCity}-{props.all[1].destinationCity}</div><div id="time">{props.all[1].hour}:{props.all[1].minuts}</div>
            <div id="line"></div>
            <LocalPhoneIcon id="phoneIcon"></LocalPhoneIcon>
            <MailOutlineIcon id="emailIcon"></MailOutlineIcon>
          </div>

            <div id="phone">{props.all[1].phoneNumber}</div>

            <div id="email">{props.all[1].userId}</div>
          </div></div>)}
        {/*  */}
        {props.all[2] && (<div>
          <div id="sqare3"><div id="driver"><div id="driverTxt">נהג</div><div id="source-dest">{props.all[2].sourceCity}-{props.all[2].destinationCity}</div><div id="time">{props.all[2].hour}:{props.all[2].minuts}</div>
            <div id="line"></div>
            <LocalPhoneIcon id="phoneIcon"></LocalPhoneIcon>
            <MailOutlineIcon id="emailIcon"></MailOutlineIcon>
          </div>

            <div id="phone">{props.all[2].phoneNumber}</div>

            <div id="email">{props.all[2].userId}</div>
          </div></div>)}
        {/*  */}
        {props.all[3] && (<div>
          <div id="sqare4"><div id="passenger"><div id="passengerTxt">נוסע</div><div id="source-dest">{props.all[3].sourceCity}-{props.all[3].destinationCity}</div><div id="time">{props.all[3].hour}:{props.all[3].minuts}</div>
            <div id="line"></div>
            <LocalPhoneIcon id="phoneIcon"></LocalPhoneIcon>
            <MailOutlineIcon id="emailIcon"></MailOutlineIcon>
          </div>

            <div id="phone">{props.all[3].phoneNumber}</div>

            <div id="email">{props.all[3].userId}</div>
          </div></div>)}
        {/*  */}

      

      </div>)}</>)
}
