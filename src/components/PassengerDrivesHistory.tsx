import { Alert, Button, Pagination, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IdriveForDrive } from "../servise/DriverDriveAdvertismentService";
import passengerRequestsService from "../servise/PassengerRequestsService";
import PassengerHistoryList from "./PassengerHistoryList";
import "../StyleHomePage.css";
import { useLocation, useNavigate } from "react-router-dom";
import "../Design/passengerHistory.css"

export default function PassengerDrivesHistory(props: any) {
   
    const [passengerDriveHistory, setPassengerDriveHistory] = useState<IdriveForDrive[]>([]);
    const [size1, setSize1] = useState(1);

    const countOfLfs = 5;
    const [smallAd, setSmallAd] = useState(passengerDriveHistory.slice(0, countOfLfs));
    const navigate = useNavigate();

    useEffect(() => {
        console.log("passengerId", props.passengerId)
        passengerRequestsService.GetPassengerHistory(props.passengerId).then(res => { setPassengerDriveHistory(res.data); });
    }, [])
    //////////////////////////////////////////////////change
    // useEffect(() => {
    //     passengerRequestsService.GetPassengerHistory(props.passengerId).then(res => { setPassengerDriveHistory(res.data) })
    //     setSmallAd(passengerDriveHistory.slice(size1 - 1, size1 + countOfLfs - 1));

    // }, [passengerDriveHistory])
    useEffect(() => {
      props.getUserDetails();
      passengerRequestsService.GetPassengerHistory(props.passengerId).then(res => { setPassengerDriveHistory(res.data); });

      }, [props.userDetails]);
    useEffect(() => {
      setSmallAd(passengerDriveHistory.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
    },[])
    useEffect(() => {
  
      setSmallAd(passengerDriveHistory.slice((size1 - 1) * countOfLfs, size1 * countOfLfs))
    }, [passengerDriveHistory])

    const handleChangePagination = (event:any, value:any) => {
       setSize1(value);
        let x = passengerDriveHistory.slice((value - 1) * countOfLfs, value * countOfLfs);
        setSmallAd(x);
      };
     
    return(
    <div>
      
        {/* <h1>הסטורית נסיעות נוסע</h1> */}
        {smallAd.length > 0 ? (
        smallAd.map((data) => (
             <div id="homepage" >
            <PassengerHistoryList obj={data}></PassengerHistoryList></div>))
            ):(
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">אין פריטים מתאימים לחיפוש</Alert>
              </Stack>
            )}
        
      <Stack id="passengerHistoryPagination">
        <Pagination 
          count={Math.ceil(passengerDriveHistory.length / countOfLfs)}
          color="standard"
          onChange={handleChangePagination}
        />
      </Stack>

    </div>)
}