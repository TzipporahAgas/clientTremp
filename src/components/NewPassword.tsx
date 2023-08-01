
import { useEffect, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router";
import { Password } from 'primereact/password';
import React from "react";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Bar from "./Bar";
import userService from "../servise/UserService";
import passengerRequestsService from "../servise/PassengerRequestsService";
import { IdriveForDrive } from "../servise/DriverDriveAdvertismentService";
import "../Design/newPassword.css"

const NewPassword = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword2, setShowPassword2] = React.useState(false);
    const navigate = useNavigate();

    const [validationPassword2, setValidationPassword2] = React.useState(false);
    const [validationPassword, setValidationPassword] = React.useState(false);
    const [all, setAll] = useState<IdriveForDrive[]>([]);

    const [flagAdd, setFlagAdd] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
    const [errors, setErrors] = useState<any>({});

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const { email } = useParams();
    const history = useNavigate();
    const confirm = () => {
        if (password !== verifyPassword)
            alert("חוסר סינכרון:(")
        else {
            console.log(email)
            userService.changePassword(email, password)
            navigate("/");

            console.log(email)
        }
    }
    useEffect(() => {
        passengerRequestsService.GetlatestAddvertisments().then((res: any) => setAll(res.data)).then((res: any) => setFlagAdd(true));
      }, [])
    const validatePassword = () => {

        if (!password) {
            setValidationPassword(true)
            return setErrors({ ...errors, password: "חובה להזין סיסמא." });
        }
        if (password.length < 4) {
            setValidationPassword(true)
            return setErrors({ ...errors, password: "סיסמא פחות מ4 תוים" });
        }
    
        setErrors({ ...errors, password: "" });
    };
    const validateVerifyPassword = () => {
        if (password !== verifyPassword) {
            setValidationPassword2(true)
            return setErrors({ ...errors, verifyPassword: "סיסמא לא זהה" });
        }
        if (!verifyPassword) {
            setValidationPassword2(true)
            return setErrors({ ...errors, verifyPassword: "חובה להזין סיסמא." });
        }
        if (verifyPassword.length < 4) {
            setValidationPassword2(true)
            return setErrors({ ...errors, verifyPassword: "סיסמא פחות מ4 תוים" });
        }
        // if (/[!0-9@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/.test(userDTO.password))
        //     return setErrors({ ...errors, password: "שם משתמש לא חוקי" });
        setErrors({ ...errors, verifyPassword: "" });
    };
    return (
        <div >
<Bar flagAdd={flagAdd} all={all} ></Bar>

         <div className="divPsw">
                <form onSubmit={confirm}>
                    <h3 className="restartH3">איפוס סיסמא</h3><br></br>
                    <InputLabel className="newPasswordLabel" htmlFor="outlined-adornment-password"> סיסמא חדשה</InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => { setPassword(e.target.value); setValidationPassword(false) }}
                        className="inputPwd"
                        onBlur={validatePassword}
                        error={!!errors.password}
                        // helperText={errors.password}
                        onInvalid={(e) => { validatePassword(); setValidationPassword(true) }}
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
                        } /><br></br>
                    {validationPassword && <small style={{ 'color': 'red' }} id="username-help"> {errors.password} </small>}
                    <br></br>
                    <InputLabel className="goodPasswordLabel" htmlFor="outlined-adornment-password">אימות סיסמא </InputLabel>
                    <OutlinedInput
                        required
                        id="outlined-adornment-password"
                        type={showPassword2 ? 'text' : 'password'}
                        className="inputPwd"
                        onChange={(e) => { setVerifyPassword(e.target.value); setValidationPassword2(false) }}
                        onBlur={validateVerifyPassword}
                        error={!!errors.verifyPassword}
                        onInvalid={(e) => { validateVerifyPassword(); setValidationPassword2(true) }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword2}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>

                        } /><br></br>
                    {validationPassword2 && <small style={{ 'color': 'red' }} id="username-help"> {errors.verifyPassword} </small>}
                    <br></br>
                    <button className="btnOkPwd" type='submit'>אישור</button>
                </form>
            </div>
        </div>
    )
}
export default NewPassword;