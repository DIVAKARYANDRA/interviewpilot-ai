import { Wifi } from "lucide-react";
import "./ConnectingScreen.css";

export default function ConnectingScreen(){

    return(

        <div className="connecting">

            <div className="connecting-loader">

                <span className="connecting-ring" />
                <span className="connecting-ring ring-delay" />
                <Wifi size={26} />

            </div>

            <h2>

                InterviewPilot Live

            </h2>

            <p>

                Connecting to interviewer...

            </p>

        </div>

    );

}