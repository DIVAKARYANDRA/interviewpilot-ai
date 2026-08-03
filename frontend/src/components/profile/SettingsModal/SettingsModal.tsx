import {
    useState
} from "react";


import {
    updateProfile,
    updatePassword
}
from "../../../services/authService";


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
    ]=useState("");


    const [
        newPassword,
        setNewPassword
    ]=useState("");



    async function saveProfile(){

        await updateProfile(
            name
        );

        alert(
            "Profile updated"
        );

    }



    async function savePassword(){

        await updatePassword(

            currentPassword,

            newPassword

        );


        alert(
            "Password updated"
        );

    }



    return (

        <div className="modal-overlay">


            <div className="settings-modal">


                <h2>
                    Settings
                </h2>


                <label>
                    Change Name
                </label>

                <input

                    value={name}

                    onChange={
                        e=>setName(
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

                    onChange={
                        e=>setCurrentPassword(
                            e.target.value
                        )
                    }

                />


                <label>
                    New Password
                </label>


                <input

                    type="password"

                    onChange={
                        e=>setNewPassword(
                            e.target.value
                        )
                    }

                />



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

    );

}