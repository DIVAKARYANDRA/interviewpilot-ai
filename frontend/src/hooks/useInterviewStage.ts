import { useEffect } from "react";

import { useInterview } from "../context/InterviewContext";

export default function useInterviewStage(){

    const{

        stage,

        setStage

    } = useInterview();

    useEffect(()=>{

        if(stage==="connecting"){

            const timer = setTimeout(()=>{

                setStage("greeting");

            },2000);

            return ()=>clearTimeout(timer);

        }

    },[stage]);

    useEffect(()=>{

        if(stage==="greeting"){

            const timer = setTimeout(()=>{

                setStage("interview");

            },7000);

            return ()=>clearTimeout(timer);

        }

    },[stage]);

}