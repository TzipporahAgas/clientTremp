import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Pagination, Snackbar, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import driverDriveAdvertismentService, { IdriveForDrive } from "../servise/DriverDriveAdvertismentService";
import { ReactComponent as Person } from "../Design/Person.svg"
import { ReactComponent as Person2 } from "../Design/Person2.svg"
import { ReactComponent as Watch } from "../Design/Watch.svg"
import { ReactComponent as Calendar2 } from "../Design/Calendar2.svg"
import { ReactComponent as Sourse3 } from "../Design/Sourse3.svg"
import { ReactComponent as Destination3 } from "../Design/Destination3.svg"
import "../Design/driveAdvertismentGrid.css"

export default function DriverAdvertismentGrid(props: any) {

    // const [activeDriverAdvertisment, setActiveDriverAdvertisment] = useState<IdriveForDrive[]>([]);
    let flag: Boolean = false;
    const countOfLfs = 8;
    const [size1, setSize1] = useState(1);
    const [loader, setLoader] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [smallAd, setSmallAd] = useState<IdriveForDrive[]>([]);
    const [drivesChange, setDrivesChange] = useState<IdriveForDrive[]>([]);
    const [drivesSearch, setDrivesSearch] = useState<IdriveForDrive[]>([]);
    const [arrLength, setArrLength] = useState(-1);
    const [activeDriverAdvertismentCopy, setActiveDriverAdvertismentCopy] = useState<IdriveForDrive[]>([]);

    let a: IdriveForDrive[] = [];
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = useState(0);
    const [openAlert, setOpenAlert] = React.useState(false);



    const [comments, setComments] = useState("");
    const [driveToAdd, setDriveToAdd] = useState<IdriveForDrive>({
        passengerId: 0,
        driverId: 0,
        date: new Date(),
        sourceCity: "",
        destinationCity: "",
        sourceStreet: "",
        destinationStreet: "",
        status: 0,
        firstName: "",
        lastName: "",
        userId: "",
        phoneNumber: "",
        genderId: 0,
        idFromPassengerRequst: 0,
        idFromDriverAdvertisment: 0,
        price: 0,
        amonntOfAvailableSeats: 0,
        amountOfseats: 0,
        isChosen: false,
        comments: "",
        limitedGender: false,
        hour: 0,
        minuts: 0
    });





    const handleClickOpen = (rowData: any) => {
        setOpen(true);
        // console.log(rowData, "rowData")
        // driveToAdd.passengerId = props.idOfUserDetails;
        // driveToAdd.driverId = rowData.driverId != null ? rowData.driverId : 0;
        // driveToAdd.date = rowData.date;
        // driveToAdd.sourceCity = rowData.sourceCity;
        // driveToAdd.destinationCity = rowData.destinationCity;
        // driveToAdd.sourceStreet = rowData.sourceStreet;
        // driveToAdd.destinationStreet = rowData.destinationStreet;
        // driveToAdd.status = rowData.status;
        // driveToAdd.firstName = rowData.firstName;
        // driveToAdd.lastName = rowData.lastName;
        // driveToAdd.userId = rowData.userId;
        // driveToAdd.phoneNumber = rowData.phoneNumber;
        // driveToAdd.genderId = rowData.genderId;
        // driveToAdd.idFromPassengerRequst = rowData.idFromPassengerRequst;
        // driveToAdd.idFromDriverAdvertisment = rowData.idFromDriverAdvertisment;
        // driveToAdd.price = rowData.price;
        // driveToAdd.amonntOfAvailableSeats = rowData.amonntOfAvailableSeats;
        // driveToAdd.amountOfseats = rowData.amountOfseats;
        // driveToAdd.isChosen = false;
        // driveToAdd.comments = rowData.comments;
        // driveToAdd.limitedGender = rowData.limitedGender;
        // driveToAdd.hour = rowData.hour;
        // driveToAdd.minuts = rowData.minuts;

        setDriveToAdd({
            ...rowData,
            passengerId: props.idOfUserDetails,
            driverId: rowData.driverId != null ? rowData.driverId : 0,
            isChosen: false
        })

        console.log("driveToAdd", driveToAdd);

    };



    const handleClose = (rowData: any) => {
        setOpen(false);
    };
    useEffect(() => {
        debugger
        if (smallAd.length === 0 && activeDriverAdvertismentCopy.length != 0)
            handleChangePagination(null, size1 - 1)
    }, [smallAd])

    useEffect(() => {

        props.getActiveDrives()
        console.log({activeDriverAdvertismentCopy});
        
    }, [])
    useEffect(() => {
        setActiveDriverAdvertismentCopy(props.activeDriverAdvertisment)
    }, [props.activeDriverAdvertisment])

    useEffect(() => {
        if (activeDriverAdvertismentCopy)
            setSmallAd(activeDriverAdvertismentCopy.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
    }, [activeDriverAdvertismentCopy])
    // useEffect(() => {
    //     var data = activeDriverAdvertisment;

    //     if (drivesSearch.length > 0) {
    //         data = drivesSearch;
    //         console.log(data, "data---");
    //     }
    //     if (arrLength == 0) {
    //         data = drivesSearch;
    //         console.log(data, "data---");
    //     }
    //     setActiveDriverAdvertisment(data);
    //     setSmallAd(data.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
    //     console.log({ data });

    // }, [drivesChange]);



    // useEffect(() => {
    //     setSmallAd(activeDriverAdvertisment.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
    // },[activeDriverAdvertisment])

    const updateDriveDetails = async () => {
        console.log("driveToAdddddddddddddd", driveToAdd);
        console.log("amount", amount);
        setOpen(false);

        if (amount > driveToAdd.amonntOfAvailableSeats) {
            alert(" אין מספיק מקום בנסיעה המבוקשת")
            setConfirm(false)
        }
        else {
            setDriveToAdd({
                ...driveToAdd,
                amonntOfAvailableSeats: driveToAdd.amonntOfAvailableSeats -= amount,
                comments: comments
            });

            console.log("driveToAddAfterChange", driveToAdd);
            debugger
            setLoader(true)
            setOpenAlert(true);
            await driverDriveAdvertismentService.AddDrive(driveToAdd);
            props.getActiveDrives()
            props.GetPassengerFutureDrives();
            setLoader(false)
            setOpenAlert(false);
            setConfirm(false)


        }

    }

    const handleChangePagination = (event: any, value: any) => {
        debugger
        setSize1(value);
        let x = activeDriverAdvertismentCopy.slice((value - 1) * countOfLfs, value * countOfLfs);
        setSmallAd(x);
    };

    const changeFilter = async (str: string) => {
        // console.log("drivesSearch");

        // if (value == "")
        //     driverDriveAdvertismentService.GetActiveDrives().then(res => { setActiveDriverAdvertisment(res.data); });
        // else {
        //     driverDriveAdvertismentService.FilterActiveDrives(value).then((res: any) => {
        //         setDrivesSearch(res.data);
        //         setArrLength(res.data.length)
        //         console.log(drivesSearch, "drivesSearch ");
        //         setDrivesChange(drivesSearch);

        //     })
        // }
        var filteredArr = props.activeDriverAdvertisment.filter((driveAdvertisment: IdriveForDrive) => {
            return new Date(driveAdvertisment.date).toLocaleDateString().includes(str) || driveAdvertisment.sourceCity.includes(str) || driveAdvertisment.sourceStreet.includes(str)
                || driveAdvertisment.destinationCity.includes(str) || driveAdvertisment.destinationStreet.includes(str) || driveAdvertisment.hour.toLocaleString().includes(str) ||
                driveAdvertisment.minuts.toString().includes(str) || driveAdvertisment.comments.includes(str);
            // .includes(courseName)course.operatorName.includes(courseName)
        })
        console.log({ filteredArr });

        setActiveDriverAdvertismentCopy(filteredArr);
    }

    return (
        <div>

            <Snackbar anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }} open={openAlert} autoHideDuration={6000} >
                <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
                    ההרשמה מתבצעת ונשלח מייל לנהג על הנסיעה!                    </Alert>
            </Snackbar>
            {
            /* <Select options={hours} onChange={changeHour} placeholder="שעה" isRtl /> */}
            <input className="searchInDriverAdvertismentGrid" placeholder=" חפש לי" dir="rtl" onChange={(e) =>
                changeFilter(e.target.value)
            } ></input>
            {/* <button onClick={filtering}>חפש לי</button> */}

            <h1 className="driveradd12">פרסומי נסיעות</h1>
            <h1 className="driveradd13">?לאיזה נסיעה תרצה להצטרף   </h1>

            {smallAd.length > 0 ? (<table id="driveAdvertismentGrid" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%" dir="rtl">
                <thead >
                    <tr className="trTableDriverAdvertisments">
                        <th scope="col" className="tdGrid"> <Calendar2></Calendar2>תאריך</th>
                        <th scope="col " className="tdGrid"> <Watch></Watch>שעה</th>
                        <th scope="col" className="tdGrid"> <Sourse3></Sourse3>מוצא</th>
                        <th scope="col" className="tdGrid"> <Destination3></Destination3>יעד</th>
                        <th scope="col" className="tdGrid"> <Person2></Person2> מין</th>
                        <th scope="col" className="tdGrid"> <Person></Person>מספר מקומות פנויים</th>
                        <th scope="col" className="tdGrid"> <Person></Person>מחיר  </th>
                        <th scope="col" className="tdGrid"> <Person></Person>הערות  </th>
                        <th scope="col" className="tdGrid"></th>
                    </tr>
                </thead>
                <tbody >
                    {smallAd.map((a: IdriveForDrive) =>
                        <tr >

                            <td className="tdGrid">{new Date(a.date).toLocaleDateString()}</td>
                            <td className="tdGrid">{a.hour}:{a.minuts}</td>
                            <td className="tdGrid">{a.sourceCity} {a.sourceStreet}</td>
                            <td className="tdGrid">{a.destinationCity} {a.destinationStreet}</td>
                            <td className="tdGrid">{a.genderId == 1 ? "איש" : a.genderId == 2 ? "אישה" : "ללא הגבלה"}</td>
                            <td className="tdGrid">{a.amonntOfAvailableSeats}/{a.amountOfseats}</td>
                            <td className="tdGrid">{a.price}</td>
                            <td className="tdGrid">{a.comments}</td>
                            <td className="tdGrid"> <Button className={loader ? "notAllowed" : "addDrive"} disabled={loader} onClick={() => handleClickOpen(a)} >להרשמה לנסיעה</Button></td>
                        </tr>
                    )}
                </tbody>
                {loader && <CircularProgress className="loader" />}

            </table>) : (
                <Stack className="noItemfoundDriveAdvertisment" sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">אין פריטים מתאימים לחיפוש</Alert>
                </Stack>
            )}
            <Stack id="paginagionInDriver">
                <Pagination
                    count={Math.ceil(activeDriverAdvertismentCopy.length / countOfLfs)}
                    color="standard"
                    onChange={handleChangePagination}
                />
            </Stack>
            <Dialog open={open} onClose={handleClose}>
                <> <DialogTitle> פרטי נסיעה
                </DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={(e) => {
                                setAmount(parseInt(e.target.value))
                                setConfirm(true)
                            }
                            }
                            autoFocus
                            margin="dense"
                            id="name"
                            label=" מספר מקומות מבוקש  "
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            onChange={(e) =>
                                setComments(e.target.value)}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="הערות"
                            type="textArea"
                            fullWidth
                            variant="standard"
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>ביטול</Button>
                        <Button className={confirm ? "ok" : "notAllowedOk"} disabled={!confirm} onClick={updateDriveDetails}>אישור</Button>
                    </DialogActions></>
            </Dialog>

        </div>

    )
}


