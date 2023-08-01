import axios from "axios";
import { Password } from "primereact/password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService, { Iuser } from "../servise/UserService";
import { variables } from "../Variables";
import "../Design/register.css"
import React from "react";

export default function Register(props: any) {

    // const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userId, setUserId] = useState(props.id ? props.id : "");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [genderId, setGenderId] = useState(1);
    const [password, setPassword] = useState(props.password ? props.password : "");
    const [result, setResult] = React.useState(0);
    const [resultPhone, setResultPhone] = React.useState(0);
    const [resultFirstName, setResultFirstName] = React.useState(0);

    const [errors, setErrors] = useState<any>({});
    const [validationPassword, setValidationPassword] = React.useState(false);


    const myUser: Iuser = {
        id: 0,
        firstName: "",
        lastName: "",
        userId: "",
        phoneNumber: "",
        genderId: 0,
        password: ""
    };

    const checkGender = (genderName: string) => {
        if (genderName == "זכר")
            setGenderId(1);
        else
            setGenderId(2);

    }
    const addUser = async () => {
        // if (password)
        if (result===1 && resultPhone===1 && resultFirstName===1) {
            myUser.firstName = firstName;
            myUser.lastName = lastName;
            myUser.userId = userId;
            myUser.phoneNumber = phoneNumber;
            myUser.genderId = genderId;
            myUser.password = password;
        
        console.log("myUser", myUser)
        console.log(genderId);
        await userService.addUser(myUser);
        props.setFlagOpenRegister(false);
        props.setFlag(true);
        // navigate("../Login");
        console.log(firstName)
}
else{
    alert("!הרישום אינו מתבצע כאשר ישנם שדות לא תקינים")
}
    };

    const validateEmail = () => {

        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

        // setEmailIsValid(regex.test(id))
        if (regex.test(userId)
        )
            //valid
            setResult(1)
        else {
            //not valid
            setResult(2)
        }



    }

    const validatePhone = () => {
        if (phoneNumber == "")
            setResultPhone(4)
        else if (!phoneNumber.match(/^\d+/))
            setResultPhone(2)
        else if (phoneNumber.length < 8)
            setResultPhone(3)

        else {
            setResultPhone(1)
        }
    }

    const validateFirstName = () => {
        if (firstName == "")
            setResultFirstName(3)
        else if (!firstName.match(/^[A-Za-z]+$/))
            setResultFirstName(2)
        else {
            setResultFirstName(1)
        }
    }


    return (
        <form onSubmit={addUser}>
            <div id="register2">

                <h1 className="titleRegister">הרשמה</h1>
                <input id="firstnameRegister" onBlur={validateFirstName} dir="rtl" required placeholder="    שם פרטי" type={"text"} onChange={(e) => { { setFirstName(e.target.value) } }}></input>
                {resultFirstName === 2 && <small style={{ color: "red", fontSize: "12pt" }}> שדה זה אינו יכול להכיל מספרים</small>}
                {resultFirstName === 3 && <small style={{ color: "red", fontSize: "12pt" }}>חובה להזין שם פרטי</small>}
                <br></br>
                <br></br>
                <input id="lastnameRegister" dir="rtl" required placeholder="     שם משפחה" type={"text"} onChange={(e) => { { setLastName(e.target.value) } }}></input>
                <br></br>
                <br></br>

                <input id="emailRegister" onBlur={validateEmail} required defaultValue={props.id ? props.id : ""} placeholder="    מייל" dir="rtl" type={"email"} onChange={(e) => { { setUserId((e.target.value)) } }}></input>
                {result === 2 && <small style={{ color: "red", fontSize: "12pt" }}>כתובת המייל שהזנת אינה תקינה</small>}
                <br></br>
                <br></br>
                <input id="phoneRegister" onBlur={validatePhone} required placeholder="    טלפון" dir="rtl" type={"text"} onChange={(e) => { { setPhoneNumber(e.target.value) } }}></input>
                {resultPhone === 2 && <small style={{ color: "red", fontSize: "12pt" }}>מספר הטלפון שהזנת אינו תקין </small>}
                {resultPhone === 3 && <small style={{ color: "red", fontSize: "12pt" }}>מספר הטלפון שהזנת קצר מדי </small>}
                {resultPhone === 4 && <small style={{ color: "red", fontSize: "12pt" }}> חובה להזין מספר טלפון</small>}

                <br></br>
                <br></br>
                {/* <input id="phoneRegister" placeholder="    טלפון" dir="rtl" type={"text"} onChange={(e) => { { setPhoneNumber(e.target.value) } }}></input> */}

                <Password maxLength={10} required dir="rtl" inputStyle={{ width: "100%", backgroundColor: "#F4F0ED", borderStyle: "none", borderRadius: "26.5vmin" }} id="passwordRegister" defaultValue={props.password ? props.password : ""} placeholder={"סיסמה"} onChange={(e) => { { setPassword(e.target.value) } }} toggleMask /><br></br>
                <br></br>
                <br></br>
                <select required dir="rtl" id="genderRegister" onChange={(e) => { { checkGender(e.target.value) } }}><option className="optionsRegister">זכר</option>
                    <option className="optionsRegister">נקבה</option></select>
                <br></br>
                <br></br>
                {/* <input placeholder="gender" onChange={(e) => { { setGender(e.target.value) } }}></input>
            <br></br>
            <br></br> */}
                {/* <input placeholder="סיסמה" type={"password"} onChange={(e) => { { setPassword(e.target.value) } }}></input> */}
                <br></br>
                <br></br>
                {/* <button id="loginRegister" onClick={() => { addUser() }}>אני בפנים</button>  </div> */}
                <button id="loginRegister" type="submit" >אני בפנים</button>  </div>

        </form>
    )
}