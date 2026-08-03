import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    isAuthenticated,
    logout,
    getUser
} from "../../../hooks/useAuth";

import { scrollToSection } from "../../../utils/scroll";

import ProfileModal 
from "../../profile/ProfileModal/ProfileModal";

import SettingsModal 
from "../../profile/SettingsModal/SettingsModal";

import "./Navbar.css";


export default function Navbar(){


    const [open,setOpen] = useState(false);

    const [user,setUser] = useState<any>(null);

    const [showProfile,setShowProfile] =
        useState(false);

    const [showSettings,setShowSettings] =
        useState(false);



    const loggedIn =
        isAuthenticated();



    useEffect(()=>{

        if(loggedIn){

            getUser()

            .then((data:any)=>{

                setUser(data);

            })

            .catch((error)=>{

                console.error(
                    "Failed to fetch user",
                    error
                );

            });

        }

    },[loggedIn]);



    function handleProfile(){

        setOpen(false);

        setShowProfile(true);

    }



    function handleSettings(){

        setOpen(false);

        setShowSettings(true);

    }



    function handleLogout(){

        setOpen(false);

        logout();

    }



    return (

        <>

        <header className="navbar">


            <div className="navbar-container">


                <Link

to={

loggedIn

?

"/dashboard"

:

"/"

}

className="logo"

>

Interview

<span>

Pilot AI

</span>

</Link>



               <nav className="nav-links">

{

loggedIn

?

<>

<Link to="/dashboard">

Dashboard

</Link>

<Link to="/history">

History

</Link>

</>

:

<>

<button
onClick={()=>

scrollToSection(

"features"

)

}
>

Features

</button>

<button
onClick={()=>

scrollToSection(

"how-it-works"

)

}
>

How It Works

</button>

<button
onClick={()=>

scrollToSection(

"ai-demo"

)

}
>

AI Coach

</button>

</>

}

</nav>





                <div className="nav-actions">


                {

                loggedIn

                ?

                <div className="profile-wrapper">


                    <button

                    className="profile-btn"

                    onClick={() =>
                        setOpen(!open)
                    }

                    >

                    👤

                    {
                        user?.name
                        ||
                        "Profile"
                    }


                    </button>





                    {

                    open &&

                    <div className="profile-menu">


                        <button

                        onClick={handleProfile}

                        >

                            Profile

                        </button>



                        <button

                        onClick={handleSettings}

                        >

                            Settings

                        </button>




                        <button

                        onClick={handleLogout}

                        >

                            Logout

                        </button>



                    </div>

                    }



                </div>


                :

                <>


                <Link to="/login">

                    <button className="login-btn">

                        Login

                    </button>

                </Link>




                <Link to="/register">

                    <button className="register-btn">

                        Register

                    </button>

                </Link>


                </>


                }



                </div>



            </div>


        </header>





        {

        showProfile &&

        <ProfileModal

            user={user}

            onClose={() =>
                setShowProfile(false)
            }

        />

        }





        {

        showSettings &&

        <SettingsModal

            user={user}

            onClose={() =>
                setShowSettings(false)
            }

        />

        }



        </>

    );

}