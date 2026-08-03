import "./ConversationBubble.css";

interface Props{

    sender:"ai"|"user";

    message:string;

}

export default function ConversationBubble({

    sender,

    message

}:Props){

    return(

        <div

            className={

                sender==="ai"

                ?

                "bubble ai"

                :

                "bubble user"

            }

        >

            <div className="bubble-header">

                {

                    sender==="ai"

                    ?

                    "🤖 Divakar AI"

                    :

                    "👤 You"

                }

            </div>

            <div className="bubble-message">

                {message}

            </div>

        </div>

    );

}