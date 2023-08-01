import { Alert, Button, Input, Pagination, Stack } from "@mui/material";
// import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import driverDriveAdvertismentService, { IdriveForDrive } from "../servise/DriverDriveAdvertismentService";
import passengerRequestsService from "../servise/PassengerRequestsService";
import "../Design/passengersRequestsGrid.css"
import { ReactComponent as Person } from "../Design/Person.svg"
import { ReactComponent as Person2 } from "../Design/Person2.svg"
import { ReactComponent as Watch } from "../Design/Watch.svg"
import { ReactComponent as Calendar2 } from "../Design/Calendar2.svg"
import { ReactComponent as Sourse3 } from "../Design/Sourse3.svg"
import { ReactComponent as Destination3 } from "../Design/Destination3.svg"

import Register from "./Register";

export default function PassengersRequestsGrid(props: any) {
    // const [activePassengerRequests, setActivePassengerRequests] = useState<IdriveForDrive[]>([]);
    const [activePassengerRequestsCopy, setActivePassengerRequestsCopy] = useState<IdriveForDrive[]>([]);
    const [size1, setSize1] = useState(1);
    const countOfLfs = 8;
    const [smallAd, setSmallAd] = useState<IdriveForDrive[]>([]);
    const navigate = useNavigate();
    const [data, setData] = useState(props.userDetails.userId);

    const search = (str: string) => {
        var filteredArr = props.activePassengerRequests.filter((passengerRequest: IdriveForDrive) => {
            return new Date(passengerRequest.date).toLocaleDateString().includes(str) || passengerRequest.sourceCity.includes(str) || passengerRequest.sourceStreet.includes(str)
                || passengerRequest.destinationCity.includes(str) || passengerRequest.destinationStreet.includes(str) || passengerRequest.hour.toLocaleString().includes(str) ||
                passengerRequest.minuts.toString().includes(str);
            // .includes(courseName)course.operatorName.includes(courseName)
        })
        console.log({ filteredArr });

        setActivePassengerRequestsCopy(filteredArr);

    }

    const UpdatePassengerDriveDetails = async (driveToEdit: IdriveForDrive) => {
        debugger
        console.log(data);
        passengerRequestsService.UpdatePassengerDriveDetails(driveToEdit, data).then(() => {
            driverDriveAdvertismentService.GetFutureDrivesByDriverId(props.userDetails.userId).then(res => { props.setFutureDrives(res.data) })
            props.getPassenger()
        });
        console.log("yyyyyyyyy");
    }

    const aa =  () => {
    //    setSize1(1)
       return(<></>)
    }


    useEffect(() => {
        debugger
       if(smallAd.length===0 && activePassengerRequestsCopy.length!=0)
       handleChangePagination(null,size1-1)
    }, [smallAd])

    useEffect(() => {
        props.getPassenger()
        // setSmallAd(activePassengerRequests.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
    }, [])
    useEffect(() => {
        debugger
        setActivePassengerRequestsCopy(props.activePassengerRequests)
    }, [props.activePassengerRequests])
    useEffect(() => {
        debugger
        if (activePassengerRequestsCopy)
            setSmallAd(activePassengerRequestsCopy.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
    }, [activePassengerRequestsCopy])


    const handleChangePagination = (event: any, value: any) => {
        debugger
        setSize1(value);
        let x = activePassengerRequestsCopy.slice((value - 1) * countOfLfs, value * countOfLfs);
        console.log(size1);

        setSmallAd(x);
    };
    return (
        <div>


            <input className="searchInPassengerRequestGrid" dir="rtl" placeholder="חפש לי" onChange={(e) =>
                search(e.target.value)
            } ></input>
            <h1 className="pasengerRequst12">בקשות נסיעה</h1>
            <h1 className="pasengerRequst13">?איזה נסיעות תרצה לעשות</h1>

            {smallAd.length > 0 ? (<table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellSpacing="0" width="100%" dir="rtl">
                <thead >
                    <tr className="trTablePassengerRequest2">
                        <th scope="col" className="tdGrid"> <Calendar2></Calendar2>תאריך</th>
                        <th scope="col " className="tdGrid"> <Watch></Watch>שעה</th>
                        <th scope="col" className="tdGrid"> <Sourse3></Sourse3>מוצא</th>
                        <th scope="col" className="tdGrid"> <Destination3></Destination3>יעד</th>
                        <th scope="col" className="tdGrid"> <Person2></Person2>הגבלת מין</th>
                        <th scope="col" className="tdGrid"> <Person></Person>מספר מקומות רצויים</th>
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
                            <td className="tdGrid">{a.limitedGender == true ? a.genderId == 1 ? "איש" : "אישה" : "ללא הגבלה"}</td>
                            <td className="tdGrid">{a.amountOfseats}</td>
                            <td className="tdGrid"><Button id="add" onClick={() => UpdatePassengerDriveDetails(a)} >הוסף+</Button></td>
                        </tr>
                    )}
                </tbody>

            </table>) : (
                <Stack sx={{ width: "100%" }} spacing={2} className="notFound">
                    <Alert severity="error">אין פריטים מתאימים לחיפוש</Alert>
                </Stack>
            )}
            <Stack id="paginagionInPassengerRequest">
                <Pagination
                    count={Math.ceil(activePassengerRequestsCopy.length / countOfLfs)}
                    color="standard"
                    onChange={handleChangePagination}
                />
            </Stack>

        </div>
    )
}