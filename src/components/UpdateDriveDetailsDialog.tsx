import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import driverDriveAdvertismentService from "../servise/DriverDriveAdvertismentService";
import userService, { Iuser } from "../servise/UserService";
import Select from "react-select";
import "../Design/UpdateDriveDetailsDialog.css"


export default function UpdateDriveDetailsDialog(props: any) {

    const gendersLimited = ["זכר", "נקבה", "ללא הגבלה"];
    const hours = [{ value: 1, label: "1" }, { value: 2, label: "2" }, { value: 3, label: "3" },
    { value: 4, label: "4" }, { value: 5, label: "5" }, { value: 6, label: "6" },
    { value: 7, label: "7" }, { value: 8, label: "8" }, { value: 9, label: "9" },
    { value: 10, label: "10" },
    { value: 11, label: "11" }, { value: 12, label: "12" }, { value: 13, label: "13" }, { value: 14, label: "14" },
    { value: 15, label: "15" }, { value: 16, label: "16" }, { value: 17, label: "17" },
    { value: 18, label: "18" }, { value: 19, label: "19" }, { value: 20, label: "20" },
    { value: 21, label: "21" }, { value: 22, label: "22" }, { value: 23, label: "23" }, { value: 24, label: "24" }];
    const minuts = [
        { value: 0, label: "00" }, { value: 15, label: "15" }, { value: 30, label: "30 " }, { value: 45, label: "45" }
    ]
    const citiesName: string[] = [];
    const [citiesName1, setCitiesName1] = useState<string[]>([]);
    const [streetsName1, setStreetsName1] = useState<string[]>([]);
    const [flag, setFlag] = useState(false);
    const streetsName: string[] = [];
    const [selectedCity, setSelectedCity] = useState("");

    const [isChosen, setIsChosen] = useState<boolean>(false);
    const handleClose = () => {
        props.setOpen(false);
    };
    const changeHour = (event: any) => {
        console.log("event", event);
        props.setDriveNewDetails({
            ...props.driveNewDetails,
            hour: event.value
        })
        // props.driveNewDetails.hour = event.value;
        setIsChosen(true);
    };
    const changeMinuts = (event: any) => {
        console.log("event", event);
        props.driveNewDetails.minuts = event.value;

    };

    const updateDriveDetails = () => {
        props.setOpen(false);
        driverDriveAdvertismentService.UpdateDriveDetailsById(props.driveNewDetails);
        props.getFutureDrivesByDriverId()
    }

    const getAllCities = async () => {
        var citiesss: any[] = await require('./Cities.json')
        console.log({ citiesss });

        // setAllCities(citiesss);

        if (citiesss.length > 0) {
            citiesss.forEach((e: any) => {
                if (!citiesName.find(c => c === e.city_name)) {
                    citiesName.push(e.city_name)
                }
                // if (city != e.city_name ) {
                //     citiesName.push(e.city_name)
                //     city = e.city_name;
                // }
                // setCitiesName(citiesName);console.log({citiesName});
            }

            )
        }
        console.log(citiesName, "aaaaa");
        setFlag(true);
        setCitiesName1(citiesName);
        console.log({ citiesName });

    };
    useEffect(() => {
        getAllCities()
    }, []);
    const getAllStreets = async () => {

        var clearCities = require('./ClearCities.json');
        const arr = clearCities[selectedCity];

        // setClearCities(street)
        if (flag) {

            arr.map((e: any) => {
                streetsName.push(e)
            })
        }
        setStreetsName1(streetsName)
        console.log({ streetsName });

    };
    useEffect(() => {
        getAllStreets()
    }, [selectedCity]);


    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} dir={"rtl"}>
                <DialogTitle>עדכון פרטי נסיעה
                </DialogTitle>
                <DialogContent style={{ width: '550px', height: '650px', position: 'relative' }}>


                    <TextField dir={"rtl"}
                        defaultValue={props.driveNewDetails?.date != null ? new Date(props.driveNewDetails.date).toLocaleDateString() : ""}
                        className="dateUpdateDriveDetails"
                        onChange={(e) =>
                            props.setDriveNewDetails({
                                ...props.driveNewDetails,
                                date: new Date(e.target.value)
                            })}
                        autoFocus
                        margin="dense"
                        id="name"
                        label=" תאריך למועד נסיעה"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <div className="sourceCityUpdatedrive">
                        <Autocomplete
                            defaultValue={props.driveNewDetails.sourceCity}

                            onChange={(event, value) => {
                                setSelectedCity(value)
                                props.setDriveNewDetails({
                                    ...props.driveNewDetails,
                                    sourceCity: value
                                })
                            }}

                            disableClearable
                            options={citiesName1}
                            renderInput={(params) => (
                                <TextField

                                    {...params}
                                    label="עיר מוצא"

                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        /></div>
                    <div className="sourceStreetUpdatedrive">
                        <Autocomplete
                            defaultValue={props.driveNewDetails.sourceStreet}

                            onChange={(e, value) =>
                                props.setDriveNewDetails({
                                    ...props.driveNewDetails,
                                    sourceStreet: value
                                })}
                            disableClearable
                            options={streetsName1}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="רחוב מוצא"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />

                            )}
                        /></div>
                    <div className="destinationCityUpdatedrive">
                        <Autocomplete
                            defaultValue={props.driveNewDetails.destinationCity}

                            onChange={(event, value) => {
                                setSelectedCity(value)
                                props.setDriveNewDetails({
                                    ...props.driveNewDetails,
                                    destinationCity: value
                                })
                            }}
                            id="free-solo-2-demo"
                            disableClearable
                            options={citiesName1}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="עיר יעד"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        /></div>
                    <div className="destinationStreetUpdatedrive">
                        <Autocomplete
                            defaultValue={props.driveNewDetails.destinationStreet}

                            onChange={(e, value) =>
                                props.setDriveNewDetails({
                                    ...props.driveNewDetails,
                                    destinationStreet: value
                                })}
                            disableClearable
                            options={streetsName1}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="רחוב יעד"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />

                            )}
                        /></div>
                    <div className="genderUpdatedrive">
                        <Autocomplete
                            defaultValue={props.driveNewDetails?.genderId != null ? (props.driveNewDetails.genderId == 1 ? "זכר" : props.driveNewDetails.genderId == 2 ? "נקבה" : "ללא הגבלה") : ""}

                            onChange={(event, value) =>
                                props.setDriveNewDetails({
                                    ...props.driveNewDetails,
                                    genderId: value.toString() == "זכר" ? 1 : "נקבה" ? 2 : 3
                                })}
                            // props.driveNewDetails.genderId = value.toString() == "זכר" ? 1 : "נקבה" ? 2 : 3}
                            freeSolo
                            id="free-solo-2-demo"
                            disableClearable
                            options={gendersLimited.map((e) => e)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="מין"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                    </div>
                    <TextField
                        defaultValue={props.driveNewDetails?.amountOfseats != null ? props.driveNewDetails.amountOfseats : 0}

                        onChange={(e) =>
                            props.setDriveNewDetails({
                                ...props.driveNewDetails,
                                amountOfseats: parseInt(e.target.value)
                            })}
                        // props.driveNewDetails.amountOfseats = parseInt(e.target.value)}
                        autoFocus
                        style={{ width: '50%', height: '10%', top: "40%", left: "2%" }}
                        margin="dense"
                        id="name"
                        label=" מספר מקומות ברכב"
                        type="number"
                        fullWidth
                        variant="standard"
                    />

                    <TextField
                        defaultValue={props.driveNewDetails?.amonntOfAvailableSeats != null ? props.driveNewDetails.amonntOfAvailableSeats : 0}

                        onChange={(e) =>
                            props.setDriveNewDetails({
                                ...props.driveNewDetails,
                                amonntOfAvailableSeats: parseInt(e.target.value)
                            })}
                        // props.driveNewDetails.amonntOfAvailableSeats = parseInt(e.target.value)}
                        autoFocus
                        style={{ width: '49%', height: '10%', top: "40%", right: "0%" }}

                        margin="dense"
                        id="name"
                        label=" מספר מקומות פנויים"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        defaultValue={props.driveNewDetails?.price != null ? props.driveNewDetails.price : 0}

                        onChange={(e) =>
                            props.setDriveNewDetails({
                                ...props.driveNewDetails,
                                price: parseInt(e.target.value)
                            })}
                        // props.driveNewDetails.price = parseInt(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label=" מחיר "
                        type="number"
                        fullWidth

                        style={{ width: '49%', height: '10%', top: "14.5%", left: "0%" }}

                    />
                    <TextField
                        defaultValue={props.driveNewDetails?.comments != null ? props.driveNewDetails.comments : ""}

                        onChange={(e) =>
                            props.setDriveNewDetails({
                                ...props.driveNewDetails,
                                comments: e.target.value
                            })}
                        // props.driveNewDetails.comments = e.target.value}
                        autoFocus
                        margin="dense"
                        id="name"
                        label=" הערות"
                        type="text"
                        fullWidth
                        variant="standard"
                        style={{ width: '100%', height: '20%', top: "28%", right: "0%" }}

                    />
                    <div className="container ">
                        <div className="mt-5 m-auto w-50">
                            <Select className="hoursUpdatedrive" options={hours} onChange={changeHour} placeholder="שעה" isRtl defaultInputValue={props.driveNewDetails?.hour != null ? props.driveNewDetails.hour : 0} />
                            <Select className="minutsUpdatedrive" options={minuts} onChange={changeMinuts} placeholder="דקות" isRtl defaultInputValue={props.driveNewDetails?.minuts != null ? props.driveNewDetails.minuts : 0} /></div></div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>ביטול</Button>
                    <Button onClick={updateDriveDetails}>אישור</Button>
                </DialogActions>

            </Dialog>


        </div>

    )
}