import { Button } from "@mui/material";
// import { Column } from "primereact/column";
// import { DataTable } from "primereact/datatable";
import React from "react";
import { useEffect, useState } from "react";
import DriverDriveAdvertismentService from "../servise/DriverDriveAdvertismentService";
import driverDriveAdvertismentService, { IdriveForDrive } from "../servise/DriverDriveAdvertismentService";
import Login from "./Login";
import Register from "./Register";
import UpdateDriveDetailsDialog from "./UpdateDriveDetailsDialog";


export default function DriveFutureDrivesGrid(props: any) {

  // const [globalFilter, setGlobalFilter] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [open, setOpen] = React.useState(false);
  // const [driveNewDetails] = useState({
  //   id: 0,
  //   driverId: 0,
  //   date: new Date(),
  //   sourceCity: "",
  //   destinationCity: "",
  //   sourceStreet: "",
  //   destinationStreet: "",
  //   genderId: 0,
  //   amountOfseats: 0,
  //   amonntOfAvailableSeats: 0,
  //   price: 0,
  //   isChosen: false,
  //   comments: "",
  //   hour: 0,
  //   minuts: 0
  // })
  // useEffect(() => {
  //   driverDriveAdvertismentService.GetFutureDrivesByDriverId(props.data).then(res => { props.setFutureDrives(res.data) })
  // }, [])
  // useEffect(() => {
  //   driverDriveAdvertismentService.GetFutureDrivesByDriverId(props.data).then(res => { props.setFutureDrives(res.data) })
  // }, [props.futureDrives])

  // const UpdateDriverDetailsById = (driveToUpdate: IdriveForDrive) => {
  //   if (driveToUpdate.isChosen == true)
  //     alert("לנסיעה זו רשומים נוסעים, אם ברצונך לערוך שינויים צור איתם קשר")
  //   else {
  //     if (driveToUpdate.idFromDriverAdvertisment != 0) {
  //       driveNewDetails.id = driveToUpdate.idFromDriverAdvertisment != null ? driveToUpdate.idFromDriverAdvertisment : 0;
  //     }

  //     else {
  //       driveNewDetails.id = driveToUpdate.idFromPassengerRequst != null ? driveToUpdate.idFromPassengerRequst : 0;
  //     }

  //     driveNewDetails.driverId = driveToUpdate.driverId != null ? driveToUpdate.driverId : 0;
  //     driveNewDetails.date = driveToUpdate.date != null ? driveToUpdate.date : new Date();
  //     driveNewDetails.sourceCity = driveToUpdate.sourceCity != null ? driveToUpdate.sourceCity : "";
  //     driveNewDetails.destinationCity = driveToUpdate.destinationCity != null ? driveToUpdate.destinationCity : "";
  //     driveNewDetails.sourceStreet = driveToUpdate.sourceStreet != null ? driveToUpdate.sourceStreet : "";
  //     driveNewDetails.destinationStreet = driveToUpdate.destinationStreet != null ? driveToUpdate.destinationStreet : "";
  //     driveNewDetails.genderId = driveToUpdate.genderId != null ? driveToUpdate.genderId : 0;
  //     driveNewDetails.amountOfseats = driveToUpdate.amountOfseats != null ? driveToUpdate.amountOfseats : 0;
  //     driveNewDetails.amonntOfAvailableSeats = driveToUpdate.amonntOfAvailableSeats != null ? driveToUpdate.amonntOfAvailableSeats : 0;
  //     driveNewDetails.price = driveToUpdate.price != null ? driveToUpdate.price : 0;
  //     driveNewDetails.comments = driveToUpdate.comments != null ? driveToUpdate.comments : "";
  //     driveNewDetails.hour = driveToUpdate.hour != null ? driveToUpdate.hour : 0;
  //     driveNewDetails.minuts = driveToUpdate.minuts != null ? driveToUpdate.minuts : 0;

  //     setOpen(true);

  //   }
  //   driverDriveAdvertismentService.GetFutureDrivesByDriverId(props.data).then(res => { props.setFutureDrives(res.data) })

  // }
  // const DeleteDriveByid = (driveToDelete: IdriveForDrive) => {
  //   if (driveToDelete.status == 1) {

  //     DriverDriveAdvertismentService.DeleteDriveByid(driveToDelete.idFromPassengerRequst, driveToDelete.status)
  //   }

  //   if (driveToDelete.status == 2) {

  //     DriverDriveAdvertismentService.DeleteDriveByid(driveToDelete.idFromDriverAdvertisment, driveToDelete.status)
  //   }
  //   if (driveToDelete.status == 0) {

  //     DriverDriveAdvertismentService.DeleteDriveByid(driveToDelete.idFromDriverAdvertisment, driveToDelete.status)
  //   }
  //   driverDriveAdvertismentService.GetFutureDrivesByDriverId(props.data).then(res => { props.setFutureDrives(res.data) })

  // }
  // const updateDrive = (rowData: any) => {

  //   return (
  //     <React.Fragment>
  //       <Button onClick={() => UpdateDriverDetailsById(rowData)} >עדכון נסיעה</Button>

  //     </React.Fragment>
  //   );
  // }
  // const deleteDrive = (rowData: any) => {
  //   return (
  //     <React.Fragment>
  //       <Button onClick={() => DeleteDriveByid(rowData)} >ביטול נסיעה</Button>
  //     </React.Fragment>
  //   );
  // }
  // const formatDate = (rowData: any) => {
  //   return (
  //     <>
  //       {new Date(rowData.date).toLocaleDateString()}
  //     </>
  //   );
  // }
  // const time = (rowData: any) => {

  //   return (
  //     <>
  //       <span>{rowData.hour} : {rowData.minuts}</span></>
  //   )

  // }
  // const sourceDetails = (rowData: any) => {
  //   return (
  //     <>
  //       <span>{rowData.sourceCity} {rowData.sourceStreet}</span><br></br>
  //     </>)

  // }
  // const destinationDetails = (rowData: any) => {
  //   return (
  //     <>
  //       <span>{rowData.destinationCity} {rowData.destinationStreet}</span><br></br>
  //     </>)

  // }

  // const passengerDetails = (rowData: any) => {
  //   return (
  //     < >
  //       <span>{rowData.firstName} {rowData.lastName}</span><br></br>
  //               <span>{rowData.phoneNumber}</span><br></br> <span>{rowData.userId}</span>
  //     </>)

  // }
  
  return (
    <div>
      <h1>נסיעות עתידיות שלי</h1>
      {/* <div className="datatable-filter-demo">
        <div className="card">
          <DataTable value={props.futureDrives} paginator rows={4}
            className="p-datatable-customers"
            globalFilter={globalFilter} emptyMessage="לא נמצאו נסיעות עתידיות" loading={loading} filterDisplay="row">
            <Column field="date" header="תאריך" body={formatDate} filter filterMatchMode="contains" sortable></Column>
            <Column body={time} header="שעה" filter filterMatchMode="contains" sortable></Column>

            <Column body={sourceDetails} header="יעד" filter filterMatchMode="contains" sortable></Column>
            <Column body={destinationDetails} header="מוצא" filter filterMatchMode="contains" sortable></Column>
            <Column field="date" header="פרטי נוסע" filter filterMatchMode="contains" sortable ></Column>
            <Column field="isChosen" header="האם פעיל" filter filterMatchMode="contains" sortable></Column>
            <Column body={updateDrive}></Column>
            <Column body={deleteDrive}></Column>
          </DataTable></div></div>

      <UpdateDriveDetailsDialog setOpen={setOpen} open={open} driveNewDetails={driveNewDetails} /> */}
    </div>

  )
}