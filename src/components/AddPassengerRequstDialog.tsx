import { Autocomplete, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import "../Design/login.css"
import "../Design/addPassengerRequstDialog.css"

import "bootstrap/dist/css/bootstrap.css";
import driverDriveAdvertismentService from "../servise/DriverDriveAdvertismentService";
import passengerRequestsService from "../servise/PassengerRequestsService";
export default function AddPassengerRequstDialog(props: any) {
    const gendersLimited = ["true", "false"];
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
    const [selectedCity, setSelectedCity] = useState("");
    const citiesName: string[] = [];
    const [citiesName1, setCitiesName1] = useState<string[]>([]);
    const [flag, setFlag] = useState(false);
    const streetsName: string[] = [];
    const [isChosen, setIsChosen] = useState<boolean>(false);
    const [streetsName1, setStreetsName1] = useState<string[]>([]);

    const [newPassengerRequst, setNewPassengerRequst] = useState({
        id: 0,
        driverId: null,
        passengerId: 0,
        date: new Date(),
        sourceCity: "",
        sourceStreet: "",
        destinationCity: "",
        destinationStreet: "",
        limitedGender: false,
        amountOfSeats: 0,
        comments: "",
        status: 1,
        hour: 0,
        minuts: 0
    })
    const closeAddPassengerRequest = () => {
        props.setOpenAddPassengerRequest(false);
    };
    const addPassengerRequst = async () => {
        console.log("userDetails", props.userDetails);

        // newPassengerRequst.passengerId = props.userDetails.id;
        await setNewPassengerRequst({
            ...newPassengerRequst,
            passengerId: props.userDetails.id

        })
        console.log({ newPassengerRequst });
        await props.setOpenAddPassengerRequest(false);
        passengerRequestsService.AddRequestForDrive(newPassengerRequst);

    }
    const changeHour = (event: any) => {
        console.log("event", event);

        newPassengerRequst.hour = event.value;
        setIsChosen(true);
    };
    const changeMinuts = (event: any) => {
        console.log("event", event);
        newPassengerRequst.minuts = event.value;

    };
    const getAllCities = async () => {
        var citiesss: any[] = await require('./Cities.json')
        console.log(citiesss);

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
        // console.log({ citiesName });


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
        setStreetsName1(streetsName);
    };

    useEffect(() => {
        getAllStreets()
    }, [selectedCity]);

    return (
        <div >
            <Dialog open={props.openAddPassengerRequest} onClose={closeAddPassengerRequest}>
                <DialogTitle >הוספת בקשת נסיעה
                </DialogTitle>
                <DialogContent style={{ width: '550px', height: '650px', position: 'relative' }}>
                    <input id="dateNewPassengerAdd" type="date" onChange={(e) =>
                        newPassengerRequst.date = new Date(e.target.value)} ></input>

                    <div id="sourceCityPassengerRequest">

                        <Autocomplete
                            onChange={(event, value) => {
                                setSelectedCity(value)
                                newPassengerRequst.sourceCity = value

                            }}
                            // freeSolo
                            // id="free-solo-2-demo"
                            disableClearable
                            options={citiesName1}
                            renderInput={(params) => (
                                <TextField
                                    required
                                    {...params}
                                    label="עיר מוצא"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        /></div>
                    <div id="sourceStreetPassengerRequest">
                        <Autocomplete
                            onChange={(e, value) => newPassengerRequst.sourceStreet = value}
                            // freeSolo
                            id="free-solo-2-demo"
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
                    <div id="destinationCityPassengerRequest">
                        <Autocomplete
                            onChange={(event, value) => {
                                setSelectedCity(value)
                                newPassengerRequst.destinationCity = value

                            }}
                            // freeSolo
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

                    <div id="destinationStreetPassengerRequest">
                        <Autocomplete
                            onChange={(e, value) => newPassengerRequst.destinationStreet = value}
                            // freeSolo
                            id="free-solo-2-demo"
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


                    {/* <TextField
                        onChange={(e) =>
                            newPassengerRequst.source = e.target.value}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="מקור"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={(e) =>
                            newPassengerRequst.destination = e.target.value
                        }
                        autoFocus
                        margin="dense"
                        id="name"
                        label=" יעד"
                        type="text"
                        fullWidth
                        variant="standard"
                    /> */}
                    <div id="lablePassengerRequest">
                        <label  >חשוב לי שהנסיעה תהיה מוגבלת לאיש.ה </label>
                        <Checkbox
                            onChange={(e) =>
                                newPassengerRequst.limitedGender = (e.target.checked)
                            }

                        /></div>
                    {/* <div className="numberOfWantedSeets"> */}
                    <TextField dir="rtl"

                        onChange={(e) =>
                            newPassengerRequst.amountOfSeats = parseInt(e.target.value)}
                        autoFocus
                        margin="dense"
                        style={{ width: '50%', height: '10%', backgroundColor: "#F4F0ED", top: "0%", left: "50%" }}
                        label=" מספר מקומות רצויים"
                        type="number"
                        fullWidth
                    />


                    {/* </div> */}

                    <textarea
                        onChange={(e) =>
                            newPassengerRequst.comments = e.target.value}
                        autoFocus


                        id="name"

                        placeholder="הערות"

                        style={{ width: '100%', height: '20%', backgroundColor: "#F4F0ED", top: "30%", right: "0%" }}
                    />
                    <div className="container ">
                        <div className="mt-5 m-auto w-50">
                            <Select id="hoursPassengerRequest" options={hours} onChange={changeHour} placeholder="שעה" isRtl />
                            <Select id="minutsPassengerRequest" isDisabled={!isChosen} options={minuts} onChange={changeMinuts} placeholder="דקות" isRtl /></div></div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddPassengerRequest}>ביטול</Button>

                    <Button onClick={addPassengerRequst}>הוספה</Button>
                    {/* <Button type="submit">הוספה</Button> */}

                </DialogActions>
            </Dialog>
        </div>

    )
}