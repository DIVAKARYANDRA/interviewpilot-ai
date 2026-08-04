import {
    Bot,
    User
} from "lucide-react";

import "./ConversationBubble.css";

interface Props{

    sender:"ai"|"user";

    title?:string;

    message:string;

}

export default function ConversationBubble({

    sender,

    title,

    message

}:Props){

    const isAI = sender==="ai";

    return(

        <div
            className={`bubble ${sender}`}
        >

            <div className="bubble-avatar">

                {

                    isAI

                    ?

                    <Bot size={22}/>

                    :

                    <User size={22}/>

                }

            </div>

            <div className="bubble-content">

                <div className="bubble-header">

                    {

                        title ||

                        (

                            isAI

                            ?

                            "Divakar AI"

                            :

                            "You"

                        )

                    }

                </div>

                <div className="bubble-message">

                    {message}

                </div>

            </div>

        </div>

    );

}