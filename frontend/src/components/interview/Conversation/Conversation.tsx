import ConversationBubble
from "../ConversationBubble/ConversationBubble";

import "./Conversation.css";
interface Props{

    question:string;

    answer:string;

    liveTranscript?:string;

}
export default function Conversation({

    question,

    answer,
    liveTranscript

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

liveTranscript?.trim()

||

answer.trim()

||

"🎤 Listening..."

}

/>

        </div>

    );

}