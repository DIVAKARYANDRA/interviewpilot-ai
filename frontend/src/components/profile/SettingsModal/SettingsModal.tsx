import {
    useState
} from "react";


import {
    updateProfile,
    updatePassword
}
from "../../../services/authService";


import Toast from "../../common/Toast/Toast";

import "./SettingsModal.css";


interface Props {

    user:any;

    onClose:()=>void;

}



export default function SettingsModal({

    user,

    onClose

}:Props){


    const [name,setName]=useState(
        user?.name || ""
    );


    const [
        currentPassword,
        setCurrentPassword
    ] = useState("");


    const [
        newPassword,
        setNewPassword
    ] = useState("");



    const [
        error,
        setError
    ] = useState("");



    const [
        toast,
        setToast
    ] = useState<{

        message:string;

        type:"success" | "error";

    } | null>(null);




    function showToast(

        message:string,

        type:"success" | "error"

    ){

        setToast({

            message,

            type

        });


        setTimeout(()=>{

            setToast(null);

        },3000);

    }





    function validatePassword(
        password:string
    ){

        const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


        return regex.test(password);

    }





    async function saveProfile(){

        try{


            setError("");



            if(!name.trim()){


                setError(
                    "Name cannot be empty."
                );


                return;

            }



            await updateProfile(
                name
            );



            showToast(
                "Profile updated successfully",
                "success"
            );


        }


        catch(error:any){


            showToast(
                "Failed to update profile",
                "error"
            );


        }

    }





    async function savePassword(){

        try{


            setError("");



            if(!currentPassword.trim()){


                setError(
                    "Current password is required."
                );


                return;

            }




            if(!newPassword.trim()){


                setError(
                    "New password is required."
                );


                return;

            }




            if(!validatePassword(newPassword)){


                setError(
                    "Password must contain minimum 8 characters, one uppercase letter, one lowercase letter and one number."
                );


                return;

            }





            await updatePassword(

                currentPassword,

                newPassword

            );




            showToast(

                "Password changed successfully",

                "success"

            );



            setCurrentPassword("");

            setNewPassword("");



        }


        catch(error:any){


            if(
                error?.response?.data?.detail
            ){

                showToast(

                    error.response.data.detail,

                    "error"

                );

            }

            else{


                showToast(

                    "Failed to change password",

                    "error"

                );


            }


        }

    }





    return (

        <>


        <div className="modal-overlay">


            <div className="settings-modal">


                <h2>
                    Settings
                </h2>



                {

                    error &&

                    <div className="settings-error">

                        {error}

                    </div>

                }




                <label>
                    Change Name
                </label>



                <input

                    value={name}

                    onChange={
                        e =>
                        setName(
                            e.target.value
                        )
                    }

                />



                <button
                    onClick={saveProfile}
                >

                    Save Name

                </button>




                <hr />





                <label>
                    Current Password
                </label>



                <input

                    type="password"

                    value={currentPassword}

                    onChange={
                        e =>
                        setCurrentPassword(
                            e.target.value
                        )
                    }

                />





                <label>
                    New Password
                </label>




                <input

                    type="password"

                    value={newPassword}

                    onChange={
                        e =>
                        setNewPassword(
                            e.target.value
                        )
                    }

                />



                <small>

                    Minimum 8 characters with uppercase,
                    lowercase and number.

                </small>




                <button

                    onClick={savePassword}

                >

                    Change Password

                </button>





                <button

                    className="close-btn"

                    onClick={onClose}

                >

                    Close

                </button>



            </div>


        </div>




        {

            toast &&

            <Toast

                message={toast.message}

                type={toast.type}

            />

        }



        </>

    );

}