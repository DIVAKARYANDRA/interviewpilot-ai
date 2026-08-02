import { loginUser } from "../services/authService";
import { saveToken } from "../utils/token";


export async function login(
    email:string,
    password:string
){

    const response = await loginUser({

        email,

        password,

    });


    saveToken(
        response.access_token
    );


    /*
      Store basic user information
      for navbar/profile display
    */

    localStorage.setItem(

        "interviewpilot_user",

        JSON.stringify({

            email

        })

    );


    return response;

}



export function logout(){

    localStorage.removeItem(
        "interviewpilot_token"
    );


    localStorage.removeItem(
        "interviewpilot_user"
    );


    window.location.href="/";

}



export function isAuthenticated(){

    return !!localStorage.getItem(
        "interviewpilot_token"
    );

}



export function getCurrentUser(){

    const user =
        localStorage.getItem(
            "interviewpilot_user"
        );


    return user
        ? JSON.parse(user)
        : null;

}