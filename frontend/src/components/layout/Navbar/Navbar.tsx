import { Link } from "react-router-dom";

import {
    isAuthenticated,
    logout,
    getCurrentUser
} from "../../../hooks/useAuth";
import {useEffect,useState} from "react";

import {
getUser,
logout,
isAuthenticated
}
from "../../../hooks/useAuth";

import { scrollToSection } from "../../../utils/scroll";

import "./Navbar.css";


export default function Navbar(){


    const [open,setOpen] = useState(false);


    const loggedIn =
        isAuthenticated();


    const user =
        getCurrentUser();

    const [user,setUser]=useState<any>(null);


      useEffect(()=>{

      if(isAuthenticated()){

      getUser()
      .then(data=>{

      setUser(data);

      });

      }

      },[]);



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


<button>
Profile
</button>


<button>
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


);

}