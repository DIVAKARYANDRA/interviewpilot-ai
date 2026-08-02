import {
 loginUser,
 getCurrentUser as fetchUser
}
from "../services/authService";

import {
 saveToken
}
from "../utils/token";


export async function login(
email:string,
password:string
){

const response =
await loginUser({

email,
password

});


saveToken(
response.access_token
);


return response;

}



export async function getUser(){

return await fetchUser();

}



export function logout(){

localStorage.removeItem(
"interviewpilot_token"
);

window.location.href="/";

}



export function isAuthenticated(){

return !!localStorage.getItem(
"interviewpilot_token"
);

}