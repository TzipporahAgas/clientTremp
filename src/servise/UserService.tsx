import axios from "axios";
import { useCookies } from "react-cookie";
import { variables } from "../Variables";

export interface Iuser {
  id: number,
  firstName: string,
  lastName: string,
  userId: string,

  phoneNumber: string,
  genderId: number,
  password: string

}



class UserService {

  // userDetails:Iuser={
  //   id: 0,
  //   firstName: "",
  //   lastName: "",
  //   userId: 0,
  //   email: "",
  //   phoneNumber: "",
  //   genderId: 0,
  //   password: ""
  // };
  getUserDetails = async (data: string) => {

    return axios.get(variables.API_URL + `User/GetUserDetails?id=${data}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "json",

      })
    // .then(res => {
    //   if (res)
    //    this.userDetails=res.data;
    //   //  console.log("this.userDetails",this.userDetails)

    // })
  }

 
  ifUserExist: string = "";
  chekIfUser = async (id: string, password: string) => {
   return  axios.get(variables.API_URL + `User/CheckUserExist?id=${id}&password=${password}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        responseType: "json",
      })
      // .then(res => {
      //   if (res)
      //     this.ifUserExist = res.data;
      // })
  }
  getEmail = (email: string) => {
    axios.get(variables.API_URL + `User/getEmail?email=${email}`)
}
  // getEmail = async (email: string) => {
  //   await axios.get(variables.API_URL + `User/getEmail?email=${email}`,
  //     {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       responseType: "json",
  //     })
  //     .then(res => {
  //       if (res)
  //         console.log("getemailllllll from servise", res.data)
  //     })
  // }


  addUser = async (user: Iuser) => {
    await axios.post(variables.API_URL + `User/AddUser`, user)
      .catch((error) => {
        console.log(error)
      })
  }

  UpdateUserDetails = async (user: Iuser) => {
    await axios.put(variables.API_URL + `User/UpdateUserDetails?id=${user.id}`, user)
      .then(res => {
        if (res) {
          console.log(res);
        }
      }).catch((error) => {
        console.log(error)
      })

  }

  changePassword = async (email: string | undefined, password: string) => {
    await axios.put(variables.API_URL + `User/ChangePassword?email=${email}&password=${password}`,)/////////////////////////////?
      .then(res => {
        if (res) {
          console.log(res);
        }
      }).catch((error) => {
        console.log(error)
      })

  }
}
const userService = new UserService();
export default userService;