import "./LiveFooter.css";

interface Props{

current:number;

total:number;

recruiterState:
"idle"
|"speaking"
|"thinking"
|"listening";

}

export default function LiveFooter({

current,

total,

recruiterState

}:Props){

const progress=(current/total)*100;

return(

<div className="live-footer-bar">

<div className="progress-section">

<div className="progress-top">

<span>

Question {current} of {total}

</span>

</div>

<div className="progress-track">

<div

className="progress-fill"

style={{

width:`${progress}%`

}}

/>

</div>

</div>

<div className="voice-chip">

{

recruiterState==="speaking"

&&

"🗣 AI Speaking"

}

{

recruiterState==="listening"

&&

"🎤 Listening"

}

{

recruiterState==="thinking"

&&

"🤔 Thinking"

}

</div>

</div>

);

}