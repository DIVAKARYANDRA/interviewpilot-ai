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

<section className="conversation">

<div className="current-question">

<h3>

💬 Current Question

</h3>

<p>

{question}

</p>

</div>

<div className="current-answer">

<h3>

🎤 Live Transcript

</h3>

<p>

{

answer ||

"Listening..."

}

</p>

</div>

</section>

);

}