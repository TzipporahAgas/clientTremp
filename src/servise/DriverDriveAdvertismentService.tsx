import axios, { Axios } from "axios";
import { useState } from "react";
import { variables } from "../Variables";

export interface IdriverDriveAdvertisment {
  id: number,
  driverId: number
  date: Date,
  sourceCity: string, 
  destinationCity:string,
  sourceStreet:string,
  destinationStreet: string,
  genderId: number,
  amountOfseats: number,
  amonntOfAvailableSeats: number,
  price: number,
  isChosen: boolean,
  comments: string,
  hour:number,
  minuts:number

}
export interface IdriveForDrive {
  passengerId: number,
  driverId: number,
  date: Date,
  sourceCity: string, 
  destinationCity:string,
  sourceStreet:string,
  destinationStreet: string,
  status: number,
  firstName: string,
  lastName: string,
  userId: string,
  phoneNumber: string,
  genderId: number,
  idFromPassengerRequst: number,
  idFromDriverAdvertisment: number,
  price: number,
  amonntOfAvailableSeats: number,
  amountOfseats: number,
  isChosen: boolean,
  comments: string,
  limitedGender: boolean,
  hour:number,
  minuts:number
}
 

class DriverDriveAdvertismentService {


  UpdateDriveDetailsById = async (driveToEdit: IdriverDriveAdvertisment) => {
    console.log("driveToEdit", driveToEdit);
    await axios.put(variables.API_URL + `DriverDrivesAdvertisments/UpdateDriverDetailsById?id=${driveToEdit.id}`, driveToEdit)
  }
  DeleteDriveByid = async (id: number, myStatus: number) => {
    await axios.delete(variables.API_URL + `DriverDrivesAdvertisments/DeleteDriveByid?id=${id}&status=${myStatus}`).then((res) => {
      if (res)
        console.log("resssssssssssss", res)
    })
      .catch((error:any) => {
        console.log(error)
      })
  }

  AddAdvertisementForNewDrive = async (drive: IdriverDriveAdvertisment) => {
    await axios.post(variables.API_URL + `DriverDrivesAdvertisments/AddAdvertisementForNewDrive`, drive).then((res) => {
      if (res)
        console.log("resssssssssssss", res)
    })
      .catch((error:any) => {
        console.log(error)
      })
  }

  AddDrive = async (drive: IdriveForDrive) => {
    await axios.post(variables.API_URL + `DriverDrivesAdvertisments/AddDrive`, drive).then((res) => {
      if (res)
        console.log("resssssssssssss", res)
    })
      .catch((error:any) => {
        console.log(error)
      })
  }


  GetFutureDrivesByDriverId = async (id: string) => {

    return await axios.get(variables.API_URL + `DriverDrivesAdvertisments/GetFutureDrivesByDriverId?id=${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "json",

      })
    //   .then((res)=>{
    //   console.log("jjjjjjjjjjjjjjjj",res.data)
    //  })
  }

  GetDriveHistoryByDriverId = async (id: string) => {

    return await axios.get(variables.API_URL + `DriverDrivesAdvertisments/GetDriveHistoryByDriverId?id=${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "json",

      })}


  GetActiveDrives = async () => {

    return await axios.get(variables.API_URL + `DriverDrivesAdvertisments/GetActiveDrives`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "json",

      })
  }

FilterActiveDrives = async (str:string) => {

  return await axios.get(variables.API_URL + `DriverDrivesAdvertisments/FilterActiveDrives?str=${str}`,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      responseType: "json",

    })
}
}
const driverDriveAdvertismentService = new DriverDriveAdvertismentService();
export default driverDriveAdvertismentService;