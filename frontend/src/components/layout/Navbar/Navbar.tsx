import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
    isAuthenticated,
    logout,
    getUser
} from "../../../hooks/useAuth";

import { scrollToSection } from "../../../utils/scroll";

import "./Navbar.css";

import ProfileModal 
from "../../profile/ProfileModal/ProfileModal";

import SettingsModal 
from "../../profile/SettingsModal/SettingsModal";


export default function Navbar(){


    const [open,setOpen] = useState(false);

    const [user,setUser] = useState<any>(null);

    const [showProfile,setShowProfile]=useState(false);

const [showSettings,setShowSettings]=useState(false);



    const loggedIn =
        isAuthenticated();



    useEffect(()=>{

        if(loggedIn){

            getUser()
            .then(data=>{

                setUser(data);

            })
            .catch(error=>{

                console.error(
                    "Failed to fetch user",
                    error
                );

            });

        }

    },[loggedIn]);



    return (

<header className="navbar">


<div className="navbar-container">


<div className="logo">

Interview
<span>
Pilot AI
</span>

</div>



<nav className="nav-links">


<button
onClick={() =>
scrollToSection("features")
}
>
Features
</button>


<button
onClick={() =>
scrollToSection("how-it-works")
}
>
How It Works
</button>


<button
onClick={() =>
scrollToSection("ai-demo")
}
>
AI Coach
</button>


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
onClick={() =>
    setShowProfile(true)
}
>
Profile
</button>


<button
onClick={() =>
    setShowSettings(true)
}
>
Settings
</button>


<button

onClick={logout}

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

onClose={()=>
setShowProfile(false)
}

/>

}


{
showSettings &&

<SettingsModal

user={user}

onClose={()=>
setShowSettings(false)
}

/>

}


);

}