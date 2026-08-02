import "./Badge.css";

interface Props{

    text:string;

}

export default function Badge({

    text

}:Props){

    return(

        <span className="app-badge">

            {text}

        </span>

    );

}