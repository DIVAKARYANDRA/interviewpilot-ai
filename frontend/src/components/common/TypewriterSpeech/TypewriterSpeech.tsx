import { useEffect,useState } from "react";

import "./TypewriterSpeech.css";

interface Props{

    text:string;

    speed?:number;

}

export default function TypewriterSpeech({

    text,

    speed=30

}:Props){

    const[display,setDisplay]=useState("");

    useEffect(()=>{

        let index=0;

        setDisplay("");

        const interval=setInterval(()=>{

            index++;

            setDisplay(

                text.slice(0,index)

            );

            if(index>=text.length){

                clearInterval(interval);

            }

        },speed);

        return()=>clearInterval(interval);

    },[text,speed]);

    return(

        <p className="typewriter">

            {display}

        </p>

    );

}