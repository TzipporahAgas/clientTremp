import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import userService, { Iuser } from "../servise/UserService";
import "../Design/updateUserDetailsDialog.css"


export default function DriveFutureDrivesGrid(props: any) {

    const [selectedGender, setSelectedGender] = useState<any>(null);

    const genders = [{ name: "זכר" }, { name: "נקבה" }]
    const handleClose = () => {
        props.setOpenUserDetailsDialog(false);
    };

    const updateUserDetails = () => {

        handleClose()

        userService.UpdateUserDetails(props.userNewDetails);
    }
    const onGenderChange = (e: any) => {
        // console.log(e,"jjjjjjjjjjjjjjjjj")

        setSelectedGender(e);
        console.log(selectedGender, "SelectedGender")
    }

    return (
        <div>
            <Dialog open={props.openUserDetailsDialog} onClose={handleClose}>
                <DialogTitle dir="rtl">עדכון פרטי משתמש
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>

                    <TextField dir="rtl"
                        defaultValue={props.userDetails?.firstName != null ? props.userDetails.firstName : ""}
                        onChange={(e) =>
                            props.setUserNewDetails({
                                ...props.userNewDetails,
                                fistName:e.target.value.toString()
                            })
                            // props.userNewDetails.fistName = e.target.value.toString()
                        }
                        autoFocus
                        margin="dense"
                        style={{  width: '55%', height: '10%',backgroundColor:"#F4F0ED",top:"48%",left:"25%"}}
                        label="שם פרטי"
                        type="text"
                    />
                    <TextField dir="rtl"
                        defaultValue={props.userDetails?.lastName != null ? props.userDetails.lastName : ""}
                        onChange={(e) =>
                            props.setUserNewDetails({
                                ...props.userNewDetails,
                                lastName:e.target.value.toString()
                            })}
                            // props.userNewDetails.lastName = e.target.value
                        autoFocus
                        margin="dense"
                        style={{  width: '55%', height: '10%',backgroundColor:"#F4F0ED",top:"20%",left:"25%"}}
                        label="שם משפחה"
                        type="text"
 
                    />
                   
                    <TextField dir="rtl"
                        defaultValue={props.userDetails?.userId != null ? props.userDetails.userId : ""}
                        onChange={(e) =>
                            props.setUserNewDetails({
                                ...props.userNewDetails,
                                userId:e.target.value
                            })}
                        //     props.userNewDetails.userId = e.target.value
                        // }
                        autoFocus
                        margin="dense"
                        style={{  width: '55%', height: '10%',backgroundColor:"#F4F0ED",top:"48%",left:"25%"}}
                        label=" מייל"
                        type="text"

                    />


                    <TextField dir="rtl"
                        defaultValue={props.userDetails?.phoneNumber != null ? props.userDetails.phoneNumber : ""}
                        onChange={(e) =>
                            props.setUserNewDetails({
                                ...props.userNewDetails,
                                phoneNumber:e.target.value
                            })}
                            // props.userNewDetails.phoneNumber = e.target.value}
                        autoFocus
                        margin="dense"
                        style={{  width: '55%', height: '10%',backgroundColor:"#F4F0ED",top:"48%",left:"25%"}}
                        label="מספר טלפון"
                        type="text"
 
                    />

                    <TextField dir="rtl"
                        defaultValue={props.userDetails?.password != null ? props.userDetails.password : ""}
                        onChange={(e) =>
                            props.setUserNewDetails({
                                ...props.userNewDetails,
                                password:e.target.value
                            })}
                            // props.userNewDetails.password = e.target.value}
                        autoFocus
                        margin="dense"
                        style={{  width: '55%', height: '10%',backgroundColor:"#F4F0ED",top:"48%",left:"25%"}}
                        label=" סיסמא"
                        type="text"

                    />
                </DialogContent>
                <DialogActions>
                    <Button className="cancelUpdateUserdetails" onClick={handleClose}>ביטול</Button>
                    <Button className="confirmUpdateUserdetails" onClick={updateUserDetails}>אישור</Button>
                </DialogActions>

            </Dialog>

            {/* <Dropdown value={selectedGender} options={genders} onChange={(e)=>{onGenderChange(e.value.name)}} optionLabel="name" placeholder="בחר מין" /> */}

        </div>

    )
}