import ConversationBubble
from "../ConversationBubble/ConversationBubble";

import "./Conversation.css";

interface Props{

    question:string;

    answer:string;

}

export default function Conversation({

    question,

    answer

}:Props){

    return(

        <div className="conversation">

            <ConversationBubble

                sender="ai"

                message={question}

            />

            <ConversationBubble

                sender="user"

                message={

                    answer ||

                    "Listening..."

                }

            />

        </div>

    );

}