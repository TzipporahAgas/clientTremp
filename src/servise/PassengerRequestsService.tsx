import axios from "axios";
import { variables } from "../Variables";
import { IdriveForDrive } from "./DriverDriveAdvertismentService";

export interface IpassengerRequest {
    id: number;
    driverId: any;
    passengerId: number;
    date: Date;
    sourceCity: string,
    sourceStreet: string,
    destinationCity: string,
    destinationStreet: string,
    limitedGender: boolean;
    amountOfSeats: number;
    comments: string;
    status: number;
    hour: number;
    minuts: number;
}


class PassengerRequestsService {
    AddRequestForDrive = async (requstForDrive: IpassengerRequest) => {
        console.log({requstForDrive})
        await axios.post(variables.API_URL + `PassengersRequests/AddRequestForDrive`, requstForDrive).then((res) => {
          if (res)
            console.log("resssssssssssss", res)
        })
          .catch((error) => {
            console.log(error)
          })
      }
    UpdatePassengerDriveDetails = async (driveToEdit: IdriveForDrive, data: number) => {
        await axios.put(variables.API_URL + `PassengersRequests/UpdatePassengerDriveDetails?driverId=${data}`, driveToEdit)
    }
    getPassengerRequest = async () => {
        return axios.get(variables.API_URL + `PassengersRequests/GetActivePassengerRequests`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                responseType: "json",
            })
   
    }

    GetPassengerHistory = async (passengerId:number) => {
        return axios.get(variables.API_URL + `PassengersRequests/GetPassengerHistory?paseengerId=${passengerId}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                responseType: "json",
            })
   
    }
    
    GetPassengerFutureDrives = async (userId:string) => {
        return axios.get(variables.API_URL + `PassengersRequests/GetPassengerFutureDrives?paseengerId=${userId}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                responseType: "json",
            })
        //  .then(res => {
                
        //     console.log("a from servisessssssssssssssssssssssss",res.data)
        // })
    }
    DeletePassengerRequest = async (id: number, myStatus: number,idOfUser:number) => {
        await axios.delete(variables.API_URL + `PassengersRequests/DeletePassengerRequest?id=${id}&status=${myStatus}&idOfUser=${idOfUser}`).then((res) => {
          if (res)
            console.log("resssssssssssss", res)
        })
          .catch((error) => {
            console.log(error)
          })
      }

     getStreets=()=>{
    return axios.get(`https://raw.githubusercontent.com/GabMic/israeli-cities-and-streets-list/master/israeli_street_and_cities_names.json`
    )  
    //  .then(res => {
                
    //         console.log("גגגגגגגגגגגגגגגג",res.data)
    //     })
}
GetlatestAddvertisments = async () => {
    return axios.get(variables.API_URL + `PassengersRequests/GetlatestAddvertisments`,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            responseType: "json",
        })

}
    }

const passengerRequestsService = new PassengerRequestsService();
export default passengerRequestsService;