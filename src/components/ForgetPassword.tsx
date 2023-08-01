// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import { generatePath } from "react-router";
// import UserService from "../servise/UserService";

// export default function ForgetPassword() {


//     const [open, setOpen] = React.useState(true);
//     const [email, setEmail] = React.useState("");
//     const history = useNavigate();

//     const handleData = () => {
//         UserService.getEmail(email);
//         setOpen(false);
//         history(generatePath("/sendEmail"));
//     };
//     const handleClose = () => {
//         setOpen(false);
//     }
// return(
//     <>
//         <Dialog open={open} onClose={handleClose}>
//             <form onSubmit={handleData}>
//                 <DialogTitle>שכחתי סיסמא</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         onChange={(e) =>
//                             setEmail(e.target.value)}
//                         autoFocus
//                         required
//                         margin="dense"
//                         id="name"
//                         label="הכנס כתובת אימייל"
//                         type="email"
//                         fullWidth
//                         variant="standard"
//                     /><br></br><br></br>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>ביטול</Button>
//                     <Button type="submit">אישור</Button>
//                 </DialogActions>
//                 </form>
//             </Dialog>
//     </>
// )
// }
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { generatePath, useLocation } from "react-router";
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import userService from "../servise/UserService";
import Bar from "./Bar";
import "../Design/forgetPassword.css"


const ForgetPassword = () => {
    const [email, setEmail] = React.useState("");
    const location = useLocation();
    const { all,flagAdd } = location.state;

    const toast = useRef<Toast>(null);

    const showSuccess = () => {
        toast.current?.show({ severity: 'success', summary: 'המייל נשלח בהצלחה!', detail: 'נא לפתוח את המייל ולפעול בהתאם', life: 60000 });
    }

    const handleData = async () => {
        await userService.getEmail(email)
    
        await showSuccess()
    };

    return (
        <>
        <Bar all={all} flagAdd={flagAdd}></Bar>
            <Toast ref={toast} position="bottom-left" />
            <div className="bodyLogin">
             
                <div className="txtRestart">איפוס סיסמא</div>
                <label className="txtLableMail">כתובת המייל המעודכנת במערכת</label>
                {/* <form onSubmit={handleData}> */}
                    <input dir="rtl"
                        className="inputMail"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        id="name"
                        placeholder="הכנס כתובת אימייל"
                        type="email"
                        // onBlur={validateMe}
                    /><br></br><br></br>
                    {/* <Button onClick={handleClose}>ביטול</Button> */}
                    <button className="submitMailBtn" onClick={handleData}>אישור</button>
                {/* </form> */}

            </div>
        </>
    )
}
export default ForgetPassword;


