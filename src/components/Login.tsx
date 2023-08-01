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
import Bar from "./Bar";


export default function Login() {
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // http://localhost:3000/newPassword/MzYyMTM5MzkwMjhAbWJ5LmNvLmls
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [showPassword, setShowPassword] = React.useState(false);
  const [emailIsValid, setEmailIsValid] = React.useState(false);
  const [flag, setFlag] = React.useState(true);
  const [flagAdd, setFlagAdd] = React.useState(false);
  const [result, setResult] = React.useState(0);
  const [userDetails, setUserDetails] = useState<Iuser>();
  const [flagOpenRegister, setFlagOpenRegister] = useState(false);
  const toastBC = useRef<Toast>(null);
  const [all, setAll] = useState<IdriveForDrive[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [isUser, setIsUser] = React.useState(false);
  const [allowLogin, setAllowLogin] = React.useState(false);
  const [emailCookies, setEmailCookie] = useCookies(['email']);
  const [passwordCookies, setPasswordCookie] = useCookies(['password']);
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");

  const chekIfUserExistDriver = async () => {
    debugger
    if (id == "" && atob(emailCookies.email) == "" || password == "" && atob(passwordCookies.password) == "") {
      setFlag(false)
      setFlagOpenRegister(true);

    }
    else {
      userService.chekIfUser(id ? id : atob(emailCookies.email), password ? password : atob(passwordCookies.password)).then((result) => {

        if (result.data) {
          userService.getUserDetails(id ? id : atob(emailCookies.email)).then((res: any) => {
            debugger;
            setUserDetails(res.data)

            setEmailCookie('email', btoa(id), { path: '/' });
            setPasswordCookie('password', btoa(password), { path: '/' });
            navigate("../Driver", { state: { userId: res.data.userId } });
          }
          )
        }
        else {
          setFlag(false)
          setFlagOpenRegister(true);

        }
      })
    }
  }
  const clear = (submit: boolean) => {
    toastBC.current?.clear();
    if (submit)
      navigate("../ForgetPassword", { state: { all: all, flagAdd: flagAdd } })

  };


  const chekIfUserExistPassenger = async () => {

    if (id == "" && atob(emailCookies.email) == "" || password == "" && atob(passwordCookies.password) == "") {
      setFlag(false)
      setFlagOpenRegister(true);
    }
    else {
      userService.chekIfUser(id ? id : atob(emailCookies.email) ? atob(emailCookies.email) : "", password ? password : atob(passwordCookies.password) ? atob(passwordCookies.password) : "").then((result) => {
        if (result.data) {
          userService.getUserDetails(id ? id : atob(emailCookies.email)).then((res: any) => {
            debugger;
            setUserDetails(res.data)
            setEmailCookie('email', btoa(id), { path: '/' });
            setPasswordCookie('password', btoa(password), { path: '/' });
            navigate("../Passenger", { state: { userId: res.data.userId } });
          }
          )
        }
        else {
          setFlag(false)
          setFlagOpenRegister(true);

        }
      })
    }
  }
  useEffect(() => {
    if (emailCookies.email && passwordCookies.password) {
      userService.chekIfUser(atob(emailCookies.email), atob(passwordCookies.password)).then((result: any) => {
        debugger
        if (result) {
          userService.getUserDetails(atob(emailCookies.email)).then((res: any) => {
            debugger;
            setUserDetails(res.data)
          })
          console.log("res2", result);
          setIsUser(true);
        }

      })
    }

  }, [])
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const forgetPassword = () => {
    toastBC.current?.show({
      severity: 'info',
      sticky: true,
      className: 'border-none',
      content: (
        <div className="flex flex-column align-items-center" style={{ flex: '1' }}>
          <div className="text-center">
            <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem' }}></i>
            <div className="font-bold text-xl my-3">לשנות סיסמא?</div>
          </div>
          <div className="flex gap-2">
            <Button onClick={(e) => clear(true)} type="button" className="p-button-success w-6rem" >אישור</Button>
            <Button onClick={(e) => clear(false)} type="button" className="p-button-warning w-6rem" >ביטול</Button>

          </div>
        </div>
      )
    });


  }

  const register = async () => {
    setFlag(false)
    setFlagOpenRegister(true);
  }


  const logOut = () => {
    const cookies = new Cookies();
    cookies.remove('password', { path: '/' });
    cookies.remove('email', { path: '/' });
    navigate("./");
    setIsUser(false)
  }

  const login = async () => {
    setId("")
    setPassword("")
    setFlag(true)
    setFlagOpenRegister(false);
  }

  useEffect(() => {
    passengerRequestsService.GetlatestAddvertisments().then((res: any) => setAll(res.data)).then((res: any) => setFlagAdd(true));
  }, [])

  const validateEmail = () => {

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

    // setEmailIsValid(regex.test(id))
    if (regex.test(id)
    )
      //valid
      setResult(1)
    else {
      //not valid
      setResult(2)
    }

  }




  const aa = () => {

    console.log((atob(passwordCookies.password) == "" || atob(emailCookies.email) == ""))
  }

  // 
  return (

    <div >
      <button className="logoutHome" onClick={() => logOut()}>יציאה<LogoutOutlinedIcon></LogoutOutlinedIcon> </button>
      <Toast ref={toastBC} position="bottom-right" />
      <Toast ref={toastBC} position="bottom-center" />

      {isUser &&
        <div className="helloTo">
          <h1 >שלום {userDetails?.firstName} {userDetails?.lastName}</h1>
          <h1>אנחנו כבר מכירים אותך <WavingHandIcon></WavingHandIcon></h1></div>
      }

      <Bar flagAdd={flagAdd} all={all} ></Bar>



      <div>
        {!flagOpenRegister && !isUser && <h1 className="titleMyAccount">:כניסה לאזור האישי</h1>}
        {flag && (<div>  {!isUser && (<div>
          <input dir="rtl" onBlur={validateEmail} id="emailInput" placeholder="אמייל" onChange={(e) => { { setId(e.target.value) } }} ></input>
          {result === 2 && <Alert variant="filled" severity="error" dir="rtl" >
            כתובת המייל שהזנת אינה תקינה          </Alert>}
          <span className="error" id="name-error"></span>
          <br></br>
          <br></br>
          <div>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => { setPassword(e.target.value); setAllowLogin(true) }}

              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>

              } /></div></div>)}
          <br></br>
          <br></br>
          <button
            // disabled={(id == "" || password == "") && (passwordCookies.password && (atob(passwordCookies.password)) == "" || (emailCookies.email && atob(emailCookies.email) == ""))}
            id="driverButton" onClick={chekIfUserExistDriver}> <LocalTaxiTwoToneIcon id="buttonIcon"></LocalTaxiTwoToneIcon>
            <div id="fontDriver">כניסה כנהג </div></button>
          <button id="passengerButton" onClick={chekIfUserExistPassenger}><PersonAddAltOutlinedIcon id="buttonIcon"></PersonAddAltOutlinedIcon>
            <div id="fontDriver">כניסה כנוסע</div> </button>
          <br></br>
          {!isUser && <a id="forgotPassword" href='javascript:void(0)' onClick={forgetPassword}>!שכחת סיסמא? לחץ כאן</a>}
          {!isUser && <a id="register" href='javascript:void(0)' onClick={() => { register() }}>אין לך עדין חשבון? ליצירת חשבון</a>}

          {open && <ForgetPassword />}</div>)}
      </div>
      {flagOpenRegister && <Register setFlagOpenRegister={setFlagOpenRegister} setFlag={setFlag} id={id} password={password}></Register>}
      {flagOpenRegister && <a id="loginRegister2" href='javascript:void(0)' onClick={() => { login() }}>יש לך כבר חשבון? כניסה </a>}
      {/* <button onClick={() => aa()}>yrufyj</button> */}
    </div>

  )
}