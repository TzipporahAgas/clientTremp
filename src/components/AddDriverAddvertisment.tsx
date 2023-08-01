import React, { useEffect, useState } from "react";
import "../Design/addDriverAddvertisment.css"

import Select from "react-select";
import "bootstrap/dist/css/bootstrap.css";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SelectChangeEvent, SliderThumb, TextField } from "@mui/material";
import driverDriveAdvertismentService, { IdriveForDrive, IdriverDriveAdvertisment } from "../servise/DriverDriveAdvertismentService";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { Key } from "@mui/icons-material";

export default function DriveFutureDrivesGrid(props: any) {
    const gendersLimited = ["זכר", "נקבה", "ללא הגבלה"];
    const [selectedStreet, setSelectedStreet] = useState("");
    const [flag, setFlag] = useState(false);
    const [isChosen, setIsChosen] = useState<boolean>(false);
    const [allCities, setAllCities] = useState<any[]>([]);
    const [selectedCity, setSelectedCity] = useState("");
    // const [date1, setDate1] = useState<string | Date | Date[] | undefined>(undefined);
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

    // const [clearCities, setClearCities] = useState<any>();
    // const [selectedHour, setSelectedHour] = useState<number>(0);
    // const [selectedMinuts, setSelectedMinuts] = useState<number>(0);
    // let city = "";
    const [driveToAdd ,setDriveToAdd] =useState<IdriverDriveAdvertisment>({
        id: 0,
        driverId: 0,
        date: new Date(),
        sourceCity: "",
        sourceStreet: "",
        destinationCity: "",
        destinationStreet: "",
        genderId: 1,
        amountOfseats: 0,
        amonntOfAvailableSeats: 0,
        price: 0,
        isChosen: false,
        comments: "",
        hour: 0,
        minuts: 0
    })
    const citiesName: string[] = [];
    const [citiesName1, setCitiesName1] = useState<string[]>([]);
    const [streetsName1, setStreetsName1] = useState<string[]>([]);

    const streetsName: string[] = [];
    const handleCloseAddDrive = () => {
        props.setOpenAddDrive(false);
    };

    const addDrive = async() => {
        debugger
        console.log("driveToAdddddddddd", driveToAdd);
        handleCloseAddDrive()
      
        // setDriveToAdd({
        //     ...driveToAdd,
        //     driverId:10
        // })
        driveToAdd.driverId = props.userDetails.id;

        // driveToAdd.driverId = props.userDetails?.id != null ? props.userDetails.id : 0;
        driverDriveAdvertismentService.AddAdvertisementForNewDrive(driveToAdd);
        // driverDriveAdvertismentService.GetFutureDrivesByDriverId(props.data).then(res => { props.setFutureDrives(res.data) })
        props.getFutureDrivesByDriverId()
        //פרסומות נהגים

    }

    const changeHour = (event: any) => {

        console.log("event", event);

        driveToAdd.hour = event.value;
        setIsChosen(true);
    };
    const changeMinuts = (event: any) => {
        console.log("event", event);
        driveToAdd.minuts = event.value;

    };

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
            <Dialog open={props.openAddDrive} onClose={handleCloseAddDrive} dir="rtl">
                <DialogTitle >הוספת נסיעה
                </DialogTitle>
                <DialogContent style={{ width: '550px', height: '650px', position: 'relative' }}>
                    {/* <label>תאריך למועד נסיעה
                    </label> */}
                    <input id="dateNewDriverAdd" type="date" onChange={(e) =>
                        driveToAdd.date = new Date(e.target.value)}></input>
                    {/* <TextField 
                        onChange={(e) =>
                            driveToAdd.date = new Date(e.target.value)}
                        id="dateNewDriverAdd"
                        label="תאריך למועד נסיעה"
                        type="date"
                        fullWidth
                    /> */}
                    {/* <input
                        type={"date"} onChange={(e) =>
                            driveToAdd.date = new Date(e.target.value)}></input> */}
                    <div id="sourceCity4">
                        <Autocomplete
                            onChange={(event, value) => {
                                setSelectedCity(value)
                                driveToAdd.sourceCity = value
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
                    <div id="sourceStreet4">

                        <Autocomplete
                            onChange={(e, value) => driveToAdd.sourceStreet = value}
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
                        />
                    </div>
                    <div id="destinationCity4">
                        <Autocomplete
                            onChange={(event, value) => {
                                setSelectedCity(value)
                                driveToAdd.destinationCity = value
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
                        />

                    </div>
                    <div id="destinationStreet4">
                        <Autocomplete
                            onChange={(e, value) => driveToAdd.destinationStreet = value}
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
                        />

                    </div>

                    {/* <TextField dir="rtl"
                        onChange={(e) =>
                            driveToAdd.source = e.target.value}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="מקור"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField dir="rtl"
                        onChange={(e) =>
                            driveToAdd.destination = e.target.value
                        }
                        autoFocus
                        margin="dense"
                        id="name"
                        label=" יעד"
                        type="text"
                        fullWidth
                        variant="standard"
                    /> */}
                    <div id="boyGirl">

                        <Autocomplete dir="rtl"
                            onChange={(event, value) => driveToAdd.genderId = value.toString() == "זכר" ? 1 : "נקבה" ? 2 : 3}

                            disableClearable
                            options={gendersLimited.map((e) => e)}
                            renderInput={(params) => (
                                <TextField dir="rtl"
                                    {...params}
                                    label="מין"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        /></div>
                 

                        <TextField dir="rtl"
                            onChange={(e) =>
                                driveToAdd.amountOfseats = parseInt(e.target.value)}
                            autoFocus
                            margin="dense"
                            style={{  width: '50%', height: '10%',backgroundColor:"#F4F0ED",top:"48%",left:"50%"}}

                            label=" מספר מקומות ברכב"
                            type="number"

                        />
                  
                        <TextField dir="rtl"
                            onChange={(e) =>
                                driveToAdd.amonntOfAvailableSeats = parseInt(e.target.value)}
                            autoFocus
                            margin="dense"
                            id="name"
                            label=" מספר מקומות פנויים"
                            type="number"
                            style={{  width: '49%', height: '10%',backgroundColor:"#F4F0ED",top:"36%",right:"51%"}}

                        />
                        <TextField dir="rtl"
                            onChange={(e) =>
                                driveToAdd.price = parseInt(e.target.value)}
                            autoFocus
                            margin="dense"
                            id="name"
                            label=" מחיר "
                            type="number"
                            fullWidth
                            style={{  width: '49%', height: '10%',backgroundColor:"#F4F0ED",top:"25.5%",left:"49%"}}

                        />
                  
                        <TextField dir="rtl"
                            onChange={(e) =>
                                driveToAdd.comments = e.target.value}
                            autoFocus
                            margin="dense"
                            label=" הערות"
                            type="text"
                            style={{  width: '100%', height: '20%',backgroundColor:"#F4F0ED",top:"48%",right:"0%"}}
                        />
                 
                        <Select id="hours12" options={hours} onChange={changeHour} placeholder="שעה" isRtl />
                        <Select id="minuts12" isDisabled={!isChosen} options={minuts} onChange={changeMinuts} placeholder="דקות" isRtl />

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseAddDrive}>ביטול</Button>
                    <Button onClick={addDrive}>הוספה</Button>

                </DialogActions>
            </Dialog>
        </div >

    )
}








