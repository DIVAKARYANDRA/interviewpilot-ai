import "./InterviewLive.css";
import LiveAvatar from "./LiveAvatar";
import InterviewInput
from "../InterviewInput/InterviewInput";
import LiveTranscript
from "./LiveTranscript";
import LiveFooter from "./LiveFooter";
import { useInterview }
from "../../../context/InterviewContext"; 

interface Props{

    loading:boolean;

    onSubmit:()=>void;

}

export default function InterviewLive({

    loading,

    onSubmit

}:Props){

    

    const{

question,

answer,

setAnswer,

interviewMode,

currentQuestion,

totalQuestions,

recruiterState

}=useInterview();

    return (

        <div className="live-interview">

            <div className="live-header">

                <div>

                    <h2>InterviewPilot Live</h2>

                    <small>Amazon Backend Engineer Interview</small>

                </div>

                <div className="live-badge">

                    ● LIVE

                </div>

            </div>

            <div className="live-body">

                <div className="left-panel">

<LiveAvatar

    recruiterState={recruiterState}

/>

</div>

                <div className="right-panel">

<LiveTranscript

question={question}

answer={answer}

/>

</div>

            </div>

          
          <div className="live-footer">

<LiveFooter

current={currentQuestion}

total={totalQuestions}

recruiterState={recruiterState}

/>

{

interviewMode==="text"

&&

<div className="footer-input">

<InterviewInput

answer={answer}

setAnswer={setAnswer}

/>

<button

className="footer-submit"

onClick={onSubmit}

disabled={loading}

>

{

loading

?

"Thinking..."

:

"Submit Answer"

}

</button>

</div>

}

</div>

        </div>

    );

}